# Spotify Replica

A responsive music player built with React. This project brings together playlist and track rendering, browser audio playback, search, and shared now-playing state.

## Features

- Responsive Spotify-inspired layout with navigation, playlist cards, track lists, and a persistent player bar
- Playlist and track data rendered from local mock data
- Select a playlist from a card or the sidebar to see the tracks in that playlist
- Search playlist names, track titles, artists, and albums
- Play and pause tracks, skip to the previous or next track, seek through playback, and adjust volume
- Automatically advance to the next track when the current track ends
- Shared playback state managed with React Context and the HTML5 Audio API

## Getting started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

### Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/
│   ├── Cover.jsx          # Reusable generated playlist and track artwork
│   ├── Icon.jsx           # Shared SVG icon component
│   ├── PlayButton.jsx     # Reusable play/pause button
│   ├── PlayerBar.jsx      # Persistent player controls and now-playing display
│   ├── PlaylistCard.jsx   # Playlist card presentation
│   ├── Sidebar.jsx        # Primary navigation and playlist navigation
│   ├── TopBar.jsx         # Search and top navigation
│   └── TrackList.jsx      # Track rows and track selection
├── App.jsx                # Page composition, search, and playlist selection
├── data.js                # Static playlist and track data
├── main.jsx               # React entry point and provider setup
├── PlayerContext.jsx      # Shared HTML5 audio and playback state
└── styles.css             # Responsive application styles
```

## How the project covers the curriculum

### Module 1 — Layout and navigation

The application shell uses CSS Grid for the sidebar, main content, and persistent player. Flexbox and responsive media queries adapt the layout for smaller screens.

### Module 2 — Playlists and track listing

`src/data.js` exports static playlist and track arrays. Components render these arrays with `.map()`. Selecting a playlist passes the chosen playlist through component props and filters its track IDs to display the associated songs.

### Module 3 — Audio player controls

`PlayerContext` holds a reference to the HTML `<audio>` element with `useRef`. It exposes playback, skip, seek, and volume actions; audio events update playback position and automatically advance tracks.

### Module 4 — Search and now-playing state

Search filters playlists and tracks as the query changes. `PlayerProvider` wraps the application so the current track and playback controls remain available across the interface, while `PlayerBar` stays visible as part of the application shell.

## Demo audio

Track metadata is local mock data. The audio URLs point to public SoundHelix demo MP3s, so playback requires an internet connection and availability of that external service. The browser may block playback until the user interacts with the page.

## Technology

- React 18
- Vite
- HTML5 Audio API
- CSS Grid, Flexbox, and media queries
