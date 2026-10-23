import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { tracks } from "./data.js";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.72);
  const [error, setError] = useState("");

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = async (track) => {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(0);
      audio.src = track.audio;
      audio.load();
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setError("Playback couldn’t start. Check your connection and try again.");
    }
  };

  const togglePlayback = async () => {
    if (!currentTrack) {
      await playTrack(tracks[0]);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setError("");
      } catch {
        setIsPlaying(false);
        setError("Playback couldn’t start. Check your connection and try again.");
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playAdjacent = (offset) => {
    const index = tracks.findIndex((track) => track.id === currentTrack?.id);
    const next = index < 0 ? tracks[0] : tracks[(index + offset + tracks.length) % tracks.length];
    void playTrack(next);
  };

  const seek = (time) => {
    if (audioRef.current && Number.isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (value) => {
    const nextVolume = Number(value);
    setVolume(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume;
  };

  const value = useMemo(() => ({
    currentTrack, isPlaying, currentTime, duration, volume, error,
    playTrack, togglePlayback, playAdjacent, seek, changeVolume,
  }), [currentTrack, isPlaying, currentTime, duration, volume, error]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onEnded={() => playAdjacent(1)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setError("This demo audio is unavailable right now. Try another track.")}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}
