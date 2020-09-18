import React, { useState, useEffect, useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import { BrowserBarcodeReader } from '@zxing/library'

const WebcamCapture = ({ callback }) => {
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const webcamRef = React.useRef(null);
  const [imageSrc, setImage] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [barcode, setBarcode] = useState(null)
  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );
  const reset = () => {
    setImage(null)
  }
  // const capture = React.useCallback(
  //   () => {
  //     if (imageSrc) setImage(null)
  //     const imageSrc = webcamRef.current.getScreenshot();

  //     setImage(imageSrc)
  //   },
  //   [webcamRef]
  // );
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
  const reader = new BrowserBarcodeReader()

  // reader
  //   .listVideoInputDevices()
  //   .then(videoInputDevices => {
  //     videoInputDevices.forEach(device =>
  //       console.log(`${device.label}, ${device.deviceId}`)
  //     );
  //     const firstDeviceId = videoInputDevices[0].deviceId;
  //     reader.decodeOnceFromVideoDevice(firstDeviceId, 'video').then(r => {
  //       console.log('r', r)
  //     }).catch(err => {
  //       console.log('err', err)
  //     })
  //   })
  //   .catch(err => console.error(err));
  const resetBarcode = () => {
    setBarcode(null)
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }


    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cams = devices.map((device, idx) => {
    // console.log('device', device)
    reader.decodeOnceFromVideoDevice(device.deviceId, 'video').then(r => {
      console.log('r', r)
      setBarcode(r.text)
    }).catch(err => {
      console.log('err', err)
    })
    const widthCalc = ((100 / devices.length) - 10) + "%"
    const widthCalcPx = ((windowDimensions.width) / 2) + "px"
    const heightCalcPx = "100px"
    // console.log('heightCalcPx', heightCalcPx)
    return (
      <div key={idx} className={`flex flex-col items-center my-0 mx-auto justify-center ${done ? 'hidden' : ''}`} style={{ width: widthCalc }}>
        <div className={imageSrc ? `hidden` : ''}>
          {/* <Webcam
            ref={webcamRef}
            id="cam"
            screenshotFormat="image/jpeg"
            audio={false}
            width={widthCalcPx}
            videoConstraints={{ deviceId: device.deviceId }} /> */}
          {/* {device.label || `Device ${key + 1}`} */}
          <video
            id="video"
            width={widthCalcPx}
            height={heightCalcPx}
            // style="border: 1px solid gray"
          ></video>
        </div>
          <p className={barcode ? '' : 'hidden'}>Barcode Result: <span className="font-bold">{barcode}</span></p>
          <button className={`bg-green-500 ${barcode ? '' : 'hidden'}`} onClick={finished}>Use {barcode}</button>
        {/* <button onClick={barcode ? finished : resetBarcode}>{barcode ? `Use ${barcode}` : 'Try Again'}</button> */}
        {/* <img className={imageSrc ? '' : 'hidden'} src={imageSrc} /> */}
        {/* <button onClick={imageSrc ? reset : capture}>{!imageSrc ? 'Capture photo' : 'Retake Photo'}</button> */}
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