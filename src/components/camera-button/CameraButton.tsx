import React from "react";
import "./CameraButton.css";
import CameraIcon from "../camera-icon/CameraIcon";

interface CameraButtonProps {
  handleCameraBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CameraButton: React.FC<CameraButtonProps> = ({
  handleCameraBtnClick,
}) => {
  return (
    <button className="fab-button" onClick={handleCameraBtnClick}>
      <CameraIcon />
    </button>
  );
};

export default CameraButton;
