import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function insertNewComment(comment, postId, userId) {
	return connection.query(
		`INSERT INTO ${TABLE.COMMENTS} (comment, "postId", "userId")
         VALUES ($1, $2, $3)`,
		[comment, postId, userId]
	);
}

async function listPostComments(userId, postId) {
	return connection.query(
		`SELECT comments.comment, comments."userId" as "commentUserId", users.name, users."imageUrl", posts."userId" as "postUserId", follows."followeeId" AS "followee" FROM comments JOIN users ON users.id = comments."userId" JOIN posts ON comments."postId" = posts.id FULL JOIN follows ON comments."userId" = (SELECT follows."followeeId" FROM follows JOIN comments ON comments."userId" = follows."followeeId" WHERE follows."userId" = $1 LIMIT 1) WHERE posts.id = $2 ORDER BY comments."createdAt" DESC;`,
		[userId, postId]
	);
}

export { insertNewComment, listPostComments };
