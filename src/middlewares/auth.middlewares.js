import * as authRepository from "../repositories/auth.repository.js";
import { STATUS_CODE } from "../enums/status.code.js";
import { signUpSchema, signInSchema } from "../schemas/schemas.js";

async function validateRegister(req, res, next) {
	const { email } = req.body;
	try {
		const validation = signUpSchema.validate(req.body, { abortEarly: false });
		if (validation.error) {
			const message = validation.error.details.map((value) => value.message);
			res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
			return;
		}

		const { rows: emailExist } = await authRepository.verifyEmail(email);
		if (emailExist.length !== 0) return res.sendStatus(STATUS_CODE.CONFLICT);

		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function validateSigninBody(req, res, next) {
	const { email } = req.body;
	const { error } = signInSchema.validate(req.body, { abortEarly: false });
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}
	try {
		const { rows: user } = await authRepository.verifyEmail(email);
		if (user.length === 0) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

		res.locals.user = user[0];
		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { validateRegister, validateSigninBody };
