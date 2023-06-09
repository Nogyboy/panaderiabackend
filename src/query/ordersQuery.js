import sql from "../config/db.js";

const queryCreateOrder = async ({ user_id, name, address, phone, payment }) => {
  //Insert a new order with status 'Generado'
  const d = new Date()
  const now_date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

  const order = await sql`
  INSERT INTO orders(
    user_id, name, date, address, phone, payment, total, status)
    VALUES (${user_id}, ${name}, ${now_date}, ${address}, ${phone}, ${payment}, 0, 'Generado')
    returning order_id, user_id, name, date, address, phone, payment, total, status`
  return order;
}

const queryCreateDetailOrder = async ({ order_id, bread_box_id, quantity }) => {
  // Insert a new detail's order and update the total of the according order
  const order = await sql`
  INSERT INTO order_details(
    order_id, bread_box_id, quantity)
    VALUES (${order_id}, ${bread_box_id}, ${quantity})
    returning order_detail_id, order_id, bread_box_id, quantity`

  const order_details = await sql`
    SELECT bread_box_id, quantity
    FROM order_details
    WHERE order_id = ${order_id};
  `
  var total = 0;
  for (const item of order_details) {
    const bread_box = await sql`
      SELECT price
      FROM bread_boxes
      WHERE bread_box_id = ${item.bread_box_id}
    `

    total += bread_box[0].price * item.quantity;

  }

  await sql`
  UPDATE orders
  SET  total=${(Math.round(total * 100) / 100).toFixed(2)}
  WHERE order_id = ${order_id};
`
 
  return order;
}

const queryOrderDetails = async ({ order_id }) => {
  // Retrieve all order details
  const orders = await sql`
  SELECT order_detail_id, order_id, bread_box_id, quantity
	FROM order_details
  WHERE order_id = ${order_id}
    `
  return orders;
};

const queryAllOrders = async () => {
  // Retrieve all orders
  const orders = await sql`
    SELECT order_id, user_id, name, date, address, phone, payment, total, status
    FROM orders
    `
  return orders;
};


const queryAllGeneratedOrders = async () => {
  // Retrieve all orders with "Generado" status
  const orders = await sql`
    SELECT order_id, user_id, name, date, address, phone, payment, total, status
    FROM orders
    WHERE status = 'Generado';
    `
  return orders;
};


export { queryCreateOrder, queryCreateDetailOrder, queryAllOrders, queryAllGeneratedOrders, queryOrderDetails }