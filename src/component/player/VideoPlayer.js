import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {PlayArrowRounded, Pause, Stop } from '@material-ui/icons';

import UseVideoPlayer from "./hooks/useVideoPlayer";
import {getVideo} from "../../common/AppConfig";


function VideoPlayer(props){
  const {videoPath} = props;
  const classes = useStyles();
  const videoElement = useRef(null);
  const [duration, setDuration] = useState('00:00')
  const [isVideoPlay, setIsVideoPlay] = useState(false)
  const {
    playerState,
    togglePlay,
    toggleStop,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
  } = UseVideoPlayer(videoElement);

  const onloadVideo = () => {
    const minutes = String(Math.floor(videoElement.current.duration / 60));
    const seconds = String(Math.floor(videoElement.current.duration % 60));
    const duration = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
    setDuration(duration)
  };

  useEffect(() => {
    if (playerState.progress === 100){
      setIsVideoPlay(false)
    }else{
      setIsVideoPlay(playerState.isPlaying)
    }
  }, [playerState.progress]);

  return(
    <div className={classes.root}>
      <div className={classes.videoWrapper}>
        <video
          className={classes.video}
          src={getVideo(videoPath)}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          onLoadedMetadata={onloadVideo}
          muted={true}
          controls={false}
        />
        <div className={classes.controls}>
          <div className={classes.actions}>
            <button onClick={togglePlay}>
              {!isVideoPlay ? (
                <PlayArrowRounded className={classes.playIcon} />
              ):(
                <Pause className={classes.pauseIcon} />
              )}
            </button>
            <button onClick={toggleStop}>
              <Stop className={classes.playIcon} />
            </button>
          </div>
          <input
            className={classes.videoProgress}
            type="range"
            min={"0"}
            max={"100"}
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <label>{playerState.currentTime}</label>
          <label>{'/'}</label>
          <label>{duration}</label>
          <select
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  )

}


const useStyles = makeStyles(theme => ({
  root:{
    // backgroundColor: '#EEEEEE'
    display: "flex",
    justifyContent: "center",
  },
  videoWrapper: {
    // width: '100%',
    // position: 'relative',
    // display: 'flex',
    // justifyContent: 'center',
    // overflow: 'hidden',
    // borderRadius: '10px',

    // '&:hover': {
    //   backgroundColor: 'transparent',
    // },
  },
  controls:{
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  actions: {
    "& button": {
      background: "none",
      border: "none",
      outline: "none",
      cursor: "pointer",
    },
  },
  video:{
    width: '100%',
  },
  videoProgress:{
    width: '70%'
  },
  playIcon:{
  }


}));


export default VideoPlayer;