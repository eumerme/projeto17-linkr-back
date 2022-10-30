import { STATUS_CODE } from "../enums/status.code.js";
import { schemas } from "../schemas/schemas.js";

async function schemasValidation(req, res, next) {
	const { path } = req.route;
	let result;

	if (path === "/sign-up") {
		result = schemas.signup.validate(req.body, {
			abortEarly: false,
		});
	}

	if (path === "/sign-in") {
		result = schemas.signin.validate(req.body, {
			abortEarly: false,
		});
	}

	if (result?.error) {
		const message = result.error.details
			.map((detail) => detail.message)
			.join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	next();
}

export { schemasValidation };
