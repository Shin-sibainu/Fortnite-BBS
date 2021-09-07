import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import firebase from "@firebase/app-compat";

function NewPostThread({ threadAddRef, setPagenateInforList }) {
  const [inputName, setInputName] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputComment, setInputComment] = useState("");

  const newThreadFormVailed = () => {
    if (
      inputName.length !== 0 &&
      inputTitle.length !== 0 &&
      inputComment.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addThreadToFirebase = (e) => {
    e.preventDefault();
    if (newThreadFormVailed()) {
      /* データベースに保存 */
      try {
        addDoc(collection(db, "threads"), {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          name: inputName,
          title: inputTitle,
          threadFirstComment: inputComment,
        });
        setInputName("");
        setInputTitle("");
        setInputComment("");
      } catch (e) {
        console.log("Error adding document ", e);
      }

      /* 表示するリストを最初のoffsetに戻すとか */
      setPagenateInforList({
        offset: 0,
        perPage: 5,
      });
      /* 上にスクロールする */
      threadAddRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };
  return (
    <div>
      <form onSubmit={addThreadToFirebase}>
        <div className="postArea">
          <div className="postBox">
            <span>新規スレッド立ち上げ</span>
            <table className="postTable">
              <tbody>
                <tr>
                  <th>おなまえ</th>
                  <td>
                    <input
                      onChange={handleNameChange}
                      type="text"
                      name="name"
                      maxLength="12"
                      className="nameInput"
                      value={inputName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>タイトル</th>
                  <td>
                    <input
                      onChange={handleTitleChange}
                      type="text"
                      name="sub"
                      maxLength="20"
                      className="titleInput"
                      value={inputTitle}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">
                    コメント
                    <br />
                    <textarea
                      name="comment"
                      className="textArea"
                      onChange={handleCommentChange}
                      value={inputComment}
                    ></textarea>
                    <button className="submitButton">投稿</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPostThread;
