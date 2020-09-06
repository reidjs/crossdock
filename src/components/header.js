import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import s from './header.module.css'

const FancyButton = ({ text }) => {
  return (
    <a className={s.btnwrap}>
      <button className={s.btn}>
        <span className={s.btntxt}>{text}</span>
      </button>
    </a>
  )
}

const Header = ({ siteTitle }) => (
  <header className={`${s.header} p-4 flex justify-between items-center`}>
    <div>
      <h1>
        <Link className={s.links} to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className="hidden sm:flex items-center">
      <ul className={`flex my-0 mr-24`}>
        <li className={`px-2`}><Link to="/">Why CrossDock</Link></li>
        <li className={`px-2`}><Link>Services</Link></li>
        <li className={`px-2`}><Link>Resources</Link></li>
      </ul>
      <div className={`${s.right} flex m-0`}>
        <ul className={`m-0`}>
          <Link className={`mr-2`} to="">Sign In</Link>
          <FancyButton text="Get Started" />
        </ul>
      </div>
    </div>
    <div className="sm:hidden block">
      {/* <a className={s.btnwrap}>
        <button className={s.btn}>
          <span className={s.btntxt}>Get Started</span></button>
      </a> */}
      <FancyButton text="Get Started" />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `CrossDock`,
}

export default Header
