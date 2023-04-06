import { queryCreateOrder } from "../query/ordersQuery";

const createOrder = async (request, response) => {
  try {
    const order = await queryCreateOrder({
      user_id: request.body.user_id,
      name: request.body.name,
      address: request.body.address,
      phone: request.body.phone,
      payment: request.body.payment
    });
    response.status(201).json(order);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


const getAllBreadBoxes = async (request, response) => {
  try {
    const boxes = await queryAllBreadBoxes();
    if (boxes.count == 0) {
      return response.status(404).json({ message: 'Boxes not found' });
    }
    response.json(boxes);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const createBreadImage = async (request, response) => {
  try {
    const image_bread = await queryInsertImageBreadBox({
      filename: request.file.filename,
      filepath: request.file.path,
      mimetype: request.file.mimetype,
      size: request.file.size,
      bread_box_id: request.body.bread_box_id
    });

    response.status(201).json(image_bread);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

};

const getBreadBoxImages = async (request, response) => {
  try {
    console.log(request.body.bread_box_id)
    const images = await queryBreadBoxImages({ bread_box_id: request.body.bread_box_id });
    if (images.count == 0) {
      return response.status(404).json({ message: 'Boxes not found' });
    }
    response.json(images);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export { createOrder };
