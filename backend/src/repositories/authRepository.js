import { prisma } from "../config/prisma.js";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY_JWT;
const expirationTime = process.env.TOKEN_EXPIRATION_TIME;

class AuthRepository {
    async getUserByEmail(email) {
        const query = {
          text: 'SELECT * FROM users WHERE email = $1',
          values: [email]
        };
        const result = await pool.query(query);
        return result.rows.length > 0;
    }

    authenticateUser = async (email, password) => {
      try {
        const user = await this.getUserByEmail(email);

        if (!user) {
            throw new Error("Usuário não encontrado!");
        }
      
        if (user.password !== password) {
            throw new Error("Senha incorreta!");
        }
      
        const payload = { email: email, id: user.id };
        const token = jwt.sign(payload, secretKey, { expiresIn: expirationTime });
      
        return {
          user: { 
            email: email,
            id: user.id,
          },
          auth: token,
        };

      } catch (error) {
        throw new Error("Erro ao autenticar usuário: ", error.message);
      }
    }
}

export default AuthRepository;