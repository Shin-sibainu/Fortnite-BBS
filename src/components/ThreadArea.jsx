import React from "react";
import Thread from "./Thread";

function ThreadArea({ threadInfo, offset, perPage }) {
  return (
    <div className="threadArea">
      {threadInfo?.docs.slice(offset, offset + perPage).map((thread) => {
        const { name, threadFirstComment, title, timestamp } = thread.data();
        return (
          <Thread
            key={thread.id}
            id={thread.id}
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
