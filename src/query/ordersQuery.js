import sql from "../config/db.js";

const queryCreateOrder = async ({ user_id, name, address, phone, payment }) => {
  //Create a new order with status 'Generado'
  const d = new Date()
  const now_date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

  const order = await sql`
  INSERT INTO orders(
    user_id, name, date, address, phone, payment, total, status)
    VALUES (${user_id}, ${name}, ${now_date}, ${address}, ${phone}, ${payment}, 0, 'Generado')
    returning order_id, user_id, name, date, address, phone, payment, status`
  return order;
}

const queryDetailOrder = async ({ order_id, bread_box_id, quantity }) => {

  const order = await sql`
  INSERT INTO order_details(
    order_id, bread_box_id, quantity)
    VALUES (${order_id}, ${bread_box_id}, ${quantity})
    returning order_detail_id, order_id, bread_box_id, quantity`
  
    // UPDATE public.orders
    // SET order_id=?, user_id=?, name=?, date=?, address=?, phone=?, payment=?, status=?
    // WHERE <condition>;

  //   await sql`
  // INSERT INTO orders(
  //   order_id, bread_box_id, quantity)
  //   VALUES (${order_id}, ${bread_box_id}, ${quantity})
  //   returning order_detail_id, order_id, bread_box_id, quantity` 
  return order;
}

const queryAllOrders = async () => {
  // Get all Bread Boxes records
  const boxes = await sql`
    SELECT order_id, user_id, name, date, address, phone, payment, status
    FROM orders
    `
  return boxes;
};


const queryAllGeneratedOrders = async () => {
  // Get all Bread Boxes records
  const boxes = await sql`
    SELECT order_id, user_id, name, date, address, phone, payment, status
    FROM orders
    WHERE status = "Generada"
    `
  return boxes;
};


const queryDeliverOrder = async () => {
  // Get all Bread Boxes records
  const boxes = await sql`
    SELECT order_id, user_id, name, date, address, phone, payment, status
    FROM orders
    WHERE status = "Generada"
    `
  return boxes;
};




export { queryCreateOrder, queryDetailOrder }