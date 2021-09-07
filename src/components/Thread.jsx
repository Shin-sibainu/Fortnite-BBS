import React from "react";
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
  const [nameErrors, setNameErrors] = useState([]);
  const [textAreaErrors, setTextAreaErrors] = useState([]);

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
      threadId &&
        db.collection("threads").doc(threadId).collection("reply").add({
          name: inputName,
          replyComment: inputTextArea,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setInputName("");
      setInputTextArea("");
      /* １番上にスクロールする */
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

  return (
    <div>
      <div className="thread">
        <strong>
          <span id="threadnumber">お題:</span>
          {title}
        </strong>
        <div className="threadComment">
          <p id="username">
            No.1 名前: <b> {name}</b>
            <span className="threadInfo">
              {new Date(timestamp?.toDate()).toLocaleString()}
              <a href="http://shincode.info">[返信]</a>
            </span>
          </p>
          <p id="threadContentArea">
            <span id="threadContent">{threadFirstComment}</span>
          </p>
          {/* threadIdによって表示させる内容を変える必要がある。 */}
          {/* threadId4ならthreadId4のreplyInfoをmapで繰り返し表示させる */}
          {id &&
            replyInfo?.docs.map((reply, index) => {
              const { name, replyComment, timestamp } = reply.data();
              return (
                <div key={reply.id}>
                  <p id="username">
                    No.{index + 2} 名前: <b> {name}</b>
                    <span className="threadInfo">
                      {new Date(timestamp?.toDate()).toLocaleString()}
                      <a href="http://shincode.info">[返信]</a>
                    </span>
                  </p>
                  <p id="threadContentArea">
                    <span id="threadContent">{replyComment}</span>
                  </p>
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
                  <br />
                  <textarea
                    onChange={handleTextAreaChange}
                    name="comment"
                    className="textArea"
                    value={inputTextArea}
                  ></textarea>
                  {textAreaErrors && (
                    <span id="errorMessage">{textAreaErrors.errorMessage}</span>
                  )}
                  <button className="submitButton">投稿</button>
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
