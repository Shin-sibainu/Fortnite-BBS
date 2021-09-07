import React, { useRef, useState } from "react";
import ThreadArea from "./ThreadArea";
import TopButtons from "./TopButtons";
import NewPostThread from "./NewPostThread";
import ReactPaginate from "react-paginate";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function Main() {
  const perPage = 5;

  const threadAddRef = useRef(null);

  const [threadInfo] = useCollection(
    db.collection("threads").orderBy("timestamp", "desc")
  );

  const [pagenateInfoList, setPagenateInforList] = useState({
    offset: 0, //始まりの位置
    perPage: perPage, //１ページに表示するスレッド数
  });
  const handlePageClick = (data) => {
    /* slice a list five thread and update offset */
    let pageNumber = data["selected"]; //2を押したら１が返る。
    //始まりの位置が変更されるだけ
    setPagenateInforList({
      offset: pageNumber * perPage, //2番のリンクをクリックしたら1*5=5になる。
      perPage: perPage,
    });
    //pageのトップに自動でスクロールする。
    threadAddRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div ref={threadAddRef} style={{ paddingTop: 10 }}></div>
      <TopButtons />
      <ThreadArea
        threadInfo={threadInfo}
        offset={pagenateInfoList.offset}
        perPage={pagenateInfoList.perPage}
      />
      {/* paginationArea */}
      <ReactPaginate
        pageCount={Math.ceil(threadInfo?.size / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="paginateContainer"
        pageClassName="pageItem"
        pageLinkClassName="pageLink"
        activeClassName={"active"}
        previousLabel={"<<"}
        nextLabel={">>"}
        previousClassName="pageItem" // '<'の親要素(li)のクラス名
        nextClassName="pageItem"
        disabledClassName="disabled" //先頭or末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
        breakLabel={"..."}
        breakClassName="pageItem" // 上記の「…」のクラス名
        breakLinkClassName="pageIink" // 「…」の中のリンクにつけるクラス
      />
      <NewPostThread
        threadAddRef={threadAddRef}
        setPagenateInforList={setPagenateInforList}
      />
    </div>
  );
}

export default Main;
