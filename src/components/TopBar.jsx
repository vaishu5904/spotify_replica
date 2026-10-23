import React from "react";
import Icon from "./Icon.jsx";

export default function TopBar({ activePage, query, onQueryChange, onSearchFocus }) {
  return (
    <header className="topbar">
      <div className="history-controls">
        <button className="round-button" aria-label="Go back"><span>‹</span></button>
        <button className="round-button" aria-label="Go forward"><span>›</span></button>
      </div>
      <label className={`search-box${activePage === "search" ? " search-focused" : ""}`}>
        <Icon name="search" size={20} />
        <input className="search-input" type="search" placeholder="What do you want to play?" value={query} onFocus={onSearchFocus} onChange={(event) => onQueryChange(event.target.value)} />
        {query && <button className="search-clear" aria-label="Clear search" onClick={() => onQueryChange("")}>×</button>}
      </label>
      <button className="install-button">Explore Premium</button>
      <button className="profile-button"><span className="avatar">V</span><span>Listener</span><span className="profile-caret">⌄</span></button>
    </header>
  );
}
