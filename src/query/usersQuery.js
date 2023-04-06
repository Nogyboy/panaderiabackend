import { response } from "express";
import sql from "../config/db.js";

const queryCreateUser = async ({ username, name, last_name, password, type }) => {
  //
  
    const user = await sql`
  INSERT INTO users(
    username, name, last_name, password, type)
    VALUES (${username}, ${name}, ${last_name}, ${password}, ${type})
    returning user_id, username, name, last_name, password, type`
    return user;
}

export { queryCreateUser }