import * as timelineRepository from "../repositories/timeline.repository.js";
import { STATUS_CODE } from "../enums/status.code.js";
import { publishSchema } from "../schemas/schemas.js";

async function validateNewPost(req, res, next) {
	try {
		const validation = publishSchema.validate(req.body, { abortEarly: false });
		if (validation.error) {
			const message = validation.error.details.map((value) => value.message);
			res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
			return;
		}
		next();
	} catch (error) {
		res.sendStatus(STATUS_CODE.SERVER_ERROR);
		return;
	}
}

async function validateExistPost(req, res, next) {
	const { id } = req.params;
	console.log(id);
	try {
		const result = await timelineRepository.findPost(id);
		if (result.rows.length === 0) {
			res.sendStatus(STATUS_CODE.NOT_FOUND);
			return;
		}
		next();
	} catch (error) {
		console.log("aqui ", error.message);
		res.sendStatus(STATUS_CODE.SERVER_ERROR);
		return;
	}
}

export { validateNewPost, validateExistPost };
