import { verifyEmail } from "../repositories/auth.repository.js";
import { STATUS_CODE } from "../enums/status.code.js";

async function userValidation(req, res, next) {
	const { path } = req.route;
	const { email } = req.body;

	try {
		const { rows: user } = await verifyEmail(email);

		if (user.length !== 0 && path === "/sign-up") {
			return res.sendStatus(STATUS_CODE.CONFLICT);
		}
		if (user.length === 0 && path === "/sign-in") {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		res.locals.user = user[0];
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { userValidation };
