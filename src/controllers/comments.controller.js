import { STATUS_CODE } from "../enums/status.code.js";
import * as commentsRepository from "../repositories/comments.repository.js";

async function insertComment(req, res) {
	const { comment, postId, commentUserId } = req.body;

	try {
		await commentsRepository.insertNewComment(comment, postId, commentUserId);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function listComments(req, res) {
	const postId = Number(req.params.postId);

	try {
		const { rows: comments } = await commentsRepository.listPostComments(
			postId
		);
		return res.status(STATUS_CODE.OK).send(comments);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function deleteComment(req, res, next) {
	const { commentId } = req.params;

	try {
		await commentsRepository.deletePostComment(commentId);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

export { insertComment, listComments, deleteComment };
