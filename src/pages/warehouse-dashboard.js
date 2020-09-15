import React, { useState, useEffect, useCallback, useRef } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import WebcamCapture from '../components/webcam-capture';

// import BarcodeReader from 'react-barcode-reader'
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
// const WebcamCapture = ({ callback }) => {
//   const [deviceId, setDeviceId] = React.useState({});
//   const [devices, setDevices] = React.useState([]);
//   const webcamRef = React.useRef(null);
//   const [imageSrc, setImage] = useState(null)
//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//   const handleDevices = React.useCallback(
//     mediaDevices =>
//       setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
//     [setDevices]
//   );
//   const reset = () => {
//     setImage(null)
//   }
//   const capture = React.useCallback(
//     () => {
//       if (imageSrc) setImage(null)
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImage(imageSrc)
//     },
//     [webcamRef]
//   );
//   let done = false

//   const finished = () => {
//     done = true
//     callback(imageSrc)
//   }

//   React.useEffect(
//     () => {
//       navigator.mediaDevices.enumerateDevices().then(handleDevices);
//     },
//     [handleDevices]
//   );

//   function getWindowDimensions() {
//     if (typeof window == 'undefined') return {}
//     const { innerWidth: width, innerHeight: height } = window;
//     // console.log('width, height', width, height)
//     return {
//       width,
//       height
//     };
//   }

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const cams = devices.map((device, idx) => {
//     const widthCalc = ((100 / devices.length) - 10) + "%"
//     const widthCalcPx = ((windowDimensions.width - 100) / devices.length) + "px"
//     return (
//       <div key={idx} className={`flex flex-col items-center my-0 mx-auto justify-center ${done ? 'hidden' : ''}`} style={{ width: widthCalc }}>
//         <div>
//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             audio={false}
//             width={widthCalcPx}
//             videoConstraints={{ deviceId: device.deviceId }} />
//           {/* {device.label || `Device ${key + 1}`} */}
//           <img src={imageSrc} />
//         </div>
//         <button onClick={imageSrc ? reset : capture}>{!imageSrc ? 'Capture photo' : 'Retake Photo'}</button>
//         <button className={`bg-green-500 ${imageSrc ? '' : 'hidden'}`} onClick={finished}>Use Picture</button>
//       </div>
//     )
//   })

//   return (
//     <div>
//       {cams}
//     </div>
//   )
// }

const WarehouseDashboard = () => {
  const [step, setStep] = useState(0)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [mediaType, setMediaType] = useState(0)
  // const [barcode, setBarcode] = useState('no result')
  // const [webcam, useWebcam] = useState(true)
  // const handleError = (err) => {
  //   console.log('err', err)
  // }
  // const handleScan = scan => {
  //   console.log('scan', scan)
  //   setBarcode(scan)
  // }
  const handleFileUpload = e => {
    e.persist()
    // window.foo = e.target.files
    const file = e.target.files[0]
    const blob = URL.createObjectURL(file)
    setUploadedImage(blob)
    // console.log('e', e.files, e.target.files)
  }
  const useWebcamImage = image => {
    // console.log('image', image)
    setUploadedImage(image)
    nextStep()
  }

  const useFileUpload = () => {
    setMediaType(1)
  }
  const turnOnWebcam = () => {
    setMediaType(2)
  }

  const nextStep = () => {
    changeStep(step + 1)
  }

  const changeStep = newStep => {
    setStep(newStep)
  }

  return (
    <Layout>
      <Seo title="Warehouse Dashboard" />
      <div className='flex flex-col items-center justify-center mx-auto my-10 w-full'>
        <h1>Warehouse Dashboard</h1>
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full ${step !== 0 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl">1. Upload your GS1 Bill of Lading (BOL)</h2>
          <ul>
            <li className="mb-8">
              <button onClick={useFileUpload}>Upload</button>
              <div className={mediaType === 1 ? '' : 'hidden'}>
                <input onChange={handleFileUpload} type="file" accept="image/*" capture="camera" />
                <img src={uploadedImage} />
                <button className={`bg-green-500 ${uploadedImage ? '' : 'hidden'}`} onClick={nextStep}>Use Uploaded Picture</button>
              </div>
            </li>
            {/* <h2>Scan the BOL Using your Webcam or Phone Camera</h2> */}
            <li className="mb-8">
              <button onClick={turnOnWebcam}>Scan using your Phone or Webcam</button>
              <small>Only works in Safari on iPhones</small>
              {mediaType === 2 && <WebcamCapture callback={useWebcamImage} />}
            </li>
            <li className="mb-8"><button className={"bg-red-500"} onClick={nextStep}>Input BOL Manually</button ></li>

          </ul>
        </div>
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full ${step !== 1 ? 'hidden ' : ''}`}>
          TODO: next step
        </div>
      </div>
    </Layout>
  )
}

export default WarehouseDashboard