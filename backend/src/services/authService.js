import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const EXPIRATION_IN_SECONDS = 60 * 60 * 24; // 1 dia

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  authenticateUser = async (email, password) => {
    const storedUser = await this.userRepository.findUserByEmail(email);
    if (!storedUser) {
      throw new Error("User não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    return {
      user: {
        id: storedUser.id,
        email: storedUser.email,
      },
      auth: this.generateToken(storedUser),
    };
  };

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + EXPIRATION_IN_SECONDS,
    };

    return jwt.sign(payload, process.env.SECRET_KEY_JWT);
  }
}

export default AuthService;
