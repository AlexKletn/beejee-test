import React, { useContext, useEffect, useMemo, useState } from "react"

import { AppContext } from "@src/context/App.context.jsx"
import Button         from "@components/Button"

import style          from "../style/List.sort.scss"

import arrowIcon      from "@src/img/arrow.svg"

export default function ListSort() {
  const appCtx = useContext(AppContext)

  return (
    <div className={style['sort-area']}>
      <Button
        onClick={ () => appCtx.changeSort("username") }
        className={`${style['sort-field']} ${ appCtx.sort.by == 'username' ? style['active'] : '' }`}
        icon={appCtx.sort.by == "username" && {
          pos: "left", 
          component: (
            <img
              src={arrowIcon}
              height="10"
              className={style[`dir-${appCtx.sort.dir}`]}
            />
          )
        }}
      >
        Имя пользователя
        </Button>
      <Button
        onClick={ () => appCtx.changeSort("email") }
        className={`${style['sort-field']} ${ appCtx.sort.by == 'email' ? style['active'] : '' }`}
        icon={appCtx.sort.by == "email" && {
          pos: "left", 
          component: (
            <img
              src={arrowIcon}
              height="10"
              className={style[`dir-${appCtx.sort.dir}`]}
            />
          )
        }}
      >
        E-Mail
        </Button>
      <Button
        onClick={ () => appCtx.changeSort("status") }
        className={`${style['sort-field']} ${ appCtx.sort.by == 'status' ? style['active'] : '' }`}
        icon={appCtx.sort.by == "status" && {
          pos: "left", 
          component: (
            <img
              src={arrowIcon}
              height="10"
              className={style[`dir-${appCtx.sort.dir}`]}
            />
          )
        }}
      >
        Статус
        </Button>
    </div>
  )
}