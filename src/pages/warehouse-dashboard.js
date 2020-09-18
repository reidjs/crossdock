import React, { useState, useContext, useEffect, useCallback, useRef } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import WebcamCapture from '../components/webcam-capture';
import EditableInput from '../components/editable-input'
import Svg from '../components/svg'
import s from './warehouse-dashboard.module.css'
import { CSVLink, CSVDownload } from "react-csv";
import gs1logo from '../images/gs1logo.png'
import { StoreCtx, DispatchCtx } from '../store-ctx'

const BolTable = ({ editable, useOrig }) => {
  // const rows = props.rows || defaultRows
  // console.log('rows', rows)
  // const changeCell = props.changeCell
  const store = useContext(StoreCtx) || { bol: [], bolOrig: [] }
  // const [rows, setRows] = useState(store.bol)
  const dispatch = useContext(DispatchCtx)
  const changeCell = (row, col, newText, oldText) => {
    // console.log('store.bol', store.bol)
    if (!store || !store.bol) return
    // console.log('editable', editable)
    // console.log('idx, newText, oldText', row, col, newText, oldText)
    const t = []
    for (let i = 0; i < store.bol.length; i++) {
      t.push(store.bol[i].slice(0))
    }
    t[row][col] = newText
    // console.log('t', t)
    // setRows(t)
    dispatch({ type: 'UPDATE_BOL', bol: t })
  }
  // const that = this
  // callback={(newText, oldText) => changeCell(idx, idx2, newText, oldText)} 
  const bol = useOrig ? store.bolOrig : store.bol
  const tableRows = bol.map((row, idx) => {
    const cells = row.map((r, idx2) => {
      const key = '' + idx + idx2
      return (
        <td key={key}>
          {/* Something is triggering the saveText callback in editableInput over and over again causing glitchy reactivity */}
          <EditableInput style={1} text={r} callback={(newText, oldText) => changeCell(idx, idx2, newText, oldText)} />
          <span className={editable ? 'hidden' : 'block'}>{r}</span>
        </td>
      )
    })
    return (
      <tr key={idx} className={s.editableRows}>
        {cells}
      </tr>
    )
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
  const store = useContext(StoreCtx)

  const rows = [[]]

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

  return (
    <Layout>
      <Seo title="Warehouse Dashboard" />
      <div className='flex flex-col items-center justify-center mx-auto my-10 w-full'>
        {/* <h1>Warehouse Dashboard</h1> */}
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full ${step !== 0 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl mb-8">1. Upload the Bill of Lading (BOL)</h2>
          <ul>

            {/* <h2>Scan the BOL Using your Webcam or Phone Camera</h2> */}
            <li className="mb-8">
              <div className="hidden md:flex cursor-pointer" onClick={turnOnWebcam}>
                <img src={gs1logo} className="w-32 rounded-l-full nice-border border-r-0" />
                <button className="bg-orange-600" >Scan the GS1 BOL Barcode</button>
              </div>
              {mediaType === 2 && <WebcamCapture callback={useWebcamImage} />}
            </li>
            <li className="mb-8 hidden md:block">
              <button onClick={useFileUpload}>Upload</button>
              <div className={mediaType === 1 ? '' : 'hidden'}>
                <input onChange={handleFileUpload} type="file" accept="image/*" capture="camera" />
                <img src={uploadedImage} />
                <button className={`bg-green-500 ${uploadedImage ? '' : 'hidden'}`} onClick={nextStep}>Use Uploaded Picture</button>
              </div>
            </li>
            <li className="block md:hidden mb-8">
              <button className="bg-orange-600 rounded-lg flex flex-col items-center" onClick={useFileUpload}>
                <img src={gs1logo} className="w-32" />
                Scan the GS1 BOL Barcode
                </button>
              <div className={mediaType === 1 ? '' : 'hidden'}>
                <input onChange={handleFileUpload} type="file" accept="image/*" capture="camera" />
                <img src={uploadedImage} />
                <button className={`bg-green-500 ${uploadedImage ? '' : 'hidden'}`} onClick={nextStep}>Use Uploaded Picture</button>
              </div>
            </li>

            <li className="mb-8"><button className={"bg-red-500"} onClick={nextStep}>Input BOL Manually</button ></li>

          </ul>
        </div>
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full md:w-3/4 ${step !== 1 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl">2. Result from Scan</h2>
          <small className="mb-8">sample data for demonstration purposes</small>
          <BolTable useOrig={true} />
          <div className="flex w-full flex-col-reverse md:flex-row mt-8">
            <button className={`bg-red-500`} onClick={prevStep}>Back</button>
            <button className={`bg-green-500`} onClick={nextStep}>Continue</button>
          </div>
        </div>
        <div className={`flex flex-col items-center justify-center mx-auto my-10 w-full md:w-3/4 ${step !== 2 ? 'hidden ' : ''}`}>
          <h2 className="font-bold text-2xl mb-8">3. Update and Send Updated BOL</h2>
          <BolTable />
          <h3 className="mb-4">Ensure this updated data is accurate.</h3>
          <div className="cursor-pointer">
            {/* TODO: add data prop */}
            <CSVLink data={store && store.bol} filename={"gs1-bol-updated-inventory.csv"} target="_blank">
              <Svg className="w-32 h-32" html={`<path xmlns="http://www.w3.org/2000/svg" d="M336,176h40a40,40,0,0,1,40,40V424a40,40,0,0,1-40,40H136a40,40,0,0,1-40-40V216a40,40,0,0,1,40-40h40" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline xmlns="http://www.w3.org/2000/svg" points="176 272 256 352 336 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line xmlns="http://www.w3.org/2000/svg" x1="256" y1="48" x2="256" y2="336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`} />
              <p>Download as CSV</p>
            </CSVLink>
          </div>
          <div className="flex w-full flex-col-reverse md:flex-row mt-8">
            <button className={`bg-red-500`} onClick={prevStep}>Revise</button>
            {/* <button className={`bg-green-500`} onClick={nextStep}>Done</button> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WarehouseDashboard