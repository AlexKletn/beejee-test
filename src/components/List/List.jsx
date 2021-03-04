import React, { useContext, useMemo } from "react"

import { AppContext } from "@src/context/App.context.jsx"
import Button from "@components/Button"

import Element from "./particles/List.element.jsx"
import Pagination from "./particles/List.pagination.jsx"
import Sort from "./particles/List.sort.jsx"

import style from "./style/List.scss"

export default function List(){
  const appCtx = useContext(AppContext)
  
  return (
    <div className={style['list']}>
      <Sort />

      {
        appCtx.tasks.map((task) => (
          <Element 
            key={ task.id }
            id={ task.id }
            username={ task.username }
            email={ task.email }
            text={ task.text }
            status={ task.status }
          />
        ))
      }

      <Pagination />
    </div>
  )
}