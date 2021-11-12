/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import VideoFile from "./video1.mp4";

import "./App.css";

const App = () => {
  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  const getDragItem = () => {
    const dragItem = document.querySelector("#imgId");
    return dragItem;
  }

  React.useEffect(() => {
    const container = document.querySelector("#container");
    container.addEventListener("touchstart", onDragStart, false);
    container.addEventListener("touchend", onDragEnd, false);
    container.addEventListener("touchmove", onDrag, false);
    container.addEventListener("mousedown", onDragStart, false);
    container.addEventListener("mouseup", onDragEnd, false);
    container.addEventListener("mousemove", onDrag, false);
  }, []);

  const onDragStart = (e) => {
    const dragItem = getDragItem();
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    if (e.target === dragItem) {
      active = true;
    }
  };

  const onDragEnd = (e) => {
    active = false;
    initialX = currentX;
    initialY = currentY;
  };

  const onDrag = (e) => {
    const dragItem = getDragItem();
    if (active) {
      e.preventDefault();
      let clientX;
      let clientY;
      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      currentX = clientX - initialX;
      currentY = clientY - initialY;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, dragItem);
    }
  };

  const setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  };

  return (
    <div id="container" className="container">
      <video controls width="200" height="300" id="imgId">
        <source src={VideoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default App;
