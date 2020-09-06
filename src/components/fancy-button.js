import React from "react"
import s from './fancy-button.module.css'
import { Link } from 'gatsby'

const FancyButton = ({ text }) => {
  return (
    <Link to="/integrations" className={s.btnwrap}>
      <button className={s.btn}>
        <span className={s.btntxt}>{text}</span>
      </button>
    </Link>
  )
}

export default FancyButton