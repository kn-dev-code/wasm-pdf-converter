import { Card, CardDescription, CardTitle } from "./ui/card";

const Dashboard = () => {
  const cardLayout = [
    {
      id: "merge",
      title: "MERGE PDF",
      description: "Merge 1-2 PDFs with an order that suits you.",
    },
    {
      id: "combine",
      title: "COMBINE PDF",
      description: "Combine more than 2 PDFS with an order that suits you.",
    },
    {
      id: "compress",
      title: "COMPRESS PDF",
      description: "Reduce the file-size while ensuring high quality format.",
    },
    {
      id: "split",
      title: "SPLIT PDF",
      description: "Set PDFs in a seperate compartment of its own file.",
    },
    {
      id: "to-pdf",
      title: "TO-PDF",
      description: "Convert any file-type into PDF format.",
    },
  ];
  return (
    <div className="bg-[#505252] h-screen">
      <p className="flex justify-center items-center text-4xl text-white pt-10">
        No Tracking. Simple and private conversion in one place.
      </p>
      <div></div>
      {cardLayout.map((card) => (
        <div key={card.id} className="grid grid-cols-1 md:grid-cols-6 ">
          <Card className = "p-12 w-60">
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
