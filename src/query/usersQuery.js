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

const queryFindUser = async( { username }) => {

  const user = await sql`
    SELECT user_id, username, type
    FROM users
    WHERE username = ${username}
  `
  return user;
}

const queryPassword = async( { username }) => {

  const user = await sql`
    SELECT password
    FROM users
    WHERE username = ${username}
  `
  return user;
}

export { queryCreateUser, queryFindUser, queryPassword }