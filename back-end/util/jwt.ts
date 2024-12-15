import jwt from "jsonwebtoken";
import { Role } from "../types";

const generateJwtToken = (email: string, role: Role) => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: `famList_app`};

    try {
        return jwt.sign({email, role}, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token, see server logs for more details.")
    }
}

export default generateJwtToken;