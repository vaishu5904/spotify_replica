import React from "react";
import { playlists } from "../data.js";
import Cover from "./Cover.jsx";
import Icon from "./Icon.jsx";

const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "search", label: "Search", icon: "search" },
  { id: "library", label: "Your Library", icon: "library" },
];

export default function Sidebar({ activePage, onNavigate, onSelectPlaylist }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#" onClick={(event) => { event.preventDefault(); onNavigate("home"); }}>
        <span className="brand-mark"><span /><span /><span /><span /><span /></span>
        <span>spotify</span>
      </a>
      <nav className="primary-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.id} className={`nav-link${activePage === item.id ? " active" : ""}`} onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon} size={22} /><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="library-heading">
        <span className="muted-icon"><Icon name="library" size={21} /></span>
        <span>Your library</span>
        <button className="icon-button library-add" aria-label="Create playlist"><Icon name="plus" /></button>
      </div>
      <div className="library-filters"><button>Playlists</button><button>Artists</button></div>
      <div className="sidebar-playlists">
        {playlists.map((playlist) => (
          <button className="sidebar-playlist" key={playlist.id} onClick={() => onSelectPlaylist(playlist)}>
            <Cover color={playlist.color} className="sidebar-cover" />
            <span><strong>{playlist.title}</strong><small>Playlist · Spotify</small></span>
          </button>
        ))}
      </div>
      <div className="sidebar-bottom">
        <span className="green-dot" /> <span>Made for your moments</span>
      </div>
    </aside>
  );
}
