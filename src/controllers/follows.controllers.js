import { STATUS_CODE } from "../enums/status.code.js";
import * as followsRepository from "../repositories/follows.repository.js";

const isFollowing = async (req, res) => {
	const { userId, followeeId } = req.body;

	if (!userId || !followeeId) {
		return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
	}

	try {
		const { rows: result } = await followsRepository.selectFollower(
			userId,
			followeeId
		);

		if (result.length !== 0) {
			return res.status(STATUS_CODE.OK).send({ follows: true });
		} else {
			return res.status(STATUS_CODE.OK).send({ follows: false });
		}
		console.log(result);
	} catch (error) {
		console.log(error.message);
		return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
	}
};

export { isFollowing };
