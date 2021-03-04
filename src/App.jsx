import React, {} from "react"

import { AppProvider, AppContext } from "@src/context/App.context.jsx"

import List from "@components/List"
import ToolBar from "@components/ToolBar"

import style from "./App.scss"

export default function() {
 
  return (
    <AppProvider>
      <div className={style.app}>
        <List />
        {/* <CreateTask /> */}

        <ToolBar />
      </div>
    </AppProvider>
  )
}