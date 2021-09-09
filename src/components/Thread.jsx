import React, { useRef } from "react";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "@firebase/app-compat";
import { useDispatch, useSelector } from "react-redux";
import { selectThread, selectThreadId } from "../features/appSlice";
import { useCollection } from "react-firebase-hooks/firestore";
// import { collection, addDoc, setDoc, doc } from "firebase/firestore";

function Thread({ id, name, threadFirstComment, title, timestamp }) {
  const [inputName, setInputName] = useState("");
  const [inputTextArea, setInputTextArea] = useState("");
  const [replyToName, setReplyToName] = useState("");
  const [nameErrors, setNameErrors] = useState([]);
  const [textAreaErrors, setTextAreaErrors] = useState([]);
  const replyFormRef = useRef(null);

  const dispatch = useDispatch();
  const threadId = useSelector(selectThreadId); //フォーカスしたときにしか呼ばれないよね。
  const [replyInfo] = useCollection(
    id &&
      db
        .collection("threads")
        .doc(id)
        .collection("reply")
        .orderBy("timestamp", "asc")
  );

  const handleChange = (e) => {
    setInputName(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setInputTextArea(e.target.value);
  };

  const formVailed = () => {
    if (inputName.length === 0 && inputTextArea.length !== 0) {
      setNameErrors({
        errorMessage: "※未入力エラーです。",
      });
      setTextAreaErrors([]);
    } else if (inputName.length !== 0 && inputTextArea.length === 0) {
      setTextAreaErrors({
        errorMessage: "※未入力エラーです。",
      });
      setNameErrors([]);
    } else if (inputName.length === 0 && inputTextArea.length === 0) {
      setNameErrors({
        errorMessage: "※未入力エラーです。",
      });
      setTextAreaErrors({
        errorMessage: "※未入力エラーです。",
      });
      return false;
    } else if (inputName.length !== 0 && inputTextArea.length !== 0) {
      setNameErrors([]);
      setTextAreaErrors([]);
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formVailed()) {
      /* データベースに返信したデータを送る */
      /* 返信先を指定しているときはreplyToName: >>>宛名とともに保存する。 */
      if (replyToName.length > 0) {
        console.log(replyToName);
        threadId &&
          db
            .collection("threads")
            .doc(threadId)
            .collection("reply")
            .add({
              name: inputName,
              replyAddress: ">>" + replyToName,
              replyComment: inputTextArea,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setInputName("");
        setInputTextArea("");
        setReplyToName("");
        return;
      }
      threadId &&
        db.collection("threads").doc(threadId).collection("reply").add({
          name: inputName,
          replyComment: inputTextArea,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setInputName("");
      setInputTextArea("");
      setReplyToName("");
    }
  };

  const handleFocus = () => {
    /* どのthreadのなのかを指定 */
    if (id) {
      dispatch(
        selectThread({
          threadId: id,
        })
      );
    }
  };

  const handleReplyButton = (name) => {
    /* 返信先宛名を設定 */
    setReplyToName(name);
    /* 自動で返信欄へスクロール */
    replyFormRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const replyCancel = () => {
    /* 返信を解除 */
    console.log("a");
    setReplyToName("");
  };

  return (
    <div>
      <div className="thread">
        <strong>
          <span id="threadnumber">お題:</span>
          {title}
        </strong>
        <div className="threadComment">
          <p id="username">
            1 名前: <b> {name}</b>
            <span className="threadInfo">
              <span className="dateText">
                {new Date(timestamp?.toDate()).toLocaleString()}
              </span>
              <button
                className="replyButton"
                onClick={() => handleReplyButton(name)}
              >
                [返信]
              </button>
            </span>
          </p>
          <p id="threadContentArea">
            <span id="threadContent">{threadFirstComment}</span>
          </p>
          {/* threadIdによって表示させる内容を変える必要がある。 */}
          {/* threadId4ならthreadId4のreplyInfoをmapで繰り返し表示させる */}
          {id &&
            replyInfo?.docs.map((reply, index) => {
              const { name, replyComment, timestamp, replyAddress } =
                reply.data();
              return (
                <div key={reply.id}>
                  <p id="username">
                    {index + 2} 名前: <b> {name}</b>
                    <span className="threadInfo">
                      <span className="dateText">
                        {new Date(timestamp?.toDate()).toLocaleString()}
                      </span>
                      <button
                        className="replyButton"
                        onClick={() => handleReplyButton(name)}
                      >
                        [返信]
                      </button>
                    </span>
                  </p>
                  <div id="threadContentArea" ref={replyFormRef}>
                    <span id="threadContent">
                      {/* 送信ボタンを押したかつreplyToNameに名前があれば、改行してリプライする */}
                      {replyAddress && (
                        <div
                          className="replyAddress"
                          style={{ marginBottom: 2 }}
                        >
                          {replyAddress}
                        </div>
                      )}
                      {replyComment}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        {/* 返信用フォーム */}
        <form onSubmit={handleSubmit}>
          <table className="replyTable">
            <tbody>
              <tr>
                <th>おなまえ</th>
                <td>
                  <input
                    onChange={handleChange}
                    value={inputName}
                    type="name"
                    name="name"
                    maxLength="12"
                    className="nameInput"
                    onFocus={handleFocus}
                  />
                  {nameErrors && (
                    <span id="errorMessage">{nameErrors.errorMessage}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th colSpan="2">
                  このスレッドに書き込む
                  <span className="replyToName">
                    {replyToName ? "(To:" + replyToName + "さんへ)" : ""}
                  </span>
                  <br />
                  <textarea
                    placeholder={replyToName && `>>${replyToName}さんへの返信`}
                    onChange={handleTextAreaChange}
                    name="comment"
                    className="textArea"
                    value={inputTextArea}
                  ></textarea>
                  {textAreaErrors && (
                    <span id="errorMessage">{textAreaErrors.errorMessage}</span>
                  )}
                  <div className="replyButtons">
                    <button className="submitButton">投稿</button>
                    <button
                      type="button"
                      className="replyCancel"
                      onClick={replyCancel}
                    >
                      返信解除
                    </button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Thread;
