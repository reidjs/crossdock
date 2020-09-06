import React from "react"
import s from './fancy-button.module.css'

const FancyButton = ({ text }) => {
  return (
    <a className={s.btnwrap}>
      <button className={s.btn}>
        <span className={s.btntxt}>{text}</span>
      </button>
    </a>
  )
}

export default FancyButton