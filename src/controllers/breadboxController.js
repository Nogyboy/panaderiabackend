import { queryAllBreadBoxes, queryInsertBreadBox, queryInsertImageBreadBox, queryBreadBoxImages } from "../query/breadboxQuery.js";
import { queryFindUser } from "../query/usersQuery.js";

const getAllBreadBoxes = async (request, response) => {
  // Get all Bread Boxes only allow to "Administrador"
  try {
    const user_type = await queryFindUser( { username: request.body.login_username} );
    if(user_type[0].type == "Administrador"){
    const boxes = await queryAllBreadBoxes();
    if (boxes.count == 0) {
      return response.status(404).json({ message: 'Boxes not found' });
    }
    response.json(boxes);
  }else{
    return response.status(401).json({ message: 'Unauthorized' })
  }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const createBreadBox = async (request, response) => {
  // Create a new Bread Box only allow to "Administrador"
  try {
    const user_type = await queryFindUser( { username: request.body.login_username} );
    if(user_type[0].type == "Administrador"){
    const bread_box = await queryInsertBreadBox({
      name: request.body.name,
      price: request.body.price,
      quantity: request.body.quantity,
      description: request.body.description
    });
    response.status(201).json(bread_box);
  }else{
    return response.status(401).json({ message: 'Unauthorized' })
  }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const createBreadImage = async (request, response) => {
  // Create a new Bread Image only allow to "Administrador"
  try {
    const user_type = await queryFindUser( { username: request.body.login_username} );
    if(user_type[0].type == "Administrador"){
    const image_bread = await queryInsertImageBreadBox({
      filename: request.file.filename,
      filepath: request.file.path,
      mimetype: request.file.mimetype,
      size: request.file.size,
      bread_box_id: request.body.bread_box_id
    });

    response.status(201).json(image_bread);
  }else{
    return response.status(401).json({ message: 'Unauthorized' })
  }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

};

const getBreadBoxImages = async (request, response) => {
  // Get Bread Box Images using ID only allow to "Administrador"
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
