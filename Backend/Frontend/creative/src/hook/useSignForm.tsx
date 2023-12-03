import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux";
import {wrapPromise} from "../promise/warmPromise.ts"
import { api } from "../component/auth/Api.ts";
import { RootState } from "../store/index";


const useSignForm = () => {
    const [signArr,SetSignArr] = useState<any[]>([""]);
    let start = useSelector((state:RootState)=>state.sign.startPostion);
    let end = useSelector((state:RootState)=>state.sign.endPostion);  
    useEffect(() => {
        const getbusNsub = async () => {
            await api.get(`/navigation/${start.tmY}/${start.tmX}/${end.tmY}/${end.tmX}/busNsub`)
            .then(res=>{
                console.log(res.data,"busNsub")
                SetSignArr([res.data])
            })
        }
        getbusNsub();
    },[start,end])
    return signArr;
}



export default useSignForm;