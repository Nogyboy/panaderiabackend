import { queryCreateUser } from "../query/usersQuery.js";

const createUser = async (request, response) => {
  try {
    const user_type = ["Administrador", "Cliente", "Delivery"];
  if (user_type.includes(request.body.type)) {
    const user = await queryCreateUser({
      username: request.body.username,
      name: request.body.name,
      last_name: request.body.last_name,
      password: request.body.password,
      type: request.body.type,
    });
    response.status(201).json(user);
  } else{
    response.status(400).json({message: "User type can be Administrador, Cliente and Delivery "});
  }
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


export { createUser };
