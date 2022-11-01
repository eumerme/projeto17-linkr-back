import { STATUS_CODE } from "../enums/status.code.js";
import { TABLE } from "../enums/tables.js";
import { likesSchema, repostsSchema } from "../schemas/schemas.js";
import { connection } from "../database/db.js";

async function validateLikes(req, res, next) {
	const { userId, type, id } = req.body;

	try {
		const validation = likesSchema.validate(req.body, { abortEarly: false });
		if (validation.error) {
			const message = validation.error.details.map((value) => value.message);
			res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
			return;
		}
		const likeExist = (
			await connection.query(
				`
	   SELECT * FROM ${TABLE.LIKES} WHERE "userId" = $1 AND "postId" = $2;
	   `,
				[userId, id]
			)
		).rows;

		if (likeExist.length !== 0 && type === "like")
			return res.sendStatus(STATUS_CODE.CONFLICT);
		if (likeExist.length === 0 && type === "noLike")
			return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function validateRepost(req, res, next) {
	const { postId, userId } = req.body;
	try {
		const validation = repostsSchema.validate(req.body, { abortEarly: false });
		if (validation.error) {
			const message = validation.error.details.map((value) => value.message);
			return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
		}

		const userExist = (
			await connection.query(`SELECT * FROM ${TABLE.USERS} WHERE id = $1;`, [
				userId,
			])
		).rows;

		const postExist = (
			await connection.query(`SELECT * FROM ${TABLE.POSTS} WHERE id = $1`, [
				postId,
			])
		).rows;

		if (userExist.length === 0 || postExist.length === 0)
			return res.sendStatus(STATUS_CODE.NOT_FOUND);

		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function validateRepostId(req, res, next) {
	const { id } = req.params;

	try {
		const idExist = (
			await connection.query(
				`SELECT reposts.*,
			users.name
			FROM reposts
			JOIN users ON users.id=reposts."userId"
			WHERE reposts.id = $1;`,
				[id]
			)
		).rows;

		if (idExist.length === 0) return res.sendStatus(STATUS_CODE.NOT_FOUND);

		res.locals.data = idExist;
		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { validateLikes, validateRepost, validateRepostId };
