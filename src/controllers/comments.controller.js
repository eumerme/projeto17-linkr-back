import { STATUS_CODE } from "../enums/status.code.js";
import * as commentsRepository from "../repositories/comments.repository.js";

async function insertComment(req, res) {
	const { comment, postId } = req.body;
	const { userId } = res.locals;
	try {
		await commentsRepository.insertNewComment(comment, postId, userId);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function listComments(req, res) {
	console.log("entrou listcomments");
	const postId = Number(req.params.postId);
	const { userId } = res.locals;

	console.log({ userId, postId });
	try {
		const { rows: comments } = await commentsRepository.listPostComments(
			userId,
			postId
		);
		console.log("comments ", comments);

		return res.status(STATUS_CODE.OK).send(comments);
	} catch (error) {
		console.log("comments ", error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { insertComment, listComments };
