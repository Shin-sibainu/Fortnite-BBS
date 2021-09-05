import React from "react";
import Thread from "./Thread";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectThreadId } from "../features/appSlice";

function ThreadArea() {
  const threadId = useSelector(selectThreadId); //これがnull状態が原因か？
  const [threadInfo] = useCollection(
    threadId && db.collection("threads").doc(threadId)
  );

  return (
    <div className="threadArea">
      {threadInfo?.docs.map((doc) => {
        const { name, threadFirstComment, threadid, title } = doc.data();
        return (
          <Thread
            key={doc.id}
            name={name}
            threadFirstComment={threadFirstComment}
            threadid={threadid}
            title={title}
          />
        );
      })}
    </div>
  );
}

export default ThreadArea;
