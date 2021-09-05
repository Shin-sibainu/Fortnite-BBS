import React from "react";
import TopButton from "./TopButton";

function TopButtons() {
  return (
    <div className="topButtonsArea">
      <TopButton>最新スレッド</TopButton>
      <TopButton>人気スレッド</TopButton>
      <TopButton>連絡</TopButton>
    </div>
  );
}

export default TopButtons;
