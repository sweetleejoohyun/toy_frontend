import { useState, useEffect } from "react";


const UseVideoPlayer = (videoElement, fps, setObjectArr) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    currentTime: '00:00',
    frameNo: 0,
  });

  useEffect(() => {
    playerState.isPlaying ?
      videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const toggleStop = () => {
    setObjectArr([])
    videoElement.current.currentTime = 0
    setPlayerState({
      ...playerState,
      isPlaying: false,
      progress: 0,
    });
  };

  const handleOnTimeUpdate = () => {
    const progress = ( videoElement.current.currentTime / videoElement.current.duration ) * 100;
    const minutes = String(Math.floor(videoElement.current.currentTime / 60));
    const seconds = String(Math.floor(videoElement.current.currentTime % 60));
    const currentTime = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
    const frameNo = Math.round(videoElement.current.currentTime * fps)-1;

    if (progress === 100){
      playerState.isPlaying = false
    }
    setPlayerState({
      ...playerState,
      progress: progress,
      currentTime: currentTime,
      frameNo: frameNo
    })
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
      isPlaying: playerState.isPlaying,
    });
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed: speed,
    });
  };

  return {
    playerState,
    togglePlay,
    toggleStop,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
  }
}

export default UseVideoPlayer;