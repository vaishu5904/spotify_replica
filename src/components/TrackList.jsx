import React from "react";
import { usePlayer } from "../PlayerContext.jsx";
import Cover from "./Cover.jsx";
import Icon from "./Icon.jsx";

export default function TrackList({ tracks }) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  return (
    <div className="track-list">
      <div className="track-head"><span>#</span><span>Title</span><span>Album</span><span><Icon name="clock" size={17} /></span></div>
      {tracks.map((track, index) => {
        const active = currentTrack?.id === track.id;
        return (
          <div className={`track-row${active ? " track-active" : ""}`} key={track.id}>
            <button className="track-number" onClick={() => void playTrack(track)} aria-label={`Play ${track.title}`}>
              {active && isPlaying ? <span className="equalizer"><i /><i /><i /></span> : <><span className="row-index">{index + 1}</span><span className="row-play"><Icon name="play" fill="currentColor" size={15} /></span></>}
            </button>
            <div className="track-title">
              <Cover color={track.color} className="track-cover" />
              <span><strong>{track.title}</strong><small>{track.artist}</small></span>
            </div>
            <span className="track-album">{track.album}</span>
            <span className="track-duration">{track.duration}</span>
          </div>
        );
      })}
      {tracks.length === 0 && <p className="empty-state">No tracks match your search. Try another title or artist.</p>}
    </div>
  );
}
