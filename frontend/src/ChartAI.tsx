import toast from "react-hot-toast";
// import { getChartDesc } from "./Ai";
import { useGetImgInsight, useUploadImage } from "./MyQuery";
import { useState } from "react";

export function ChartAI() {
  const [preview, setPreview] = useState<boolean>(false);
  const [model, setModel] = useState<string>();
  const [method, setMethod] = useState<string>();
  // const [aiResp,setAiResp] = useState<string>()
  // const [isLoading,setIsLoading] = useState<boolean>(false)
  const { uploadImg, data, isPending } = useUploadImage();
  const {generateInsight,data:Insight,isPending:isGenerating} = useGetImgInsight()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    uploadImg(file, {
      onSuccess: () => {
        setPreview(true);
      }
    });
  };

  async function handleGetAnswer(){
    try {
      // setIsLoading(true)
      if(!model || !data){throw new Error("no model selected");}
      generateInsight({imgurl:`${import.meta.env.VITE_API_BASE_URL}/${data}`,model})
      // console.log(Insight)
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message.trim())
      }else{
        toast.error("something wrong")
      }
    } 
  }
  console.log(Insight)
  return (
    <div className="flex flex-col items-center gap-4 md:p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">
        📷 Upload Your Image
      </h2>

      {data && preview ? (
        <div className="relative w-full space-y-4">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${data}`}
            alt="Preview"
            className="w-full max-w-lg mx-auto rounded-lg border border-gray-200 shadow-md"
          />
          <button
            onClick={() => setPreview(false)}
            className="absolute top-3 right-3 inline-flex items-center gap-2 bg-white border border-gray-300 text-sm text-gray-700 font-medium px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Change Image
          </button>
        </div>
      ) : (
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
          <span className="text-gray-600">
            {!isPending ? "Click to upload" : "Loading..."}
          </span>
        </label>
      )}

      <div className="flex flex-col w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          ⚙️ Settings
        </h2>

        <div className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="model"
              className="text-sm font-medium text-gray-600"
            >
              LLM Model {model}
            </label>
            <select
              name="model"
              id="model"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
              onChange={(e) => setModel(e.target.value)}
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Select a model...
              </option>
              <option value="openai/gpt-4.1-mini">gpt-4.1-mini</option>
              <option value="openai/gpt-4.1-nano">gpt-4.1-nano</option>
              {/* <option value="openai/o4-mini">o4-mini</option> */}
            </select>
          </div>
          <div>
            <label
              htmlFor="prompt"
              className="text-sm font-medium text-gray-600"
            >
              Prompt Method {method}
            </label>
            <select
              name="prompt"
              id="prompt"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
              defaultValue={""}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="" disabled hidden>
                Select a method...
              </option>
              <option value="Promt A">Prompt A</option>
              <option value="Promt B">Prompt B</option>
            </select>
          </div>
        </div>
      </div>
      {method && model && data && preview && (
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          onClick={handleGetAnswer}
        >
          {!isGenerating?"Generate Answer":"Thinking..."}
        </button>
      )}

      <div>
        <span>{Insight?.insight}</span>
      </div>
      {/* {htmlContent} */}
    </div>
  );
}
