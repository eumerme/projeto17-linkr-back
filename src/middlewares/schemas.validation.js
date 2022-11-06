import { STATUS_CODE } from "../enums/status.code.js";
import { schemas } from "../schemas/schemas.js";

async function urlValidation(req, res, next) {
	const { path } = req.route;
	let url;

	if (path === "/sign-up") url = req.body.imageUrl;
	if (path === "/publish") url = req.body.url;

	const validUrl =
		url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://";
	if (!validUrl) {
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: `"url" must be a valid URL` });
	}

	next();
}

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

	if (path === "/publish") {
		result = schemas.publish.validate(req.body, {
			abortEarly: false,
		});
	}

	if (path === "/posts/update/:id") {
		result = schemas.editComment.validate(req.body);
	}

	if (result?.error) {
		const message = result.error.details
			.map((detail) => detail.message)
			.join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	next();
}

export { schemasValidation, urlValidation };
