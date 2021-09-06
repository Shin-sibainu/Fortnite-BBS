import React from "react";
import Thread from "./Thread";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function ThreadArea() {
  const [threadInfo] = useCollection(
    db.collection("threads").orderBy("timestamp", "desc").limit(5)
  );

  return (
    <div className="threadArea">
      {threadInfo?.docs.map((doc) => {
        const { name, threadFirstComment, title, timestamp } = doc.data();
        return (
          <Thread
            key={doc.id}
            id={doc.id}
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
