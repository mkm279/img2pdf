import React, { useState } from "react";
import "./App.css";
import FileInput from "./components/file-input/FileInput";
import CameraButton from "./components/camera-button/CameraButton";
import CameraComponent from "./components/camera-component/CameraComponent";
import ImagePreview from "./components/image-preview/ImagePreview";

function App() {
  const [dataUri, setDataUri] = useState<string>();
  const [openCamera, setOpenCamera] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleFileUpload = (dataUri: string) => {
    console.log({ dataUri });
    setDataUri(dataUri);
    setOpenCamera(false);
    setShowImagePreview(true);
  };

  const handleTakePhoto = (dataUri: string) => {
    handleFileUpload(dataUri);
  };

  const handleCameraBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenCamera(true);
  };

  const handleImagePreviewClose = () => setShowImagePreview(false);

  const handleCloseCamera = () => setOpenCamera(false);

  return (
    <div className="app">
      <section className="app-main-section">
        <div className="container">
          {openCamera ? (
            <CameraComponent
              handleTakePhoto={handleTakePhoto}
              handleCloseCamera={handleCloseCamera}
            />
          ) : showImagePreview && dataUri ? (
            <ImagePreview
              show={showImagePreview}
              dataUri={dataUri}
              handleClose={handleImagePreviewClose}
            />
          ) : (
            <>
              <FileInput handleFileUpload={handleFileUpload} />
              <CameraButton handleCameraBtnClick={handleCameraBtnClick} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
