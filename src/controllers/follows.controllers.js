import { STATUS_CODE } from "../enums/status.code.js";
import * as followsRepository from "../repositories/follows.repository.js";

async function follows(req, res) {
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
		return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
	}
}

async function listUsers(req, res) {
	const { userId } = res.locals;

	try {
		const { rows: following } = await followsRepository.listUserFollowing(
			userId
		);
		const { rows: notFollowing } = await followsRepository.listUserNotFollowing(
			userId
		);

		const users = [...following, ...notFollowing];
		return res.status(STATUS_CODE.OK).send(users);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { follows, listUsers };
