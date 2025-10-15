import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import z from "zod";

const ImgUploadRespSchema = z.object({
    filename:z.string()
})

export function useUploadImage(){
    const {mutate:uploadImg,data,isPending} = useMutation({
        mutationFn:async(image:File)=>{
            const resp = await axios.postForm("api/upload",{image})
            const respParse = ImgUploadRespSchema.safeParse(resp.data)
            if (!respParse.success){
                throw new Error("parse error")
            }
            return respParse.data.filename
        },
        onError:(error:Error)=>{
            toast.error(error.message)
        }
    })
    return {uploadImg,data,isPending}
}