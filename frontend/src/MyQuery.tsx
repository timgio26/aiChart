import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import z from "zod";

interface UseGetImgInsight {
    imgurl:string
    model:string
    prompt:string
}

const UseGetImgInsightRespSchema = z.object({
    answer:z.string()
})

const ImgUploadRespSchema = z.object({
  filename: z.string(),
});

export function useUploadImage() {
  const {
    mutate: uploadImg,
    data,
    isPending,
  } = useMutation({
    mutationFn: async (image: File) => {
      const resp = await axios.postForm("api/upload", { image });
      const respParse = ImgUploadRespSchema.safeParse(resp.data);
      if (!respParse.success) {
        throw new Error("parse error");
      }
      return respParse.data.filename;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { uploadImg, data, isPending };
}

export function useGetImgInsight() {
  const { mutate:generateInsight,data, isPending } = useMutation({
    mutationFn: async ({imgurl,model,prompt}:UseGetImgInsight) => {
      const resp = await axios.post("api/generate-chart-insight", {
        imgurl,
        model,
        prompt
      });
      const parseResult = UseGetImgInsightRespSchema.safeParse(resp.data)
      if(!parseResult.success){
        throw new Error(parseResult.error.message)
      }
      return parseResult.data
    },
    onError:()=>{toast.error("cant generate chart insight")},
    // onSuccess:()=>{console.log("success")}
  });
  return {data,isPending,generateInsight}
}
