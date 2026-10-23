import React from "react";
import { usePlayer } from "../PlayerContext.jsx";
import Cover from "./Cover.jsx";
import Icon from "./Icon.jsx";
import PlayButton from "./PlayButton.jsx";

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function PlayerBar() {
  const { currentTrack, isPlaying, currentTime, duration, volume, error, togglePlayback, playAdjacent, seek, changeVolume } = usePlayer();
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="player-bar">
      <div className="now-playing">
        {currentTrack ? <Cover color={currentTrack.color} className="now-cover" /> : <div className="now-cover now-cover-empty"><span>♪</span></div>}
        <div className="now-copy">
          <strong>{currentTrack?.title || "Choose a track"}</strong>
          <small>{currentTrack?.artist || "Your soundtrack starts here"}</small>
        </div>
        <button className="icon-button like-button" aria-label="Like track"><Icon name="heart" size={18} /></button>
      </div>
      <div className="player-center">
        <div className="player-controls">
          <button className="icon-button control-subtle" aria-label="Shuffle"><Icon name="shuffle" size={18} /></button>
          <button className="icon-button control-subtle" aria-label="Previous track" onClick={() => playAdjacent(-1)}><Icon name="previous" size={19} fill="currentColor" /></button>
          <PlayButton playing={isPlaying} onClick={() => void togglePlayback()} label={isPlaying ? "Pause" : "Play"} large />
          <button className="icon-button control-subtle" aria-label="Next track" onClick={() => playAdjacent(1)}><Icon name="next" size={19} fill="currentColor" /></button>
          <button className="icon-button control-subtle" aria-label="Repeat"><Icon name="repeat" size={18} /></button>
        </div>
        <div className="progress-row">
          <span>{formatTime(currentTime)}</span>
          <input aria-label="Track progress" type="range" min="0" max={duration || 100} step="0.1" value={duration ? currentTime : 0} style={{ "--range-progress": `${progress}%` }} onChange={(event) => seek(Number(event.target.value))} />
          <span>{formatTime(duration)}</span>
        </div>
        {error && <span className="player-error" role="status">{error}</span>}
      </div>
      <div className="player-extra">
        <button className="icon-button control-subtle queue-button" aria-label="More options"><Icon name="more" /></button>
        <Icon name="volume" size={19} />
        <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} style={{ "--range-progress": `${volume * 100}%` }} onChange={(event) => changeVolume(event.target.value)} />
      </div>
    </footer>
  );
}
