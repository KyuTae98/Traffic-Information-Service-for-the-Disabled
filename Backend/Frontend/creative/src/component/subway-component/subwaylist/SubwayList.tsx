import React from "react";
import styled from "styled-components";
import SubwayItems from "./SubwayItems.tsx";
import SubwayNumber from "../subwaynumber/SubwayNumber.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";

const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 100%;
max-height:50%;
min-height:50%;
padding:0;
margin:0;
overflow:auto;
a{ 
    text-decoration:none; 
}
`

const SubwayList = () => {
    const subwayCheck = useSelector((state:RootState) => state.subway.subwayCheck)
    const subway = useSelector((state:RootState) => state.subway.subway)
    return (
        <StyledList>
            {subwayCheck && <SubwayNumber count={subway.length} />}
            {subwayCheck && subway.map((elemnet:any) =>
                <SubwayItems
                    key={elemnet.stCd + elemnet.stNm}
                    items={elemnet}
                />)}
        </StyledList>
    )
}

export default SubwayList;