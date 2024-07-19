import jwt from "jsonwebtoken";


function authMiddleware(req, res, next) {
    const key = process.env.SECRET_KEY_JWT;


    try {
        const token = req.headers.token;

        const tokenValido = jwt.verify(token, key);

        if(token && tokenValido) {
            next();
        } 
    } catch(error) {
        return res.sendStatus(401);
    }    
}

export default authMiddleware;
