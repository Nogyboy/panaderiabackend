import jwt from 'jsonwebtoken';
import { queryFindUser } from '../query/usersQuery.js';

const checkAuth = async (request, response, next) => {
    // Check credentials before access to the endpoint
    let token;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = request.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "secretWord");
            request.user = await queryFindUser({ username: decoded.id }); 
            return next();
        } catch (error) {
            return response.status(404).json({ message: "Invalid token" });
        }   
    }
    if (!token) {
        const error = new Error("Invalid token");
        return response.status(401).json({ message: error.message });
    }
    next();
};

export default checkAuth;
