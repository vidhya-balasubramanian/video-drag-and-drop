/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import VideoFile from "./video1.mp4";

import "./App.css";

const App = () => {
  let offset = [0, 0];
  let isDown = false;

  React.useEffect(() => {
    const divOverlay = document.getElementById("videoWrapper");
    divOverlay.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mouseup", onMouseUp, true);
    document.addEventListener("mousemove", onMouseMove, true);
  }, []);

  const onMouseDown = (e) => {
    isDown = true;
    const divOverlay = document.getElementById("videoWrapper");
    offset = [
      divOverlay.offsetLeft - e.clientX,
      divOverlay.offsetTop - e.clientY,
    ];
  };
  const onMouseUp = (e) => {
    isDown = false;
    const divOverlay = document.getElementById("videoWrapper");
    const xValue = e.clientX + offset[0];
    const yValue = e.clientY + offset[1];
    const newVal = getCornerCoord(xValue, yValue);
    divOverlay.style.left = newVal.x + "px";
    divOverlay.style.top = newVal.y + "px";
  };

  const onMouseMove = (e) => {
    if (isDown) {
      const divOverlay = document.getElementById("videoWrapper");
      const xValue = e.clientX + offset[0];
      const yValue = e.clientY + offset[1];
      divOverlay.style.left = xValue + "px";
      divOverlay.style.top = yValue + "px";
    }
  };

  const getCornerCoord = (xVal, yVal) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const imageWidth = 200;
    const imageHeight = 300;
    let newX;
    let newY;
    if (xVal <= width / 2 && yVal <= height / 3) {
      newX = 0;
      newY = 0;
    } else if (xVal > width / 2 && xVal <= width && yVal <= height / 3) {
      newX = width - imageWidth;
      newY = 0;
    } else if (xVal <= width / 2 && yVal > height / 3 && yVal <= height) {
      newX = 0;
      newY = height - imageHeight;
    } else if (
      xVal > width / 2 &&
      xVal <= width &&
      yVal > height / 3 &&
      yVal <= height
    ) {
      newX = width - imageWidth;
      newY = height - imageHeight;
    }
    return {
      x: newX,
      y: newY,
    };
  };

  return (
    <>
      <div id="videoWrapper">
        <video controls width="200" height="300">
          <source src={VideoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default App;
