import sql from "../config/db.js";

const queryCreateUser = async ({ username, name, last_name, password, type }) => {
  //
  const order = await sql`
  INSERT INTO users(
    username, name, last_name, password, type)
    VALUES (${username}, ${name}, ${last_name}, ${password}, ${type})
    returning user_id, username, name, last_name, password, type`
    return order;
}

export { queryCreateUser }