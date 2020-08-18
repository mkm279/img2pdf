import React, { useRef } from "react";
// import Modal from "react-modal";

import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

import { useTessaract } from "../../hooks/useTessarect";

import "./ImagePreview.css";
import Loader from "../loader/Loader";

interface ImagePreviewProps {
  show: boolean;
  dataUri: string;
  handleClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  // show,
  dataUri,
  handleClose,
}) => {
  const { generatePdfFromUrl, progress } = useTessaract();
  const { showProgress } = progress;
  const imageEditorRef = useRef(null);
  const convertToPdf = async () => {
    if (imageEditorRef && imageEditorRef.current) {
      const editorInstance = (imageEditorRef as any).current.getInstance();
      const imgUrl = editorInstance.toDataURL({
        format: "jpeg",
        multiplier: 5,
      });
      await generatePdfFromUrl(imgUrl, "sample");
      handleClose();
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
      {showProgress ? <Loader /> : null}
    </div>
  );
};

export default ImagePreview;
