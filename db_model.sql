-- Script to create tables of the Bakery Store

CREATE TABLE IF NOT EXISTS public.bread_boxes
(
    bread_box_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(2) NOT NULL,
    quantity INTEGER NOT NULL,
    description VARCHAR(250)

);

CREATE TABLE IF NOT EXISTS public.bread_images
(
    bread_image_id SERIAL PRIMARY KEY,
    filename VARCHAR(300) NOT NULL,
    filepath  VARCHAR(300) NOT NULL,
    mimetype VARCHAR(300) NOT NULL,
    size INTEGER NOT NULL,
    bread_box_id INT  NOT NULL,
    CONSTRAINT fk_bread_box
      FOREIGN KEY(bread_box_id) 
	  REFERENCES bread_boxes(bread_box_id)
);


CREATE TABLE IF NOT EXISTS public.users
(
    user_id SERIAL PRIMARY KEY,
    username  VARCHAR(40) UNIQUE NOT NULL,
    name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(15) NOT NULL,
    type VARCHAR(25) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.orders
(
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    address VARCHAR(200) NOT NULL,
    phone VARCHAR(15),
    payment VARCHAR(15) NOT NULL,
    status VARCHAR(15) NOT NULL
    
);

CREATE TABLE IF NOT EXISTS public.order_details
(
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    bread_box_id INT NOT NULL,
    CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
	  REFERENCES orders(order_id),
    CONSTRAINT fk_bread_box
      FOREIGN KEY(bread_box_id) 
	  REFERENCES bread_boxes(bread_box_id),
    quantity INTEGER NOT NULL
    
);