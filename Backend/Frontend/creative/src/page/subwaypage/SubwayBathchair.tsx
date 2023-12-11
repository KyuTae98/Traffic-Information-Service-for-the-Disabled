import React, {Suspense} from "react";
import classes from "./SubwayBathchair.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayInfo from "../../component/subway-component/subwayinfo/SubwayInfo.tsx"
import SubwayElebatorImg from "../../component/subway-component/subwayelebator/SubwayElebatorImg.tsx";
import Loding from "../../component/loding/Loding.tsx";

import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice.ts"
import {getBathChair, getBathChairConvinence} from "../../utils/getSubwayApi.ts"

const SubwayBathchair = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const stCd = params.stCd;
    const stNm = params.stNm;
    const railCd = params.railCd;
    const lnCd = params.lnCd;
    dispatch(SubwayActions.saveSubway({ stCd, stNm, railCd, lnCd }))    
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["휠체어 관련위치"]} menu={<SubwayBar />} />
                <Suspense fallback={<Loding/>}>
                    <SubwayInfo bath={getBathChairConvinence(stCd,stNm,railCd,lnCd)} />
                   <SubwayElebatorImg elevator={getBathChair(stCd,stNm,railCd,lnCd)}/>
                </Suspense>
            </div>
        </div>
    )
}

export default SubwayBathchair 
