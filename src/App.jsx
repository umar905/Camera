import React, { useEffect, useRef, useState } from "react"

function App() {
  const vdRef = useRef(null)
  const stream = useRef(null)
  const [select , setSelect ] = useState(false) 

  const startStream = () =>{
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    }).then((stream)=>{
      vdRef.current.srcObject = stream;
      vdRef.current.onloadedmetadata = () => vdRef.current.play() 
    }).catch((err)=>{
      alert(err)
    })
  } 
  const stopStr = ()=>{
    if(stream.current){
      stream.current.getTracks().map((el)=>{
        el.stop()
      })
    }
  }


  useEffect(()=>{
    stopStr()
    if(select) startStream()
  }, [select])
  return (
    <>
  <div className="wrapper">
    <video
    style={{display : select ? 'block' : 'none'}} 
      muted
      autoPlay
      playsInline 
      ref={vdRef}
    ></video>
    <div className="control">
      <button onClick={() => setSelect(!select)}>
        {select ? 'off': 'on'}
      </button>
    </div>
  </div>
    </>
  )
}

export default App
