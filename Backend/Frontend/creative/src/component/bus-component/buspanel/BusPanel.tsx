import React from "react";
import styled from "styled-components";


const StyledBusPanel = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
width: 19vw;
height: 85vh;
margin-right:30px;
background: linear-gradient(270.31deg, #999C0D -27.07%, rgba(205, 208, 41, 0) 206.73%);
.first{
    font-size: 2.5vw;
    color: #FFFFFF;
    font-family: 'GmarketSansMedium';
    font-weight: 500;
}
.second{
    padding:0 1vw;
    font-size: 2vw;
    font-family: 'Pretendard-Regular';
    color: #FFFFFF;
}


@media (max-width:500px) {
width:100vw;
height:5vh;
flex-direction:row;
justify-content:space-evenly;
.first{
    font-size: 4.5vw;
}
.second{
    font-size: 3vw;
}
}
`

const BusPanel = () => {
    return (
        <StyledBusPanel>
            <p className="first">저상버스</p><br />
            <p className="second">저상버스가 오는 정류장만 표시됩니다.</p>
        </StyledBusPanel>
    )
}

export default BusPanel