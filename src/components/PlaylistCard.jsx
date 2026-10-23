import React from "react";
import Cover from "./Cover.jsx";
import Icon from "./Icon.jsx";

export default function PlaylistCard({ playlist, onSelect, isCurrent }) {
  return (
    <button className="playlist-card" onClick={() => onSelect(playlist)} aria-label={`Open playlist ${playlist.title}`}>
      <Cover color={playlist.color} />
      <span className="playlist-card-copy"><strong>{playlist.title}</strong><small>{playlist.description}</small></span>
      <span className="card-play" aria-hidden="true">
        <Icon name={isCurrent ? "pause" : "play"} fill="currentColor" size={19} />
      </span>
    </button>
  );
}
