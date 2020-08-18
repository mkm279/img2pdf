import React, { useRef, useState } from "react";

import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

import { useTessaract } from "../../hooks/useTessarect";

import "./ImagePreview.css";
import Loader from "../loader/Loader";

interface ImagePreviewProps {
  dataUri: string;
  handleClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  dataUri,
  handleClose,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const { generatePdfFromUrl } = useTessaract();
  const imageEditorRef = useRef(null);

  const sharpenImage = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (imageEditorRef && imageEditorRef.current) {
        const editorInstance = (imageEditorRef as any).current.getInstance();
        editorInstance
          .applyFilter("sharpen")
          .then((_obj: any) => {
            resolve();
          })
          .catch((_e: Error) => reject());
      } else {
        reject();
      }
    });
  };

  const convertImagetoGrayScale = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (imageEditorRef && imageEditorRef.current) {
        const editorInstance = (imageEditorRef as any).current.getInstance();
        editorInstance
          .applyFilter("grayscale")
          .then((_obj: any) => {
            resolve();
          })
          .catch((_e: Error) => reject());
      } else {
        reject();
      }
    });
  };

  const convertToPdf = async () => {
    if (imageEditorRef && imageEditorRef.current) {
      try {
        const editorInstance = (imageEditorRef as any).current.getInstance();
        setShowLoader(true);
        await convertImagetoGrayScale();
        await sharpenImage();
        const imgUrl = editorInstance.toDataURL({
          format: "jpeg",
          multiplier: 5,
        });
        await generatePdfFromUrl(imgUrl, "sample");
        alert("Pdf downloaded successfully");
        setShowLoader(false);
        handleClose();
      } catch (error) {
        alert("Something went wrong");
        setShowLoader(false);
        handleClose();
      }
    }
  };

  return (
    <div className="preview-wrapper">
      <div className="buttons-wrapper">
        <button className="back-btn" onClick={handleClose}>
          Back
        </button>
        <button className="pdf-button" onClick={convertToPdf}>
          Convert to pdf
        </button>
      </div>
      <ImageEditor
        ref={imageEditorRef}
        includeUI={{
          loadImage: {
            path: dataUri,
            name: `${new Date().getTime()}.png`,
          },
          menu: ["crop", "rotate", "filter"],
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
          lineWidth: 1,
        }}
        usageStatistics={false}
      />
      {showLoader ? <Loader /> : null}
    </div>
  );
};

export default ImagePreview;
