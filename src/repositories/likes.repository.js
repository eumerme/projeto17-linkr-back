import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

function insertLikeDislike(postId, userId, isLiked) {
	/* isLiked vem ao contrário do front */
	if (!isLiked) {
		return connection.query(
			`INSERT INTO ${TABLE.LIKES} ("userId", "postId") VALUES ($1, $2);`,
			[userId, postId]
		);
	} else {
		return connection.query(
			`DELETE FROM ${TABLE.LIKES} WHERE "userId" = $1 AND "postId" = $2;`,
			[userId, postId]
		);
	}
}

async function getLikes(id) {
	return connection.query(
		`SELECT COUNT(${TABLE.LIKES}."postId") AS likes,
            json_agg(${TABLE.USERS}.name) AS "likedByNames",
            json_agg(${TABLE.LIKES}."userId") AS "likedByIds"
        FROM ${TABLE.LIKES}
        JOIN ${TABLE.USERS} ON ${TABLE.LIKES}."userId" = ${TABLE.USERS}.id
        WHERE ${TABLE.LIKES}."postId" = $1;`,
		[id]
	);
}

async function selectLikes(id) {
	return connection.query(
		`SELECT ${TABLE.LIKES}."userId"
			,  ${TABLE.LIKES}."postId"
		FROM ${TABLE.LIKES}
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = ${TABLE.LIKES}."postId"
		WHERE ${TABLE.POSTS}.id = $1;`,
		[id]
	);
}

async function deletePostsLikes(userId, postId) {
	return connection.query(
		`DELETE FROM ${TABLE.LIKES} 
		WHERE ${TABLE.LIKES}."userId" = $1 AND ${TABLE.LIKES}."postId" = $2;`,
		[userId, postId]
	);
}

export { insertLikeDislike, getLikes, selectLikes, deletePostsLikes };
