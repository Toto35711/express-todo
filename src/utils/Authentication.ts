import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
  public static passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static isPasswordCorrect = async (
    password: string,
    encryptedPassword: string
  ): Promise<boolean> => {
    return bcrypt.compare(password, encryptedPassword);
  };

  public static token = (id: number, username: string, password: string) => {
    const secretKey: string = process.env.JWT_SECRET_KEY || "secret";

    const token: string = jwt.sign({ id, username, password }, secretKey);
    return token;
  };
}

export default Authentication;
