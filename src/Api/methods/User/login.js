import Req from "@api/Req.js";
import { serialize } from 'object-to-formdata';
/**
 * Авторизация
 * 
 * @param  { object||FormData } user - данные для авторизации
 */
export default async function login(user) {
  let body;

  if(!(user instanceof FormData)) { 
    if(typeof user == "object") {
      body = serialize(user);
    } else
      throw "Неверный формат"

  } else {
    body = user;
  }

  if(!body.get("username")) throw "'username' обязателен"
  if(!body.get("password")) throw "'password' обязателен"

  try {
    const res = await Req("POST", `/login`, body)
    return res;

  } catch (e) {
    throw e
  }
}
