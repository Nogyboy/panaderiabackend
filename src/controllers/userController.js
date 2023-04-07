import { queryCreateUser, queryFindUser, queryPassword } from "../query/usersQuery.js";
import createJWT from "../helpers/createJWT.js";

const createUser = async (request, response) => {
  // Create a new user only allow to "Administrador"
  try {
    const user_type = await queryFindUser({ username: request.body.login_username });
    if (user_type[0].type == "Administrador") {
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
      } else {
        response.status(400).json({ message: "User type can be Administrador, Cliente and Delivery " });
      }
    } else {
      return response.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const authenticateUser = async (request, response) => {
  // Authenticate for users
  try {
    const { username, password } = request.body;
    const user = await queryFindUser({ username: username });
    if (user.count == 0) {
      return response.status(401).json({ message: 'Username not found' });
    }

    const user_password = await queryPassword({ username: username });
    if (password != user_password[0].password) {
      return response.status(401).json({ message: "Password doesn't match" });
    }

    const token = createJWT(user[0].username);
    response.json({ message: 'Successful Auth', token, userId: user[0].user_id });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export { createUser, authenticateUser };
