import React, { useContext } from 'react'
import { useForm }           from 'react-hook-form'

import { AppContext } from "@src/context/App.context.jsx"
import { InputText }  from "@components/Input"
import Button         from "@components/Button"

import style from "./CreateTask.scss"

export default function() {
  const appCtx = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
 
  function createTask(task) {
    appCtx.createTask(task)
  }

  return (
    <div className={ style['create-task'] }>
      <form className={ style['form'] } onSubmit={handleSubmit(createTask)}>
        <InputText 
          className={ style['username'] }

          error={ errors.username && "Введите имя пользователя" }
          label="Имя пользователя"
          placeholder="Пётр"
          name="username"
          _ref={ register({ 
            required: true
          }) }
        />
        <InputText 
          className={ style['email'] }

          error={ errors.email && "Введите корректный email" }
          label="E-Mail"
          placeholder="foo@example.com"
          name="email"
          _ref={ register({ 
            required: true,
            pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]+?$/
          }) }
        />
        <InputText 
          className={ style['text'] }

          error={ errors.text && "Введите текст" }
          label="Текст"
          placeholder="Сварить пельмешки"
          name="text"
          multiline
          _ref={ register({ 
            required: true
          }) }
        />
        <Button className={ style['submit'] }> Добавить </Button>
      </form>
    </div>
  )
}