import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../enums/status.code.js";
import bcrypt from "bcrypt";
import * as authRepository from "../repositories/auth.repository.js";

const signup = async (req, res) => {
	const { name, password, imageUrl, email } = req.body;

	try {
		const passwordHash = bcrypt.hashSync(password, 10);

		await authRepository.insertUser(name, email, passwordHash, imageUrl);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const signin = async (req, res) => {
	const { password } = req.body;
	const { user } = res.locals;
	const validPassword = bcrypt.compareSync(password, user.password);

	try {
		if (!validPassword) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
			expiresIn: "2d",
		});

		const { rows: sessionExists } = await authRepository.selectSession(user.id);
		if (sessionExists.length !== 0) {
			await authRepository.inactivateSession(sessionExists[0].token);
		}

		await authRepository.createSession(user.id, token);
		return res
			.status(STATUS_CODE.OK)
			.send({ token, id: user.id, name: user.name, image: user.imageUrl });
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

async function logout(req, res) {
	const { token } = res.locals;

	try {
		await authRepository.inactivateSession(token);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { signup, signin, logout };
