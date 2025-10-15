// import { useState } from "react";
// import { getChartDesc } from "./Ai";
import { useUploadImage } from "./MyQuery";
import { useEffect } from "react";

export function ChartAI() {
  // const [preview, setPreview] = useState<string>();
  const {uploadImg,data,isPending} = useUploadImage()

  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    uploadImg(file)
    }

  useEffect(()=>{console.log("img change")},[data])

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
        <span className="text-gray-600">{!isPending?"Click to upload":"Loading..."}</span>
      </label>

      {data && (
        <div className="w-full">
          <img
            src={`http://localhost:5000/${data}`}
            alt="Preview"
            className="max-w-full rounded-md border border-gray-200 shadow-sm"
          />
        </div>
      )}

      <div>
        {/* <span>{data}</span> */}
        <span>ai generated content here</span>
      </div>
    </div>
  );
}
