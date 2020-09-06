import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import s from './header.module.css'

const Header = ({ siteTitle }) => (
  <header className="s.header flex">
    <div>
      <h1>
        <Link className={s.links} to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div>
      <Link to="">Sign In</Link>
      <button>Get Started</button>
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
