import React, { useState, useEffect, useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
const WebcamCapture = ({ callback }) => {
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const webcamRef = React.useRef(null);
  const [imageSrc, setImage] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );
  const reset = () => {
    setImage(null)
  }
  const capture = React.useCallback(
    () => {
      if (imageSrc) setImage(null)
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
    },
    [webcamRef]
  );
  let done = false

  const finished = () => {
    done = true
    callback(imageSrc)
  }

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  function getWindowDimensions() {
    if (typeof window == 'undefined') return {}
    const { innerWidth: width, innerHeight: height } = window;
    // console.log('width, height', width, height)
    return {
      width,
      height
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cams = devices.map((device, idx) => {
    const widthCalc = ((100 / devices.length) - 10) + "%"
    const widthCalcPx = ((windowDimensions.width - 100) / devices.length) + "px"
    return (
      <div key={idx} className={`flex flex-col items-center my-0 mx-auto justify-center ${done ? 'hidden' : ''}`} style={{ width: widthCalc }}>
        <div>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            audio={false}
            width={widthCalcPx}
            videoConstraints={{ deviceId: device.deviceId }} />
          {/* {device.label || `Device ${key + 1}`} */}
          <img src={imageSrc} />
        </div>
        <button onClick={imageSrc ? reset : capture}>{!imageSrc ? 'Capture photo' : 'Retake Photo'}</button>
        <button className={`bg-green-500 ${imageSrc ? '' : 'hidden'}`} onClick={finished}>Use Picture</button>
      </div>
    )
  })

  return (
    <div>
      {cams}
    </div>
  )
}

export default WebcamCapture