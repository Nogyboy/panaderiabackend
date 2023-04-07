import jwt from "jsonwebtoken";

const createJWT = (id) => {
    // Create a temporal token for authentication
    return jwt.sign({ id}, "secretWord", { expiresIn: "30d", });
};

export default createJWT;