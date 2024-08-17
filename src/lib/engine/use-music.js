import { useEffect, useState } from "react";

export default function useMusic(tracks) {
  const [track, setTrack] = useState(null);
  const [started,setStarted] = useState(false);
  const [ended,setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioM] = useState(null);
  const [volume,setVolume] = useState(1);
  
  useEffect(()=>{
    if(audio){
      audio.volume = volume
    }
  },[volume]);

  const setAudio = (audioSrc) => {
    if (!audioSrc) return;
    setEnded(false);
    setStarted(true);
    // Clean up the previous audio instance if it exists
    if (audio) {
      audio.pause();
      audio.remove();
    }

    const music = new Audio(audioSrc);
    music.volume = volume;
    music.play();
    setPlaying(true);
    setAudioM(music);
    setTrack(audioSrc);

    music.addEventListener('ended', () => {
      setEnded(false);
      setTrack(null);
      setAudioM(null);
    });

    return music;
  };

  useEffect(() => {
    if (track !== null) {
      setAudio(tracks[track]); 
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.remove();
        setPlaying(false);
      }
    };
  }, [track]);

  const randomTrack = () => {
    setAudioM(null);
    setAudio(tracks[Math.floor(Math.random() * tracks.length)]);
  };

  return {
    track,
    started,
    ended,
    playing,
    controls:{
      pause:()=>{
        audio?.pause();
        setPlaying(false);
      },
      play:()=>{
        audio?.play();
        setPlaying(true);
      },
      playTrack:(newTrack)=>{
        setAudioM(null);
        setAudio(newTrack);
      },
      randomTrack,
      setVolume
    }
  };
}
