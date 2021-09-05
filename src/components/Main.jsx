import React, { useState } from "react";
import ThreadArea from "./ThreadArea";
import TopButtons from "./TopButtons";
import NewPostThread from "./NewPostThread";
function Main() {
  const [threadList, setThreadList] = useState([
    {
      id: 1,
      name: "うんこ1",
      title: "うんこだな1ｗ",
      comment: "これはテストだよ",
    },
  ]);
  return (
    <div>
      <TopButtons />
      <ThreadArea threadList={threadList} />
      <NewPostThread threadList={threadList} setThreadList={setThreadList} />
    </div>
  );
}

export default Main;
