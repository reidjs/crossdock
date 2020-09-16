import React, { useState, useEffect, useCallback, useRef } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import WebcamCapture from '../components/webcam-capture';
import EditableInput from '../components/editable-input'
import Svg from '../components/svg'
import s from './warehouse-dashboard.module.css'
import { CSVLink, CSVDownload } from "react-csv";

const defaultRows = [
  ['Procter and Gamble', 'L\'Oreal', '7/1/2020', '100 cases'],
  ['', '', '7/15/2020', '50 cases'],
  ['', 'Head and Shoulders', '6/1/2020', '10 cases'],
  ['', 'Dove', '5/1/2020', '100 cases'],
  ['', '', '6/15/2020', '50 cases'],
  ['', '', '6/30/2020', '50 cases']
]

const BolTable = (props) => {
  const rows = props.rows
  const changeCell = props.changeCell
  const tableRows = rows.map((row, idx) => {
    if (props.editable) {
      return (
        <tr key={idx} className={s.editableRows}>
          <td><EditableInput style={1} text={row[0]} callback={(oldText, newText) => changeCell(0, idx, oldText, newText)} /></td>
          <td><EditableInput style={1} text={row[1]} callback={(oldText, newText) => changeCell(1, idx, oldText, newText)} /></td>
          <td><EditableInput style={1} text={row[2]} callback={(oldText, newText) => changeCell(2, idx, oldText, newText)} /></td>
          <td><EditableInput style={1} text={row[3]} callback={(oldText, newText) => changeCell(3, idx, oldText, newText)} /></td>
        </tr>
      )
    } else {
      return (
        <tr key={idx}>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          <td>{row[3]}</td>
        </tr>
      )
    }
  })
  return (
    <table className={`table-auto ${s.bolTable}`}>
      <thead>
        <tr>
          <th>Shipper</th>
          <th>Item</th>
          <th>Batch</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

const WarehouseDashboard = () => {
  const [step, setStep] = useState(0)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [mediaType, setMediaType] = useState(0)
  // const [rows, setRows] = useState(defaultRows)
  const [rows, setRows] = useState(defaultRows)

  const changeCell = (row, col, newText, oldText) => {
    // console.log('idx, newText, oldText', row, col, newText, oldText)
    const t = rows
    t[row][col] = newText
    setRows(t)
  }
  const handleFileUpload = e => {
    e.persist()
    const file = e.target.files[0]
    const blob = URL.createObjectURL(file)
    setUploadedImage(blob)
  }
  const useWebcamImage = image => {
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
  const prevStep = () => {
    changeStep(step - 1)
  }


  const changeStep = newStep => {
    setStep(newStep)
  }
  // const changeCell = (row, col, newText, oldText) => {
  //   console.log('idx, newText, oldText', row, col, newText, oldText)
  //   const t = rows
  //   t[row][col] = newText
  //   setRows(t)
  // }

  // const tableRows = rows.map((row, idx) => {
  //   return (
  //     <tr key={idx}>
  //       <td><EditableInput style={1} text={row[0] || '\t'} callback={(oldText, newText) => changeCell(0, idx, oldText, newText)} /></td>
  //       <td><EditableInput style={1} text={row[1]} callback={(oldText, newText) => changeCell(1, idx, oldText, newText)} /></td>
  //       <td><EditableInput style={1} text={row[2]} callback={(oldText, newText) => changeCell(2, idx, oldText, newText)} /></td>
  //       <td><EditableInput style={1} text={row[3]} callback={(oldText, newText) => changeCell(3, idx, oldText, newText)} /></td>
  //     </tr>
  //   )
  // })

  return (
    <Layout>
      <Seo title="Warehouse Dashboard" />
      <div className='flex flex-col items-center justify-center mx-auto my-10 w-full'>
        {/* <h1>Warehouse Dashboard</h1> */}
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full ${step !== 0 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl mb-8">1. Upload your GS1 Bill of Lading (BOL)</h2>
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
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full md:w-3/4 ${step !== 1 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl mb-8">2. Update Inventory</h2>
          <BolTable changeCell={changeCell} rows={rows} editable />
          <small>sample data for demonstration purposes</small>
          <div className="flex w-full flex-col-reverse md:flex-row mt-8">
            <button className={`bg-red-500`} onClick={prevStep}>Back</button>
            <button className={`bg-green-500`} onClick={nextStep}>Continue</button>
          </div>
        </div>
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full md:w-3/4 ${step !== 2 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl mb-8">3. Verify and Send Updated BOL</h2>
          <BolTable changeCell={changeCell} rows={rows}/>
          <h3 className="mb-4">Ensure this updated data is accurate.</h3>
          <div className="cursor-pointer">
            <CSVLink data={rows} filename={"gs1-bol-updated-inventory.csv"} target="_blank">
            <Svg className="w-32 h-32" html={`<path xmlns="http://www.w3.org/2000/svg" d="M336,176h40a40,40,0,0,1,40,40V424a40,40,0,0,1-40,40H136a40,40,0,0,1-40-40V216a40,40,0,0,1,40-40h40" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline xmlns="http://www.w3.org/2000/svg" points="176 272 256 352 336 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line xmlns="http://www.w3.org/2000/svg" x1="256" y1="48" x2="256" y2="336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`} />
            <p>Download as CSV</p>
            </CSVLink>
          </div>
          <div className="flex w-full flex-col-reverse md:flex-row mt-8">
            <button className={`bg-red-500`} onClick={prevStep}>Revise</button>
            <button className={`bg-green-500`} onClick={nextStep}>Done</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WarehouseDashboard