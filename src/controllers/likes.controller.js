import { STATUS_CODE } from "../enums/status.code.js";
import * as likesRepository from "../repositories/likes.repository.js";

async function likeDislike(req, res) {
	const { postId, userId, isLiked } = req.body;

	try {
		await likesRepository.insertLikeDislike(postId, userId, isLiked);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		console.log("likes ", error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function listLikes(req, res) {
	const { id } = req.params;
	const { userId } = res.locals;

	try {
		const likes = (await likesRepository.getLikes(id)).rows[0];
		const isliked = likes.likedByIds.find((value) => value === userId);

		if (isliked) {
			return res.status(STATUS_CODE.OK).send({ liked: true, likes });
		} else {
			return res.status(STATUS_CODE.OK).send({ liked: false, likes });
		}
	} catch (error) {
		console.log(error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}
export { likeDislike, listLikes };
