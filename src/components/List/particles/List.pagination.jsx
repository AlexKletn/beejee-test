import React, { useContext, useEffect, useMemo, useState } from "react"

import { AppContext } from "@src/context/App.context.jsx"
import Button         from "@components/Button"

import style          from "../style/List.pagination.scss"

export default function ListPagination() {
  const appCtx = useContext(AppContext)
  const pages = useMemo(() => Math.ceil(appCtx.total / appCtx.quantityPerPage), [appCtx.total, appCtx.quantityPerPage])
  const [wait, setWait] = useState(false);

  useEffect(()=>{
    setWait(false);
  }, [appCtx.tasks])

  function pagination() {
    let pageBtns = [];

    for(let i = 1; i <= pages; i++) {
      pageBtns.push(
        <Button 
          key={i}
          circle
          className={ `${ style['page-btn'] } ${ appCtx.page == i ? style['active'] : ''}` }
          onClick={ () => goToPage(i) }
        >
          { i }
        </Button>
      )
    }

    return pageBtns
  }

  function goToPage(page) {
    if(!wait && appCtx.page != page) {
      appCtx.changePage(page);

      setWait(true);
    }
  }

  function nextPage() {
    if(!wait && appCtx.page < pages) { 
      appCtx.changePage(appCtx.page + 1)
    
      setWait(true);
    }
  }
  function prewPage() {
    if(!wait && appCtx.page > 1) { 
      appCtx.changePage(appCtx.page - 1)
    
      setWait(true);
    }
  }

  return (
    <div className={ style['pagination'] }>
      <button 
        className={ `${style['prew']} ${ appCtx.page <= 1 ? style['disable'] : ''}` }
        onClick={ prewPage }
      />
      { pagination() }
      <button 
        className={ `${style['next']} ${  appCtx.page >= pages ? style['disable'] : '' }` }
        onClick={ nextPage }
      />
    </div>
  )
}