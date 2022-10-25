import { STATUS_CODE } from "../enums/status.code.js";
import * as followsRepository from "../repositories/follows.repository.js";

async function validateFollows(req, res, next) {
	const { userId } = res.locals;

	try {
		const { rows: result } = await followsRepository.checkUserFollows(userId);
		console.log(result);

		if (result.length !== 0) {
			//sege alguem, validar se esse alguem (ou algunes) têm posts no controller
		} else {
			//não segue ngm
			res.locals.followSomeone = false;
		}
		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { validateFollows };
