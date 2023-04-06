import sql from "../config/db.js";

const queryCreateOrder = async ({ user_id, name, address, phone, payment }) => {
  //Create a new order with status 'Generado'
  const order = await sql`
  INSERT INTO orders(
    user_id, name, date, address, phone, payment, status)
    VALUES (${user_id}, ${name}, ${Date.toString()}, ${address}, ${phone}, ${payment}, Generado);`
}

export { queryCreateOrder }