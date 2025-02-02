import React from "react";
import styled from "styled-components";
import { api } from "../../auth/Api.ts";
import { useDispatch, useSelector } from "react-redux";
import { BusActions } from "../../../store/Bus-slice.ts";
import { MapActions } from "../../../store/Map-slice.ts";
import { useEffect, useState } from "react";
import { RootState } from "../../../store/index.ts";

interface stItem {
  color:string;
}

const StationItem = (props:any) => {
  const [color, setColor] = useState<string>("false");
  const { stNm, arsId, tmX, tmY } = props.items;
  const dispatch = useDispatch();
  const station = useSelector((state:RootState) => state.bus.currentStation);
  useEffect(() => {
    if (station === arsId) {
      setColor("false");
    } else {
      setColor("true");
    }
  }, [arsId, station]);

  const ClickClass = () => {
    if (station === arsId) {
      SubmitStation();
    } else if (station !== arsId) {
      setColor("false");
      dispatch(BusActions.ClickStation(arsId));
      dispatch(MapActions.positioning({ tmX, tmY }));
    }
  };

  const SubmitStation = async () => {
    await api
      .get(`/bus/arsId/${arsId}`, {})
      .then((res) => {
        const { data } = res;
        dispatch(BusActions.refreshBus(arsId));
        dispatch(BusActions.addBusInfo(data));
      })
      .catch((error) => {
        alert("저상 버스가 없습니다.");
      });
  };

  return (
    <StyledStationItem color={color} onClick={ClickClass}>
      <p className="Name"> {stNm}</p>
      <p className="id">{arsId}</p>
    </StyledStationItem>
  );
};

const StyledStationItem = styled.li<stItem>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  list-style: none;
  border-bottom: 1px solid #d2d2d2;
  background-color: ${props => (props.color==="true" ? "#FFFFFF" : "#FFD12D")};
  font-family: "Pretendard-Regular";
  :hover {
    cursor: pointer;
  }

  .Name {
    padding-left: 20px;
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: ${props => (props.color==="true" ? "400" : "700")};
    font-size: 1em;
    line-height: 60px;
    color: ${props => (props.color==="true" ? "#000000" : "#FFFFFF")};
  }

  .id {
    padding-right: 20px;
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: ${props => (props.color==="true" ? "500" : "700")};
    font-size: 1em;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${props => (props.color==="true" ? "#000000" : "#FFFFFF")};
  }
`;

export default StationItem;
