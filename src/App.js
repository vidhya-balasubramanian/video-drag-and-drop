/* eslint-disable react-hooks/exhaustive-deps */
import logo from "./logo.svg";

import React from "react";

import "./App.css";

const App = () => {
  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("width "+width);
  console.log("height "+height);

  React.useEffect(() => {
    const container = document.querySelector("#container");
    var rect = container.getBoundingClientRect();
    console.log(rect)
    container.addEventListener("touchstart", onDragStart, false);
    container.addEventListener("touchend", onDragEnd, false);
    container.addEventListener("touchmove", onDrag, false);

    container.addEventListener("mousedown", onDragStart, false);
    container.addEventListener("mouseup", onDragEnd, false);
    container.addEventListener("mousemove", onDrag, false);
  }, []);

  const onDragStart = (e) => {
    const dragItem = document.querySelector("#imgId");
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
    initialX = currentX;
    initialY = currentY;
    active = false;
  };

  const onDrag = (e) => {
    const dragItem = document.querySelector("#imgId");
    if (active) {
      e.preventDefault();
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, dragItem);
    }
  };

  const setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  };

  return (
    <div id="container" className="container" >
      <img src={logo} alt="" id="imgId" className="image" />
    </div>
  );
};

export default App;
