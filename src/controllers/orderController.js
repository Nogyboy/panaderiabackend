import { queryCreateOrder, queryCreateDetailOrder, queryAllOrders, queryAllGeneratedOrders, queryOrderDetails } from "../query/ordersQuery.js";
import { queryFindUser } from "../query/usersQuery.js";

const createOrder = async (request, response) => {
  // Create a new BreadBox Order only allow to "Cliente"
  try {
    const user_type = await queryFindUser({ username: request.body.login_username });
    if (user_type[0].type == "Cliente") {
      const payment = request.body.payment

      if (payment.toLowerCase() == "efectivo" || payment.toLowerCase() == "tarjeta") {
        const order = await queryCreateOrder({
          user_id: request.body.user_id,
          name: request.body.name,
          address: request.body.address,
          phone: request.body.phone,
          payment: payment
        });
        response.status(201).json(order);
      } else {
        response.status(400).json({ message: "Payment can be Efectivo or Tarjeta" });
      }
    } else {
      return response.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const createOrderDetail = async (request, response) => {
  // Create a new order detail only allow to "Cliente"
  try {
    const user_type = await queryFindUser({ username: request.body.login_username });
    if (user_type[0].type == "Cliente") {
      const detail = await queryCreateDetailOrder({
        order_id: request.body.order_id,
        bread_box_id: request.body.bread_box_id,
        quantity: request.body.quantity
      });
      response.status(201).json(detail);
    } else {
      return response.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (request, response) => {
  // Get all orders "Generado" or "Entregado"
  try {

    const user_type = await queryFindUser({ username: request.body.login_username });
    if (user_type[0].type == "Administrador") {
      const orders = await queryAllOrders();
      if (orders.count == 0) {
        return response.status(404).json({ message: 'Orders not found' });
      }
      response.json(orders);

    } else if (user_type[0].type == "Delivery") {
      const orders = await queryAllGeneratedOrders();
      if (orders.count == 0) {
        return response.status(404).json({ message: 'Orders not found' });
      }
      response.json(orders);


    } else {
      return response.status(401).json({ message: 'Unauthorized' })
    }

  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getDetailsOrder = async (request, response) => {
  // Get the details' order base on ID
  try {
      const details = await queryOrderDetails({
        order_id: request.body.order_id
      });
      if (details.count == 0) {
        return response.status(404).json({ message: 'Details Order not found' });
      }
      response.json(details);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export { createOrder, createOrderDetail, getAllOrders, getDetailsOrder };
