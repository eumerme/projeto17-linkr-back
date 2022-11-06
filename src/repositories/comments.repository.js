import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function insertNewComment(comment, postId, commentUserId) {
	return connection.query(
		`INSERT INTO ${TABLE.COMMENTS} (comment, "postId", "userId")
         VALUES ($1, $2, $3);`,
		[comment, postId, commentUserId]
	);
}

async function listPostComments(postId) {
	return connection.query(
		`SELECT ${TABLE.USERS}.name
			, ${TABLE.USERS}."imageUrl"
			, ${TABLE.POSTS}."userId" AS "postUserId"
			, ${TABLE.COMMENTS}.comment
			, ${TABLE.COMMENTS}."userId" AS "commentUserId"
		FROM ${TABLE.COMMENTS} 
		JOIN ${TABLE.USERS} ON ${TABLE.USERS}.id = ${TABLE.COMMENTS}."userId" 
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = ${TABLE.COMMENTS}."postId"
		WHERE ${TABLE.POSTS}.id = $1
		ORDER BY ${TABLE.COMMENTS}."createdAt";`,
		[postId]
	);
}

async function selectComments(id) {
	return connection.query(
		`SELECT ${TABLE.COMMENTS}."userId"
			,  ${TABLE.COMMENTS}."postId"
		FROM ${TABLE.COMMENTS}
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = ${TABLE.COMMENTS}."postId"
		WHERE ${TABLE.POSTS}.id = $1;`,
		[id]
	);
}

async function deletePostsComments(userId, postId) {
	return connection.query(
		`DELETE FROM ${TABLE.COMMENTS}
		WHERE ${TABLE.COMMENTS}."userId" = $1 AND ${TABLE.COMMENTS}."postId" = $2;`,
		[userId, postId]
	);
}

export {
	insertNewComment,
	listPostComments,
	selectComments,
	deletePostsComments,
};
