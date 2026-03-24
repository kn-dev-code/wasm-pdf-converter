import { Card, CardDescription, CardTitle } from "./ui/card";
import combinePdf from "../assets/combine-image.png";
import splitPdf from "../assets/split-image.png";
import compressPdf from "../assets/compress-image.png";
import mergePdf from "../assets/merge-image.png";
import toPdf from "../assets/to-pdf-image.png"
import { Link } from "react-router-dom";
const Dashboard = () => {
  const cardLayout = [
    {
      id: "merge",
      image: mergePdf,
      linkName: "/convert/merge",
      title: "MERGE PDF",
      description: "Merge 1-2 PDFs with an order that suits you.",
    },
    {
      id: "combine",
      image: combinePdf,
      linkName: "/convert/combine",
      title: "COMBINE PDF",
      description: "Combine more than 2 PDFS with an order that suits you.",
    },
    {
      id: "compress",
      image: compressPdf,
      linkName: "/convert/compress",
      title: "COMPRESS PDF",
      description: "Reduce the file-size while ensuring high quality format.",
    },
    {
      id: "split",
      image: splitPdf,
      linkName: "/convert/split",
      title: "SPLIT PDF",
      description: "Set PDFs in seperate files.",
    },
    {
      id: "to-pdf",
      image: toPdf,
      linkName: "/convert/to-pdf",
      title: "TO-PDF",
      description: "Convert any file-type into PDF format.",
    },
  ];
  return (
    <div className="bg-[#505252] min-h-screen">
      <p className="flex justify-center items-center text-4xl text-white pt-10">
        No Tracking. Simple and private conversion in one place.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-6 pl-35 pt-20 gap-10 max-w-6xl mx-auto px-20">
      {cardLayout.map((card,index) => {
        const isBottomIndex = index >=3;


        return (
          <Card key = {card.id} className = {`flex flex-col items-center p-5 w-60 h-45 bg-[#848484] rounded-2xl ${isBottomIndex && index === 3 ? "md:col-start-2" : ""} col-span-1 md:col-span-2`}>
            <Link className = "w-15 h-15 mr-55 -translate-y-8 absolute hover:scale-105 duration-75 transition-all" to = {card.linkName}><img alt = {card.title} className = ""src = {card.image}/></Link>
            <CardTitle className = "text-black">{card.title}</CardTitle>
            <CardDescription className = "text-white font-bold pl-5">{card.description}</CardDescription>
          </Card>
        )
      })}
      </div>
    </div>
  );
};

export default Dashboard;
