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
  let right = 0;
  let bottom = 0;
  let newValues;
  const objectWidth = 200;
  const objectHeight = 300;

  React.useEffect(() => {
    const container = document.querySelector("#container");
    const rect = container.getBoundingClientRect();
    right = rect.right;
    bottom = rect.bottom;
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
    // const dragItem = document.querySelector("#imgId");
    // setTranslate(newValues.x, newValues.y, dragItem);
  };

  const getCornerCoord = (xVal, yVal) => {
    let newX;
    let newY;
    if ((xVal >=0 && xVal <= right/2) && (yVal >=0 && yVal <= bottom/2)) {
      //quarter1
      newX = 0;
      newY = 0;
    } else if ((xVal >right/2 && xVal <= right) && (yVal >=0 && yVal <= bottom/2)) {
      //quarter2
      newX = right;
      newY = 0;
    } else if ((xVal >=0 && xVal <= right/2) && (yVal >bottom/2 && yVal <= bottom)) {
      //quarter3
      newX = 0;
      newY = bottom;
    } else if ((xVal >right/2 && xVal <= right) && (yVal >bottom/2 && yVal <= bottom)) {
      //quarter4
      newX = right;
      newY = bottom;
    }
    return {
      x: newX - initialX,
      y: newY - initialY
    }
  }

  const onDrag = (e) => {
    const dragItem = document.querySelector("#imgId");
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
      newValues = getCornerCoord(clientX, clientY);
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
