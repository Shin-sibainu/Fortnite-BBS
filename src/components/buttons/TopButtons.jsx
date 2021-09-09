import React from "react";
import ContactButton from "./ContactButton";
import NewThreadButton from "./NewThreadButton";

function TopButtons({ newThreadAddRef }) {
  return (
    <div className="topButtonsArea">
      <NewThreadButton newThreadAddRef={newThreadAddRef}>
        新規スレッド
      </NewThreadButton>
      <ContactButton>連絡</ContactButton>
    </div>
  );
}

export default TopButtons;
