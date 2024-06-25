import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({
  id,
  initialSeconds,
  isActive: initialIsActive,
  endTime,
  onDelete,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isPaused, setIsPaused] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setIsVibrating(true);
      setTimeout(() => {
        setIsVibrating(false);
        onDelete(id);
      }, 10000); // Attends 10 secondes avant de supprimer
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused, seconds, onDelete, id]);

  const toggle = () => {
    if (!isActive) {
      setIsActive(true);
    } else if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  const reset = () => {
    setSeconds(initialSeconds);
    setIsActive(false);
    setIsPaused(false);
    setIsVibrating(false);
  };

  const formatTime = (totalSeconds) => {
    if (totalSeconds < 60) {
      return `${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
    } else if (totalSeconds < 3600) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    } else {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  };

  return (
    <div
      className={`timer ${seconds <= 10 ? "timer-warning" : ""} ${
        isVibrating ? "timer-vibrate" : ""
      }`}
    >
      <div className="time">{formatTime(seconds)}</div>
      <div className="end-time">
        {endTime && `Fin à: ${endTime.toLocaleTimeString()}`}
      </div>
      <div className="buttons">
        <button className="fix" onClick={toggle}>
          {isActive ? (isPaused ? "⏸️" : "🟥") : "▶️"}
        </button>
        <button className="fix" onClick={reset}>
          Reset
        </button>
        <button className="fix" onClick={() => onDelete(id)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default Timer;
