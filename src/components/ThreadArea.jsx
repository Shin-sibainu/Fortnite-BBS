import React from "react";
import Thread from "./Thread";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
// import { useSelector } from "react-redux";

function ThreadArea() {
  // const threadId = useSelector(selectThreadId); //これがnull状態が原因か？どのthreadなのか分かってない状態っぽい。
  const [threadInfo] = useCollection(
    db.collection("threads").orderBy("timestamp", "desc").limit(5)
  );

  return (
    <div className="threadArea">
      {threadInfo?.docs.map((doc) => {
        const { name, threadFirstComment, title, timestamp } = doc.data();
        console.log(doc.data());
        return (
          <Thread
            key={doc.id}
            name={name}
            threadFirstComment={threadFirstComment}
            title={title}
            timestamp={timestamp}
          />
        );
      })}
    </div>
  );
}

export default ThreadArea;
