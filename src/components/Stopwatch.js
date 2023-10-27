import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasPresetTime, setHasPresetTime] = useState(false);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${paddedMinutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) =>
          hasPresetTime && prevTime > 0 ? prevTime - 1 : prevTime + 1
        );
      }, 1000);

      if (hasPresetTime && time === 0) {
        clearInterval(intervalId);
        setIsActive(false);
      }
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive, time, hasPresetTime]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTime(0);
    setHasPresetTime(false);
  };

  const setTimer = (minutes) => {
    setIsActive(false);
    setTime(minutes * 60);
    setHasPresetTime(true);
  };

  return (
    <div className="watch-wrapper">
      <h1>고려대학교 문과대학 디지털인문학입문 II 05, 06분반 중간고사</h1>
      <img
        src="https://www.korea.ac.kr/mbshome/mbs/university/images/img/img_1_4_3_1_01.svg"
        height={200} alt="korea"
      />
      <div className="time-wrapper">
        <p>{formatTime(time)}</p>
      </div>

      <div className="button-wrapper">
        <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
        </div>
        <div className="button-wrapper">
            <button onClick={() => setTimer(10)}>10 Min</button>
            <button onClick={() => setTimer(30)}>30 Min</button>
            <button onClick={() => setTimer(60)}>60 Min</button>
        </div>
    </div>
  );
};

export default Stopwatch;
