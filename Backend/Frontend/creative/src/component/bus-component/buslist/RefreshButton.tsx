import React from "react";
import styled from "styled-components";
import { api } from "../../auth/Api.ts";
import { useSelector, useDispatch } from "react-redux";
import { BusActions } from "../../../store/Bus-slice.ts";
import { RootState } from "../../../store/index.ts";

const StyledRefreshButton = styled.button`
  width: 2em;
  height: 2em;
  border: 0;
  border-radius: 50px;
  background-color: transparent;
  padding: 0;
  img {
    width: 70%;
    height: 70%;
  }
  :hover {
    cursor: pointer;
  }
`;

const RefreshButton = () => {
  const dispatch = useDispatch();
  const busId = useSelector((state:RootState) => state.bus.busId);
  const clickCheck = {
    check: false,
  };
  const Refresh = async () => {
    clickCheck.check = true;
    await api
      .get(`/bus/arsId/${busId}`)
      .then((res) => {
        const { data } = res;
        dispatch(BusActions.addBusInfo(data));
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <StyledRefreshButton className="fresh" onClick={Refresh}>
      <img src="./image/refresh.png" alt="새로고침" />
    </StyledRefreshButton>
  );
};

export default RefreshButton;
