import { queryCreateOrder, queryCreateDetailOrder, queryAllOrders, queryAllGeneratedOrders, queryOrderDetails } from "../query/ordersQuery.js";

const createOrder = async (request, response) => {
  try {
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
    }else{
      response.status(400).json({message: "Payment can be Efectivo or Tarjeta"});
    }

  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const createOrderDetail = async (request, response) => {
  try {
    const detail = await queryCreateDetailOrder({
      order_id: request.body.order_id,
      bread_box_id: request.body.bread_box_id,
      quantity: request.body.quantity
    });
    response.status(201).json(detail);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (request, response) => {
  try {
    const user = request.body.user

    if(user == "Administrador"){
      const orders = await queryAllOrders();
      if (orders.count == 0) {
        return response.status(404).json({ message: 'Orders not found' });
      }
      response.json(orders);

    }else if(user == "Delivery"){
      const orders = await queryAllGeneratedOrders();
      if (orders.count == 0) {
        return response.status(404).json({ message: 'Orders not found' });
      }
      response.json(orders);

    }
    
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getDetailsOrder = async (request, response) => {
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
