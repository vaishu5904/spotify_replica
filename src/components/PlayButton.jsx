import React from "react";
import Icon from "./Icon.jsx";

export default function PlayButton({ playing, onClick, label, large = false }) {
  return (
    <button className={`play-button${large ? " play-button-large" : ""}`} onClick={onClick} aria-label={label}>
      <Icon name={playing ? "pause" : "play"} size={large ? 22 : 17} fill="currentColor" />
    </button>
  );
}
