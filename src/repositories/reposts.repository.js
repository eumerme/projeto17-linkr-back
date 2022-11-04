import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

/* async function findPost(id) {
	return connection.query(`SELECT * FROM ${TABLE.POSTS} WHERE id = $1`, [id]);
} */

async function insertRepost(userId, postId) {
	return connection.query(
		`INSERT INTO reposts ("repostBy", "postId") VALUES ($1, $2);`,
		[userId, postId]
	);
}

async function getReposts() {
	return connection.query(
		`SELECT reposts."repostBy" AS "repostById" 
			, users.name AS "repostByName"
			, reposts."postId"
			, reposts."createdAt"
		FROM reposts
		JOIN users ON reposts."repostBy" = users.id
		CROSS JOIN posts
		GROUP BY "repostById"
			, "repostByName"
			, reposts."postId"
			, reposts."createdAt";`
	);
}

/* async function countReposts(id) {
	return connection.query(
		`SELECT COUNT("postId") AS "countReposts"
      FROM reposts 
      WHERE "postId" = $1;`,
		[id]
	);
}

async function listPostInterval(limit) {
	return connection.query(
		`SELECT COUNT(id) AS "allPosts" FROM posts WHERE "createdAt" > $1;`,
		[limit]
	);
} */

export {
	/* listPostInterval,
	findPost,
	countReposts, */
	insertRepost,
	getReposts,
};
