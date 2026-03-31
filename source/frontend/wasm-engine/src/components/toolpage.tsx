import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import init, { process_files } from "../../wasm/pkg/wasm_engine.js";
import { useAuth } from "../hooks/use-auth.js";
import { saveToDatabase } from "../services/history.js";

const ToolPage = () => {
  const { toolId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { user } = useAuth();
  const toolConfig = {
    merge: {
      title: "merge",
      acceptedTypes: ".pdf",
      maxFiles: 10,
      description: "Merge multiple PDFs into one document",
    },
    compress: {
      title: "compress",
      acceptedTypes: ".pdf",
      maxFiles: 10,
      description: "Reduce the file-size while ensuring high quality format.",
    },
    combine: {
      title: "combine",
      acceptedTypes: ".pdf",
      maxFiles: 10,
      description: "Combine more than two PDFs into one document",
    },
    split: {
      title: "split",
      acceptedTypes: ".pdf",
      maxFiles: 10,
      description: "Set pdfs in seperate files",
    },
    "to-pdf": {
      title: "to-pdf",
      acceptedTypes: ".docx, .jpg, .png",
      maxFiles: 10,
      description: "Convert any file format into one PDF document",
    },
  };

  const currentTool = toolConfig[toolId as keyof typeof toolConfig];

  const handleFileInput = (e: any) => {
    console.log("User requests a file conversion....");
    const filesFromInput = e.target.files;
    if (!filesFromInput) return;

    const fileArr = Array.from(filesFromInput) as File[];

    const validFiles = fileArr.filter((file) => {
      const fileName = file.name.toLowerCase();
      return currentTool.acceptedTypes
        .split(", ")
        .some((ext) => fileName.endsWith(ext));
    });

    setSelectedFiles(validFiles);
    toast.success("File transfer successful!");
  };

  const startConversion = async () => {
    if (selectedFiles.length === 0) {
      toast.error("No files were requested...");
      return;
    }
    const toastId = toast.loading("Processing file utilities...");

    if (selectedFiles.length > currentTool.maxFiles) {
      toast.error(`Max files reached: Only ${currentTool.maxFiles} allowed.`);
      return;
    }
    try {
      await init();
      const file = selectedFiles[0];
      const fileName = file.name;
      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);

      toast.loading("Processing bits into Rust....", { id: toastId });
      const processedBits = process_files(uint8);

      const blob = new Blob([processedBits as BlobPart], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `blinkflow_${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (user) {
        await saveToDatabase({
          fileName: selectedFiles[0].name,
          originalSize: selectedFiles[0].size,
          operation: currentTool.title,
          status: "success",
        });
      }
      URL.revokeObjectURL(url);
      toast.success("File processed successfully!", { id: toastId });
    } catch (e) {
      console.error("WASM Bridge Error: ", e);
      toast.error("Engine failure. Please try again...", { id: toastId });
    }
  };

  return (
    <div className="bg-[#505252] min-h-screen pt-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white uppercase mb-4">
        {toolId?.replace("-", " ")} PDF
      </h1>
      <p className="text-gray-300 mb-10">
        Safe, fast, and local processing for your {toolId} needs.
      </p>

      <div className="w-full max-w-4xl aspect-video bg-[#606262] border-4 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center hover:border-green-400 transition-colors cursor-pointer group">
        <input
          className="cursor-pointer top-65 rounded-3xl absolute p-59 w-4xl flex flex-col justify-center items-center file:hidden text-[#606262]"
          onChange={handleFileInput}
          type="file"
          multiple
        />
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
          📂
        </div>
        <p className="text-xl text-white font-semibold">
          Click or Drag PDF files here
        </p>
        <p className="text-sm text-white/50 mt-2">Maximum file size: 50MB</p>
      </div>

      <button
        onClick={startConversion}
        className="cursor-pointer mt-10 px-10 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full transition-all shadow-lg"
      >
        START CONVERSION
      </button>
    </div>
  );
};

export default ToolPage;
