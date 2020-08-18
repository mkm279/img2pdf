import React, { useState } from "react";
import "./App.css";
import FileInput from "./components/file-input/FileInput";
import ImagePreview from "./components/image-preview/ImagePreview";

function App() {
  const [dataUri, setDataUri] = useState<string>();

  const handleFileUpload = (dataUri: string) => {
    setDataUri(dataUri);
  };

  const handleImagePreviewClose = () => setDataUri("");

  return (
    <div className="app">
      <section className="app-main-section">
        <div className="container">
          {dataUri ? (
            <ImagePreview
              dataUri={dataUri}
              handleClose={handleImagePreviewClose}
            />
          ) : (
            <>
              <FileInput handleFileUpload={handleFileUpload} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
