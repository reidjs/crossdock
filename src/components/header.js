import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import s from './header.module.css'
import { FancyButton } from '../components/fancy-button'
import Svg from '../components/svg'
import { StoreCtx } from '../store-ctx'


const Header = ({ siteTitle }) => (
  <StoreCtx.Consumer>
    {store => {
      const user = store.state.user
      return (
        <header className={`${s.header} p-4 flex justify-between items-center`}>
          <div>
            <h1>
              <Link className={s.links} to="/">
                {siteTitle}
              </Link>
            </h1>
          </div>
          <div className="hidden md:flex items-center">
            <ul className={`flex my-0 mr-24`}>
              <li className={`px-2`}><Link to="/">Why CrossDock</Link></li>
              <li className={`px-2`}><Link to="/">Services</Link></li>
              <li className={`px-2`}><Link to="/">Resources</Link></li>
            </ul>
            <div className={`${s.right} flex m-0`}>
              <ul className={`flex items-center m-0`}>
                <li><Svg className={`w-4 h-4 mr-8`} html={`<title>ionicons-v5-f</title><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/>`}></Svg></li>
                <li><Link className={`${user ? `hidden ` : ` `}mr-4`} to="/login">Sign In</Link></li>
              <li><Link className={`${user ? ` ` : `hidden `}mr-4`} to="/integrations">{user && user.email.split('@')[0]}</Link></li>
                <li><FancyButton text="Get Started" /></li>
              </ul>
            </div>
          </div>
          <div className="md:hidden block">
            {/* <a className={s.btnwrap}>
        <button className={s.btn}>
          <span className={s.btntxt}>Get Started</span></button>
      </a> */}
            <FancyButton text="Get Started" />
          </div>
        </header>
      )
    }
    }
  </StoreCtx.Consumer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `CrossDock`,
}

export default Header
