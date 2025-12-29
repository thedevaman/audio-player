import { Pause, Play, Plus, StepBack, StepForward, Volume2, VolumeOff } from "lucide-react";
import React, { use, useRef, useState } from "react";
import WavesurferPlayer from '@wavesurfer/react'

const App = ()=>{

  const audio = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration,setDuration] = useState(0)
  const [currentTime,setCurrentTime] = useState(0)
  const [url,setUrl] = useState('/sample.mp3')
  const [fileName,setFileName] = useState(url.split('/').pop())
  const [muted,setMuted] = useState(false)

  const onReady = (ws)=>{
    audio.current = ws
    const duration = ws.getDuration()
    setDuration(duration)
    ws.on('audioprocess',(time)=>{
     setCurrentTime(time)
    })
  }

  const formatDuration = (second)=>{
    const h = Math.floor(second/3600).toString().padStart(2,"0")
    const m = Math.floor((second % 3600)/60).toString().padStart(2,"0")
    const s = Math.floor(second % 60).toString().padStart(2,"0")
    return `${h}:${m}:${s}`
  }

  const playPause = ()=>{

    if(!audio.current)
      return

    const player = audio.current
    player.playPause()

  }

  const chooseSong = () =>{

  const input = document.createElement('input')
  input.type = "file"
  input.accept = "audio/*"
  input.click()
  input.onchange = ()=>{
    const file = input.files[0]
    const newSongurl = URL.createObjectURL(file)
    setUrl(newSongurl)
    setFileName(file.name)
  }

  }

  const handleMute = ()=>{
    if(audio.current)
    {
      const player = audio.current
      const isMuted = player.getMuted()
      player.setMuted(!isMuted)
      setMuted(!muted)

    }

  }

  const seek = (time)=>{
    if(audio.current)
    {
      const player = audio.current
     let currentPlayertime =  player.getCurrentTime() + time
     const duration = player.getDuration()
     
     if(currentPlayertime < 0)
      currentPlayertime = 0

     if(currentPlayertime > duration)
      currentPlayertime = duration

    player.seekTo(currentPlayertime / duration)

    //  console.log(currentPlayertime)
    //  console.log(currentPlayertime / duration)
    
    setCurrentTime(currentPlayertime)
    }

  }

  return(
    <div className="bg-rose-50 h-screen flex items-center justify-center">
      <div className="w-4xl bg-gradient-to-r from-rose-500 via-orange-500 to-rose-600 rounded-xl">
        <div className="px-8 py-6 border-b border-b-white flex justify-between items-center">
          <h1 className="text-xl text-white font-semibold capitalize">
            <marquee>
              {fileName}
            </marquee>
          </h1>
          <label className="text-white font-medium">{formatDuration(currentTime)} / {formatDuration(duration)}</label>
        </div>
        <div className="bg-white p-8">
          <WavesurferPlayer
                  height={100}
                  waveColor="black"
                  url={url}
                  onReady={onReady}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
        </div>
        <div className="px-8 py-6 border-t border-t-white flex justify-center items-center gap-8">
           <button onClick={chooseSong} className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <Plus />
           </button>
            <button onClick={()=>seek(-10)} className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <StepBack />
           </button>
            <button onClick={playPause} className="bg-white w-18 h-18 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
          {
            isPlaying ?
            <Pause/>
            :
            <Play />
          }
          
           
           </button>
            <button onClick={()=>seek(10)} className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <StepForward />
           </button>
            <button onClick={handleMute} className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            {
              muted ?
              <VolumeOff />
              :
              <Volume2 />
            }
           
           </button>
        </div>
      </div>
    </div>
  )

}

export default App