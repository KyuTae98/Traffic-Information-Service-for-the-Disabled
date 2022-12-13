import classes from "./SubwayElevator.module.css"
import Header from "../../component/header/Header.js"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"
import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.js"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice"

const SubwayElevator = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [ElePos, setElePos] = useState([]);
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        dispatch(SubwayActions.saveSubway({ stCd, stNm, railCd, lnCd }))
        const getBathChair = async () => {
            await api.get(`/subway/convenience/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    setElePos(data)
                })
        }
        getBathChair()
    }, [])
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["편의시설 위치"]} menu={<SubwayBar />} />
                <img className={classes.elevator} src={`${ElePos[0]?.imgPath}`} />
            </div>
        </div>
    )
}



export default SubwayElevator 
