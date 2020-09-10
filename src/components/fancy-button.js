import React from "react"
import s from './fancy-button.module.css'
import { Link } from 'gatsby'
import Svg from './svg'
const FancyButton = (props) => {
  return (
    <Link to="/find-warehouse" className={s.btnwrap}>
      <button {...props} className={s.btn}>
        <span className={s.btntxt}>{props.text}</span>
      </button>
    </Link>
  )
}

const GoogleButton = () => {
  return (
    <Link to="/google-login">
    <button className={s.gbtn} href="" tabIndex="" type="button">
      <span className={s.gLogo}>
        <span className={s.icon}>
          <span className={s.iconContainer}>
            <Svg className={s.gimg} html={`<path xmlns="http://www.w3.org/2000/svg" d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z"/>`}/>
            {/* <Svg html={`<title id="title">Google Logo</title><desc id="desc">Google G Logo</desc><g><defs><path id="a" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path><path id="c" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path><path id="e" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path><path id="g" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path></defs><g fill="none" fill-rule="evenodd" transform="translate(3 3)"><mask id="b" fill="#fff"><use xlink:href="#a"></use></mask><path fill="#FBBC05" fill-rule="nonzero" mask="url(#b)" d="M-2.698 46.932V12.068L20.233 29.5z"></path><mask id="d" fill="#fff"><use xlink:href="#c"></use></mask><path fill="#EA4335" fill-rule="nonzero" mask="url(#d)" d="M-2.698 12.068L20.233 29.5l9.441-8.18 32.373-5.229V-2.682H-2.698z"></path><mask id="f" fill="#fff"><use xlink:href="#e"></use></mask><path fill="#34A853" fill-rule="nonzero" mask="url(#f)" d="M-2.698 46.932l40.465-30.841 10.656 1.341L62.047-2.682v64.364H-2.698z"></path><g><mask id="h" fill="#fff"><use xlink:href="#g"></use></mask><path fill="#4285F4" fill-rule="nonzero" mask="url(#h)" d="M62.047 61.682L20.233 29.5l-5.396-4.023 47.21-13.409z"></path></g></g></g>`}/> */}
            {/* <svg className={s.gimg} viewBox="0 0 64 64" width="24" height="24" role="img" aria-hidden="true" aria-labelledby="title desc"><title id="title">Google Logo</title><desc id="desc">Google G Logo</desc><g><defs><path id="a" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path><path id="c" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path><path id="e" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path><path id="g" d="M57.326 24.136H29.674v11.398h15.917c-1.484 7.241-7.689 11.398-15.917 11.398-9.711 0-17.534-7.777-17.534-17.432 0-9.655 7.823-17.432 17.534-17.432 4.182 0 7.959 1.475 10.926 3.889l8.633-8.582C43.973 2.815 37.228 0 29.674 0 13.22 0 0 13.14 0 29.5S13.219 59 29.674 59C44.512 59 58 48.273 58 29.5c0-1.743-.27-3.62-.674-5.364z"></path></defs><g fill="none" fillRule="evenodd" transform="translate(3 3)"><mask id="b" fill="#fff"><use></use></mask><path fill="#FBBC05" fillRule="nonzero" mask="url(#b)" d="M-2.698 46.932V12.068L20.233 29.5z"></path><mask id="d" fill="#fff"></mask><path fill="#EA4335" fillRule="nonzero" mask="url(#d)" d="M-2.698 12.068L20.233 29.5l9.441-8.18 32.373-5.229V-2.682H-2.698z"></path><mask id="f" fill="#fff"></mask><path fill="#34A853" fillRule="nonzero" mask="url(#f)" d="M-2.698 46.932l40.465-30.841 10.656 1.341L62.047-2.682v64.364H-2.698z"></path><g><mask id="h" fill="#fff"></mask><path fill="#4285F4" fillRule="nonzero" mask="url(#h)" d="M62.047 61.682L20.233 29.5l-5.396-4.023 47.21-13.409z"></path></g></g></g></svg> */}
          </span>
        </span>
      </span>
      Sign in with Google
    </button>
    </Link>
  )
}

const LoginButton = (props) => {
  return (
    <button {...props} className={`${s.bg} bg-blue-700 text-white`} href="" tabIndex="" type="button">
    <span className={`${s.gLogo}`}>
      </span>
      {props.text}
    </button>
  )
}


export { FancyButton, GoogleButton, LoginButton }