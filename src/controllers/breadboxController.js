import { queryAllBreadBoxes, queryInsertBreadBox, queryInsertImageBreadBox, queryBreadBoxImages } from "../query/breadboxQuery.js";


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

const createBreadBox = async (request, response) => {
  try {
    const bread_box = await queryInsertBreadBox({
      name: request.body.name,
      price: request.body.price,
      quantity: request.body.quantity,
      description: request.body.description
    });
    response.status(201).json(bread_box);
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


export { getAllBreadBoxes, createBreadBox, createBreadImage, getBreadBoxImages };
