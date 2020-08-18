import { useState } from "react";
import { createWorker } from "tesseract.js";

export function useTessaract() {
  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const generatePdfFromUrl = async (imageUrl: string, filename: string) => {
    const worker = createWorker({
      logger: (m) => {
        setProgressValue(m.progress * 100);
      },
    });

    setShowProgress(true);

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    // const {
    //   data: { text },
    // } = await worker.recognize(imageUrl);

    await worker.recognize(imageUrl);
    filename = `${new Date().getTime()}.pdf`;
    const { data } = await (worker as any).getPDF("Tesseract OCR Result");
    const blob = new Blob([new Uint8Array(data)], { type: "application/pdf" });

    downloadPdf(blob, filename);
    await worker.terminate();
    setShowProgress(false);
  };

  const downloadPdf = (blob: Blob, fileName: string) => {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    generatePdfFromUrl,
    progress: {
      progressValue,
      showProgress,
    },
  };
}

export interface PDFInfo {
  filepath: string;
  webviewPath: string;
}
