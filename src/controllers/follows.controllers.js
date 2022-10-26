import { STATUS_CODE } from "../enums/status.code.js";
import * as followsRepository from "../repositories/follows.repository.js";

const follows = async (req, res) => {
	const { userId, followeeId } = req.body;
	const { path } = req.route;

	if (!userId || !followeeId) {
		return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
	}

	try {
		const { rows: result } = await followsRepository.selectFollower(
			userId,
			followeeId
		);

		if (path === "/is-following") {
			if (result.length !== 0) {
				return res.status(STATUS_CODE.OK).send({ follows: true });
			} else {
				return res.status(STATUS_CODE.OK).send({ follows: false });
			}
		}

		if (path === "/follow-unfollow") {
			if (result.length !== 0) {
				await followsRepository.unfollow(userId, followeeId);
				return res.status(STATUS_CODE.OK).send({ follows: false });
			} else {
				await followsRepository.follow(userId, followeeId);
				return res.status(STATUS_CODE.OK).send({ follows: true });
			}
		}
	} catch (error) {
		console.log(error.message);
		return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
	}
};

export { follows };
