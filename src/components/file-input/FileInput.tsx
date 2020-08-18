import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileInput.css";

interface FileInputProps {
  handleFileUpload: (dataUri: string) => void;
}

const FileInput: React.FC<FileInputProps> = ({ handleFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: Array<File> = []) => {
      acceptedFiles = acceptedFiles.filter((f) => f);
      if (acceptedFiles.length > 0) {
        let reader = new FileReader();
        const file = acceptedFiles[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log({
            data: reader.result,
            acceptedFiles,
          });
          handleFileUpload(reader.result as string);
        };
      }
    },
    [handleFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <section className="file-input-box">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop image, or click to select file</p>
      </div>
    </section>
  );
};

export default FileInput;
