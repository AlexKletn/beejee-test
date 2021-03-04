import React, { useContext, useState } from 'react'
import { useForm }                     from 'react-hook-form'

import { AppContext } from "@src/context/App.context.jsx"
import { InputText }  from "@components/Input"
import Button         from "@components/Button"

import style          from "./Login.scss"

export default function() {
  const appCtx = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState(null)
 
  function login(user) {
    setError(null);

    appCtx.login(user).catch((err)=>{
      setError(err.password)
    })
  }

  return (
    <div className={ style['login'] }>
      { error && 
        <div className={ style['error'] }>
          {error}
        </div>
      }
      <form className={ style['form'] } onSubmit={ handleSubmit(login) }>
        <InputText 
          className={ style['username'] }

          error={ errors.username && "Введите имя пользователя" }
          label="Имя пользователя"
          placeholder="User"
          name="username"
          _ref={ register({ 
            required: true
          }) }
        />
        <InputText 
          className={ style['password'] }

          error={ errors.password && "Введите пароль" }
          label="Пароль"
          name="password"
          password
          _ref={ register({ 
            required: true,
            minLength: 2
          }) }
        />
        <Button className={ style['submit'] }> Войти </Button>
      </form>
    </div>
  )
}