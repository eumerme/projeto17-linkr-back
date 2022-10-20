import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../enums/status.code.js";
import bcrypt from "bcrypt";
import * as authRepository from "../repositories/auth.repository.js";

const registerUser = async (req, res) => {
	const { name, password, imageUrl, email } = req.body;
	try {
		const passwordHash = bcrypt.hashSync(password, 10);
		await authRepository.register(name, email, passwordHash, imageUrl);

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

		const { rows: sessionExists } = await authRepository.selectUserFromSessions(
			user.id
		);
		if (sessionExists.length !== 0) {
			await authRepository.inactivateToken(sessionExists[0].token);
		}

		await authRepository.insertUserIntoSessions(user.id, token);
		return res
			.status(STATUS_CODE.OK)
			.send({ token, name: user.name, image: user.imageUrl });
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

async function logout(req, res) {
	const { token } = res.locals;
	try {
		await authRepository.inactivateToken(token);

		return res.sendStatus(200);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { registerUser, signin, logout };
