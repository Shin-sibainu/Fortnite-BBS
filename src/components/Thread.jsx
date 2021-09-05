import React from "react";
import { useState } from "react";
// import { db } from "../firebase";

function Thread({ name, threadFirstComment, title, timestamp }) {
  const [inputName, setInputName] = useState("");
  const [inputTextArea, setInputTextArea] = useState("");

  const handleChange = (e) => {
    setInputName(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setInputTextArea(e.target.value);
  };

  const formVailed = () => {
    if (inputName.length !== 0 && inputTextArea.length !== 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formVailed()) {
      /* データベースに返信したデータを送る */
      console.log("submit");
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
          {/* ここから返信コメントを複数生成 */}
          {/*           {replyList.map((reply, index) => (
            <div key={index}>
              <p id="username">
                No.{index + 2} 名前: <b> {reply.name}</b>
                <span className="threadInfo">
                  2021/08/26(木)14:29
                  <a href="http://shincode.info">[返信]</a>
                </span>
              </p>
              <p id="threadContentArea">
                <span id="threadContent">{reply.replyComment}</span>
              </p>
            </div>
          ))} */}
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
                  />
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
