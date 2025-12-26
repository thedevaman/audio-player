import { Play, Plus, StepBack, StepForward, Volume2 } from "lucide-react";
import React from "react";
import WavesurferPlayer from '@wavesurfer/react'

const App = ()=>{

  return(
    <div className="bg-rose-50 h-screen flex items-center justify-center">
      <div className="w-4xl bg-gradient-to-r from-rose-500 via-orange-500 to-rose-600 rounded-xl">
        <div className="px-8 py-6 border-b border-b-white flex justify-between items-center">
          <h1 className="text-xl text-white font-semibold">The Song name</h1>
          <label className="text-white font-medium">10:04 / 15:20</label>
        </div>
        <div className="bg-white p-8">
          <WavesurferPlayer
                  height={100}
                  waveColor="black"
                  url="/sample.mp3"
                  // onReady={onReady}
                  // onPlay={() => setIsPlaying(true)}
                  // onPause={() => setIsPlaying(false)}
                />
        </div>
        <div className="px-8 py-6 border-t border-t-white flex justify-center items-center gap-8">
           <button className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <Plus />
           </button>
            <button className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <StepBack />
           </button>
            <button className="bg-white w-18 h-18 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <Play />
           </button>
            <button className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <StepForward />
           </button>
            <button className="bg-white w-12 h-12 shodow hover:scale-110 duration-300 active:scale-80 rounded-full flex items-center justify-center">
            <Volume2 />
           </button>
        </div>
      </div>
    </div>
  )

}

export default App