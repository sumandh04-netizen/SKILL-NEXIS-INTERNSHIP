import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");

  // Select image
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setUploadedImage(null);
    setMessage("");
  };

  // Upload image
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();

    formData.append("image", selectedFile);

    try {
      setMessage("Uploading...");

      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Upload failed.");
        return;
      }

      setMessage(data.message);
      setUploadedImage(data.imageUrl);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Image Upload Application</h1>

        <p className="subtitle">
          Upload and preview your image
        </p>

        {/* File selection */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Preview */}
        {preview && (
          <div className="section">
            <h2>Image Preview</h2>

            <img
              src={preview}
              alt="Preview"
              className="image"
            />
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload Image
        </button>

        {/* Message */}
        {message && (
          <p className="message">
            {message}
          </p>
        )}

        {/* Uploaded image */}
        {uploadedImage && (
          <div className="section">
            <h2>Uploaded Image</h2>

            <img
              src={uploadedImage}
              alt="Uploaded"
              className="image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;