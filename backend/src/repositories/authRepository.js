import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { prisma } from "../config/prisma.js";

const secretKey = process.env.SECRET_KEY_JWT;
const expirationTime = process.env.TOKEN_EXPIRATION_TIME;

class AuthRepository {
    async getUserByEmail(email) {

        const result = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        return result;
    }

    authenticateUser = async (email, password) => {
      try {
        const user = await this.getUserByEmail(email);

        if (!user) {
            throw new Error("Usuário não encontrado!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
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
        throw new Error("Erro ao autenticar usuário: " + error.message);
      }
    }
}

export default AuthRepository;