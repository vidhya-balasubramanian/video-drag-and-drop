/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import VideoFile from "./video1.mp4";

import "./App.css";

const App = () => {
  let offset = [0, 0];
  let isDown = false;
  let isDropped = false;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const imageWidth = 200;
  const imageHeight = 300;

  React.useEffect(() => {
    const wrapperElem = document.getElementById("videoWrapper");
    wrapperElem.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mouseup", onMouseUp, true);
    document.addEventListener("mousemove", onMouseMove, true);
  }, []);

  const onMouseDown = (e) => {
    isDown = true;
    const wrapperElem = document.getElementById("videoWrapper");
    offset = [
      wrapperElem.offsetLeft - e.clientX,
      wrapperElem.offsetTop - e.clientY,
    ];
  };
  const onMouseUp = (e) => {
    isDown = false;
    const wrapperElem = document.getElementById("videoWrapper");
    const xValue = e.clientX + offset[0];
    const yValue = e.clientY + offset[1];
    const newVal = getCornerCoord(xValue, yValue);
    const previousLeft = wrapperElem.style.left.replace('px', '');
    const previousTop = wrapperElem.style.top.replace('px', '');
    if ((Number(previousLeft) === newVal.x) && (Number(previousTop) === newVal.y)) {
      return;
    } else {
      wrapperElem.style.left = newVal.x + "px";
      wrapperElem.style.top = newVal.y + "px";
      isDropped = true;
    }
  };

  const onMouseMove = (e) => {
    if (isDown) {
      const wrapperElem = document.getElementById("videoWrapper");
      const xValue = e.clientX + offset[0];
      const yValue = e.clientY + offset[1];
      wrapperElem.style.left = xValue + "px";
      wrapperElem.style.top = yValue + "px";
    }
  };

  const getCornerCoord = (xVal, yVal) => {
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
      <div
        id="videoWrapper"
        className="video-wrapper"
        style={{
          left: 0,
          top: height - imageHeight,
          width: imageWidth,
          height: imageHeight,
        }}
        onClick={() => {
          // const wrapperElem = document.getElementById("video");
          // wrapperElem.play();
        }}
      >
        <video
          controls
          width="200"
          height="300"
          id="video"
          onClick={(e) => {
            if (isDropped) {
              e.preventDefault();
              e.target.pause();
              isDropped = false;
            }
          }}
        >
          <source src={VideoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default App;
