import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

function insertLikeDislike(postId, userId, isLiked) {
	/* isLiked vem do front ao contrário */
	if (!isLiked) {
		return connection.query(
			`INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
			[userId, postId]
		);
	} else {
		return connection.query(
			`DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2;`,
			[userId, postId]
		);
	}
}

async function getLikes(id) {
	return connection.query(
		`SELECT COUNT(likes."postId") AS likes,
            json_agg(users.name) AS "likedByNames",
            json_agg(likes."userId") AS "likedByIds"
        FROM likes
        JOIN users ON likes."userId" = users.id
        WHERE likes."postId" = $1;`,
		[id]
	);
}

export { insertLikeDislike, getLikes };
