import { STATUS_CODE } from "../enums/statusCode.js";
import bcrypt from 'bcrypt';
import * as authRepository from '../repositories/authRepository.js';

const registerUser = (req, res) => {
    const { name, password, imageUrl, email } = req.body;
    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        authRepository.register(name, email, passwordHash, imageUrl);

        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
};

export { registerUser };