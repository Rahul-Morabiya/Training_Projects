import React from "react";
import * as htmlToImage from "html-to-image";

const ExportButton = () => {

  const exportImage = async () => {
    const node = document.getElementById("graph-container");

    const dataUrl = await htmlToImage.toPng(node);

    const link = document.createElement("a");
    link.download = "graph.png";
    link.href = dataUrl;
    link.click();
  };

  return <button onClick={exportImage}>Export PNG</button>;
};

export default ExportButton;