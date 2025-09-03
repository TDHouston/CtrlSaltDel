import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

function RecipeImageUploader({ recipeId, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch(
        API_ENDPOINTS.RECIPES.IMAGES(recipeId),
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      onUploadSuccess(data.imageUrl); // Pass uploaded URL back to parent
    } catch (err) {
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default RecipeImageUploader;
