import React from "react"
import ReactDOM from "react-dom"

import style from "./Alert.scss"

export default function Alert({type, children}) {
  return ReactDOM.createPortal((
    <div className={ style['alert'] }>
      { children }
    </div>
  ), document.body)
}