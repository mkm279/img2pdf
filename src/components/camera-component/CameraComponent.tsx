import React, { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./CameraComponent.css";
import CameraSwitchIcon from "../camera-switch-icon/CameraSwitchIcon";

interface CameraComponentProps {
  handleTakePhoto: (dataUri: string) => void;
  handleCloseCamera: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  handleTakePhoto,
  handleCloseCamera,
}) => {
  const [cameraFacingMode, setCameraFacingMode] = useState(
    window.innerWidth < 768 ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER
  );

  const switchCamera = () => {
    let mode =
      cameraFacingMode === FACING_MODES.ENVIRONMENT
        ? FACING_MODES.USER
        : FACING_MODES.ENVIRONMENT;
    setCameraFacingMode(mode);
  };

  return (
    <>
      <button className="close-btn" onClick={handleCloseCamera}>
        &#10005;
      </button>
      <Camera
        onTakePhoto={handleTakePhoto}
        // isImageMirror={false}
        isFullscreen={true}
        idealFacingMode={cameraFacingMode}
      />
      <button className="camera-switch-btn" onClick={switchCamera}>
        <CameraSwitchIcon />
      </button>
    </>
  );
};

export default CameraComponent;
