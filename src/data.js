const audio = (number) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${number}.mp3`;

export const tracks = [
  { id: 1, title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:03", color: "violet", audio: audio(1) },
  { id: 2, title: "Sunset Lover", artist: "Petit Biscuit", album: "Presence", duration: "3:57", color: "orange", audio: audio(2) },
  { id: 3, title: "Tadow", artist: "Masego, FKJ", album: "Lady Lady", duration: "5:02", color: "blue", audio: audio(3) },
  { id: 4, title: "Intro", artist: "The xx", album: "xx", duration: "2:07", color: "mono", audio: audio(4) },
  { id: 5, title: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", duration: "3:36", color: "pink", audio: audio(5) },
  { id: 6, title: "A Walk", artist: "Tycho", album: "Dive", duration: "5:16", color: "teal", audio: audio(6) },
  { id: 7, title: "Feels Like We Only Go Backwards", artist: "Tame Impala", album: "Lonerism", duration: "3:12", color: "yellow", audio: audio(7) },
  { id: 8, title: "Open Eye Signal", artist: "Jon Hopkins", album: "Immunity", duration: "7:48", color: "blue", audio: audio(8) },
];

export const playlists = [
  { id: "daily", title: "Daily Mix 1", description: "M83, Tame Impala, and more", color: "violet", trackIds: [1, 5, 7] },
  { id: "focus", title: "Deep Focus", description: "Keep calm and focus with ambient music.", color: "blue", trackIds: [6, 8, 4] },
  { id: "indie", title: "Indie discoveries", description: "A little bit of everything, all at once.", color: "orange", trackIds: [2, 3, 5] },
  { id: "late", title: "Late night vibes", description: "Songs for the quiet hours.", color: "pink", trackIds: [4, 1, 6] },
  { id: "chill", title: "Chill hits", description: "Chill out and enjoy the moment.", color: "teal", trackIds: [2, 6, 3] },
  { id: "repeat", title: "On repeat", description: "The tracks you keep coming back to.", color: "yellow", trackIds: [5, 7, 1] },
];
