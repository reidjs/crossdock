import React, { useState, useEffect, useRef } from 'react'
import Svg from '../components/svg'

const EditableInput = (props) => {
  const [isEditing, setEditing] = useState(false)
  const [newText, changeText] = useState(props.text)
  const [changed, setChanged] = useState(false)
  // let changed = false
  const saveText = (e) => {
    const oldText = newText
    const t = e.target.value
    // console.log('t', t)
    if (t === newText || t === props.text) {
      // no-op
      setEditing(false)
      return
    }
    changeText(t)
    setEditing(false)
    props.callback && props.callback(t, oldText)
    setChanged(true)
  }
  const inputRef = useRef(null)
  const focusInput = (e) => {
    setEditing(true)
  }
  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
    }
  }
  useEffect(() => {
    inputRef.current.focus()
  }, [isEditing])

  return (
    <span className={`cursor-text text-xl inline-block ${props.style ? 'hover:bg-blue-400' : ''}`}>
      <div className={`${isEditing && 'hidden '} flex flex-col`}>
        <small className={`font-bold ${!changed && `hidden`}`}>{props.title}</small>
        <div className={``}  onClick={focusInput}>
          <span className={`pr-3`}  >{changed ? newText : props.text}</span>
          <Svg className={`cursor-pointer w-4 h-4 inline-block ${props.style ? 'hidden' : ''}`} html={`<path xmlns="http://www.w3.org/2000/svg" d="M384,224V408a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V168a40,40,0,0,1,40-40H271.48" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/> <path xmlns="http://www.w3.org/2000/svg" d="M459.94,53.25a16.06,16.06,0,0,0-23.22-.56L424.35,65a8,8,0,0,0,0,11.31l11.34,11.32a8,8,0,0,0,11.34,0l12.06-12C465.19,69.54,465.76,59.62,459.94,53.25Z"/> <path xmlns="http://www.w3.org/2000/svg" d="M399.34,90,218.82,270.2a9,9,0,0,0-2.31,3.93L208.16,299a3.91,3.91,0,0,0,4.86,4.86l24.85-8.35a9,9,0,0,0,3.93-2.31L422,112.66A9,9,0,0,0,422,100L412.05,90A9,9,0,0,0,399.34,90Z"/>`}/>
        </div>
      </div>
      <input onKeyDown={handleOnKeyDown} ref={inputRef} onBlur={saveText} tabIndex={1} className={`${!isEditing && 'hidden '} p-2 nice-border`} placeholder={changed ? newText : props.text} type="text"></input>
    </span>
  )
}

export default EditableInput