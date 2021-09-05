import React from "react";

function TopButton({ children }) {
  return (
    <div>
      <button className="topButton">{children}</button>
    </div>
  );
}

export default TopButton;
