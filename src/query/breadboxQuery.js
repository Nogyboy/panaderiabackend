import sql from "../config/db.js";

const queryInsertBreadBox = async ({ name, price, quantity, description }) => {
  // Insert a new Bread Box into database
  const bread_box = await sql`
    INSERT INTO bread_boxes(
      name, price, quantity, description)
    VALUES (${name}, ${price}, ${quantity}, ${description})
    returning bread_box_id, name, price, quantity, description
  `;

  return bread_box;
};


const queryAllBreadBoxes = async () => {
  // Retrieve all Bread Boxes records
  const boxes = await sql`
    SELECT bread_box_id, name, price, quantity, description
    FROM bread_boxes;
    `
  return boxes;
};

const queryInsertImageBreadBox = async ({ filename, filepath, mimetype, size, bread_box_id }) => {
  // Insert the data of a new Bread Box's Image into database
  const bread_image = await sql`
    INSERT INTO bread_images(
      filename, filepath, mimetype, size, bread_box_id)
    VALUES (${filename}, ${filepath}, ${mimetype}, ${size}, ${bread_box_id})
    returning bread_image_id, filename, filepath, mimetype, size, bread_box_id
  `;

  return bread_image;
};

const queryBreadBoxImages = async ({ bread_box_id }) => {
  // Retrieve all images of a Bread Box
  const images = await sql`
    SELECT bread_image_id, filename, filepath, mimetype, size
    FROM bread_images
    WHERE bread_box_id = ${bread_box_id};
    `
  return images;
};


export { queryAllBreadBoxes, queryInsertBreadBox, queryInsertImageBreadBox, queryBreadBoxImages }