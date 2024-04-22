import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Home() {
  //setting the visiblit for the "CLICK ME" button
  const [visible, setVisible] = useState("none");
  const [bookVisiblitiy, setBookVisiblitiy] = useState("none");
  const [pageCount, setPageCount] = useState(1);
  const [backgroundColour, setBackgroundColour] = useState("black");

  let doc = document.body;
  doc.style.backgroundColor = backgroundColour;

  //check is the title is clicked -=>
  //- changes visiblity of button to "block"
  function title_click() {
    setVisible("block");
  }

  //loads in the book
  function button_click() {
    setBackgroundColour("antiquewhite");
    doc.style.backgroundColor = backgroundColour;
    setBookVisiblitiy("block");
  }

  function resetBook(bookPages) {
    setTimeout(() => {
      bookPages.forEach((page, index) => {
        page.style.transition = "transform 0.8s";
        page.style.transformOrigin = `0% 50%`; // Set the transformation origin to the top-right corner
        page.style.transform = "translate(0px) rotateY(0deg)";
        setTimeout(() => {
          page.style.zIndex = `${index}`;
        }, "265");
      });
    }, "1000"); // Add 3 seconds for the delay
    setPageCount(1);
  }

  /** flips the right page over to the left
   *
   * @param {*} currentPage  -element of the page to be flipped over
   */
  function next_page_aid(currentPage) {
    currentPage.style.transition = "transform 0.8s";
    currentPage.style.transformOrigin = `0% 50%`; // Set the transformation origin to the top-right corner
    currentPage.style.transform = `translate(250px) rotateY(180deg)`;
  }

  /** depending on what page, flips the apropiate page.
   *If book is on front page, also move the rest of the pages to the left
   *If book is being flipped to the end, move the rest of the pages
   *back into place and call the reset book function
   */
  function nextPage() {
    console.log("next");

    switch (pageCount) {
      case 1:
        /*gets a list of all the page containerts and shifts them
        to the right simulating a books right half being a connected whole*/
        var movePages = [
          document.getElementsByClassName("second-page-inner")[0],
          document.getElementsByClassName("third-page-inner")[0],
          document.getElementsByClassName("forth-page-inner")[0],
          document.getElementsByClassName("back-page-inner")[0],
        ];

        movePages.forEach((page) => {
          page.style.transition = "transform 0.8s";
          page.style.transform = "translate(250px)";
        });

        //gets the front page container
        var inner = document.getElementsByClassName("front-page-inner")[0];

        //flips the page over
        next_page_aid(inner);

        //updates the page count
        setPageCount(2);

        break;
      case 2:
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("front-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the second page container
        var inner = document.getElementsByClassName("second-page-inner")[0];

        next_page_aid(inner);

        setPageCount(3);

        break;
      case 3:
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("second-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the third page container
        var inner = document.getElementsByClassName("third-page-inner")[0];

        next_page_aid(inner);

        setPageCount(4);

        break;
      case 4:
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("third-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the forth page container
        var inner = document.getElementsByClassName("forth-page-inner")[0];

        next_page_aid(inner);

        setPageCount(5);

        break;
      case 5:
        console.log("close book");
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("forth-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the forth page container
        var inner = document.getElementsByClassName("back-page-inner")[0];

        next_page_aid(inner);

        var movePages = [
          document.getElementsByClassName("back-page-inner")[0],
          document.getElementsByClassName("forth-page-inner")[0],
          document.getElementsByClassName("third-page-inner")[0],
          document.getElementsByClassName("second-page-inner")[0],
          document.getElementsByClassName("front-page-inner")[0],
        ];

        setPageCount(6);

        resetBook(movePages);
        break;
    }
  }

  function prev_page_aid(currentPage) {
    var translation = "250";
    if (pageCount == 2) {
      translation = "25";
    }
    currentPage.style.transition = "transform 0.8s";
    currentPage.style.transformOrigin = "0% 50%"; // Set the transformation origin to the top-right corner
    currentPage.style.transform = `translate(${translation}px) rotateY(0deg)`;
  }

  function prevPage() {
    console.log("prev");
    switch (pageCount) {
      case 2:
        /*gets a list of all the page containerts and shifts them
        to the right simulating a books right half being a connected whole*/
        var movePages = [
          document.getElementsByClassName("second-page-inner")[0],
          document.getElementsByClassName("third-page-inner")[0],
          document.getElementsByClassName("forth-page-inner")[0],
          document.getElementsByClassName("back-page-inner")[0],
        ];

        movePages.forEach((page) => {
          page.style.transition = "transform 0.8s";
          page.style.transform = "translate(25px)";
        });

        //gets the front page container
        var inner = document.getElementsByClassName("front-page-inner")[0];
        //puts front page index back to normal
        inner.style.zIndex = "4";

        prev_page_aid(inner);

        //updates the page count
        setPageCount(1);

        break;
      case 3:
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("front-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the second page container
        var inner = document.getElementsByClassName("second-page-inner")[0];
        //puts front page index back to normal
        inner.style.zIndex = "3";

        prev_page_aid(inner);

        setPageCount(2);

        break;
      case 4:
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("second-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the third page container
        var inner = document.getElementsByClassName("third-page-inner")[0];
        //puts front page index back to normal
        inner.style.zIndex = "2";

        prev_page_aid(inner);

        setPageCount(3);

        break;
      case 5:
        console.log("back from the back");
        //Changes the index of the previous container so the new page falls on top instead of underneath
        var old_inner = document.getElementsByClassName("third-page-inner")[0];
        old_inner.style.zIndex = "0";

        //gets the third page container
        var inner = document.getElementsByClassName("forth-page-inner")[0];
        //puts front page index back to normal
        inner.style.zIndex = "1";

        prev_page_aid(inner);

        setPageCount(4);

        break;
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <h5 className="main-page" onClick={() => title_click()}>
        {" "}
        Happy 1 Year!
      </h5>

      <button
        style={{ display: visible }}
        id="start"
        onClick={() => button_click()}
      >
        {" "}
        Click ME
      </button>

      <div style={{ display: bookVisiblitiy }} className="container">
        <div className="front-page-inner">
          {" "}
          <div className="front-page" onClick={() => nextPage()}>
            {" "}
            <h2 id="title-text"> Happy Anniversay</h2>
            <div className="next-page-box" onClick={() => nextPage()}>
              {" "}
              <h2 className="next-page"> 1</h2>
            </div>
          </div>
          <div className="front-page-back" onClick={() => prevPage()}>
            <h2> back of first page</h2>

            <div className="prev-page-box" onClick={() => prevPage()}>
              {" "}
              <h2 className="prev-page"> 1</h2>
            </div>
          </div>
        </div>

        <div className="second-page-inner">
          {" "}
          <div className="first-page" onClick={() => nextPage()}>
            {" "}
            <h2> this is the first page</h2>
            <div className="next-page-box" onClick={() => nextPage()}>
              {" "}
              <h2 className="next-page"> 2</h2>
            </div>
          </div>
          <div className="first-page-back" onClick={() => prevPage()}>
            <h2> this is the back of the second page</h2>
            <div className="prev-page-box" onClick={() => prevPage()}>
              {" "}
              <h2 className="prev-page"> 2</h2>
            </div>
          </div>
        </div>

        <div className="third-page-inner">
          {" "}
          <div className="second-page" onClick={() => nextPage()}>
            {" "}
            <h2> this is the second page</h2>
            <div className="next-page-box" onClick={() => nextPage()}>
              {" "}
              <h2 className="next-page"> 3</h2>
            </div>
          </div>
          <div className="second-page-back" onClick={() => prevPage()}>
            {" "}
            <h2> this is the back of the third page</h2>
            <div className="prev-page-box" onClick={() => prevPage()}>
              {" "}
              <h2 className="prev-page"> 3</h2>
            </div>
          </div>
        </div>

        <div className="forth-page-inner">
          {" "}
          <div className="third-page" onClick={() => nextPage()}>
            {" "}
            <h2> this is the third page</h2>
            <div className="next-page-box" onClick={() => nextPage()}>
              {" "}
              <h2 className="next-page"> 4</h2>
            </div>
          </div>
          <div className="third-page-back" onClick={() => nextPage()}>
            {" "}
            <h2> this is the back of the forth page</h2>
          </div>
        </div>

        <div className="back-page-inner">
          {" "}
          <div className="back-page" onClick={() => nextPage()}>
            {" "}
            <h2 id="title-text"> 5th page </h2>
            <div className="next-page-box" onClick={() => nextPage()}>
              {" "}
              <h2 className="next-page"> 1</h2>
            </div>
          </div>
          <div className="back-page-back" onClick={() => prevPage()}>
            <h2> this the back of the 5th page</h2>

            <div className="prev-page-box" onClick={() => prevPage()}>
              {" "}
              <h2 className="prev-page"> 1</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
