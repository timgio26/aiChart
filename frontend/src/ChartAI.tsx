import { useState } from "react";
import { getChartDesc } from "./Ai";

export function ChartAI() {
  const [preview, setPreview] = useState<string>();

  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
    const resp = await getChartDesc("https://imgupload-urf0.onrender.com/uploads/3a1e670e90a04260832bfcb881fb65a1.png")
    console.log(resp)
    }

  return (
    <div className="flex flex-col items-center gap-4 p-6 max-w-md mx-auto border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-gray-800">
        📷 Upload Your Image
      </h2>

      <label
        htmlFor="image-upload"
        className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <span className="text-gray-600">Click or drag to upload</span>
      </label>

      {preview && (
        <div className="w-full">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full rounded-md border border-gray-200 shadow-sm"
          />
        </div>
      )}

      <div>
        <span>ai generated content here</span>
      </div>
    </div>
  );
}
