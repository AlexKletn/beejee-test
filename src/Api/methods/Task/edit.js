import Req from "@api/Req.js";
import { serialize } from 'object-to-formdata';
/**
 * Изменение задачи
 * 
 * @param  { string } id - ID задачи
 * @param  { object||FormData } task - данные
 */
export default async function editTask(id, task) {
  let body;

  if(!(task instanceof FormData)) { 
    if(typeof task == "object") 
      body = serialize(task)    
    else
      throw "Неверный формат"
  } else {
    body = task;
  }

  if(!id) throw "'id' обязателен"
  
  if(body.get("status") && !['0','1','10','11'].includes(body.get("status")))
    throw "Укажите допустимый статус"

  if(body.get("text") && typeof body.get("text") != "string")
    throw new Error("'text' должен быть строкой")

  return await Req("POST", `/edit/${id}`, body);
}
