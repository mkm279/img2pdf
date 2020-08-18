import React from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./CameraComponent.css";

interface CameraComponentProps {
  handleTakePhoto: (dataUri: string) => void;
  handleCloseCamera: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  handleTakePhoto,
  handleCloseCamera,
}) => (
  <>
    <div className="button-wrapper">
      <button onClick={handleCloseCamera}>&#10005;</button>
    </div>
    <Camera onTakePhoto={handleTakePhoto} isImageMirror={false} />
  </>
);

export default CameraComponent;
