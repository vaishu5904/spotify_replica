import React, { useMemo, useState } from "react";
import { playlists, tracks } from "./data.js";
import { usePlayer } from "./PlayerContext.jsx";
import PlayerBar from "./components/PlayerBar.jsx";
import PlaylistCard from "./components/PlaylistCard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import TrackList from "./components/TrackList.jsx";
import Icon from "./components/Icon.jsx";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { currentTrack, isPlaying } = usePlayer();
  const normalizedQuery = query.trim().toLowerCase();

  const filteredTracks = useMemo(() => {
    let result = tracks;
    if (!normalizedQuery && selectedPlaylist) {
      result = tracks.filter((track) => selectedPlaylist.trackIds.includes(track.id));
    } else if (!normalizedQuery && activePage === "library") {
      result = tracks.slice(0, 5);
    }
    if (normalizedQuery) {
      result = tracks.filter((track) =>
        `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(normalizedQuery)
      );
    }
    return result;
  }, [activePage, normalizedQuery, selectedPlaylist]);

  const filteredPlaylists = useMemo(() => playlists.filter((playlist) =>
    `${playlist.title} ${playlist.description}`.toLowerCase().includes(normalizedQuery)
  ), [normalizedQuery]);

  const navigate = (page) => {
    setActivePage(page);
    setSelectedPlaylist(null);
    if (page === "search") document.querySelector(".search-input")?.focus();
  };

  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setActivePage("playlist");
    setQuery("");
  };

  const focusSearch = () => {
    setActivePage("search");
    setSelectedPlaylist(null);
  };

  const heading = selectedPlaylist && activePage === "playlist"
    ? selectedPlaylist.title
    : activePage === "library"
      ? "Your library"
      : normalizedQuery
        ? "Search results"
        : "Good afternoon";
  const showHomeCollections = activePage === "home" && !normalizedQuery && filter === "All";

  const renderPlaylistCards = (items) => items.map((playlist) => (
    <PlaylistCard
      key={playlist.id}
      playlist={playlist}
      isCurrent={Boolean(currentTrack && playlist.trackIds.includes(currentTrack.id) && isPlaying)}
      onSelect={openPlaylist}
    />
  ));

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={navigate} onSelectPlaylist={openPlaylist} />
      <main className="main-panel">
        <TopBar
          activePage={activePage}
          query={query}
          onQueryChange={setQuery}
          onSearchFocus={focusSearch}
        />
        <div className="content-scroll">
          <section className="welcome-section">
            <div className="welcome-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> YOUR DAILY SOUNDTRACK</span>
              <h1>{heading}<span>.</span></h1>
              <p>{selectedPlaylist && activePage === "playlist" ? selectedPlaylist.description : "Find the feeling. We’ll find the music."}</p>
            </div>
            {showHomeCollections && <div className="hero-art"><div className="hero-sun" /><div className="hero-disc"><span /></div><div className="hero-label">SOUND<br />GOOD</div></div>}
          </section>

          {showHomeCollections && (
            <>
              <div className="filter-row" aria-label="Filter music">
                {["All", "Music"].map((item) => (
                  <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>
                ))}
              </div>
              <section className="quick-grid" aria-label="Featured playlists">
                {renderPlaylistCards(playlists.slice(0, 4))}
              </section>
              <section className="collection-section">
                <div className="section-heading">
                  <div><h2>Made for your mood</h2><p>A little more of what feels like you.</p></div>
                  <button onClick={() => navigate("library")}>Show all <Icon name="chevron" size={16} /></button>
                </div>
                <div className="album-grid">{renderPlaylistCards(playlists)}</div>
              </section>
            </>
          )}

          {normalizedQuery && (
            <section className="collection-section">
              <div className="section-heading">
                <div><h2>Playlists</h2><p>Matching playlists</p></div>
              </div>
              {filteredPlaylists.length > 0
                ? <div className="album-grid">{renderPlaylistCards(filteredPlaylists)}</div>
                : <p className="empty-state">No playlists match your search.</p>}
            </section>
          )}

          <section className="tracks-section">
            <div className="section-heading track-section-heading">
              <div>
                <h2>{normalizedQuery ? "Songs" : selectedPlaylist && activePage === "playlist" ? "Playlist tracks" : activePage === "library" ? "Recently played" : "Made for you"}</h2>
                <p>{normalizedQuery ? `Matching “${query.trim()}”` : selectedPlaylist && activePage === "playlist" ? `${filteredTracks.length} tracks in this playlist` : "Pick up right where the good part starts."}</p>
              </div>
              <button onClick={() => navigate("library")}>Show all <Icon name="chevron" size={16} /></button>
            </div>
            <TrackList tracks={filteredTracks} />
          </section>
          <footer className="page-footer"><span>Music for the in-between moments.</span><span>Built with a little React and a lot of rhythm.</span></footer>
        </div>
      </main>
      <PlayerBar />
    </div>
  );
}
