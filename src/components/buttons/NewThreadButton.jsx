import React from "react";

function NewThreadButton({ newThreadAddRef }) {
  const goNewThread = () => {
    /* 新しいスレッド投稿エリアにスクロールする */
    newThreadAddRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div>
      <button className="topButton" onClick={() => goNewThread()}>
        新規スレッド
      </button>
    </div>
  );
}

export default NewThreadButton;
