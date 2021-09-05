import React, { useState } from "react";
import ThreadArea from "./ThreadArea";
import TopButtons from "./TopButtons";
function Main() {
  const [threadList, setThreadList] = useState([]);
  return (
    <div>
      <TopButtons />
      <ThreadArea threadList={threadList} />
    </div>
  );
}

export default Main;
