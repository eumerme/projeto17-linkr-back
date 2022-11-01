import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

function updateLikes(id, userId, type) {
	if (type === "like") {
		connection.query(
			`INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
			[userId, id]
		);
	} else {
		connection.query(
			`DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2;`,
			[userId, id]
		);
	}
}

async function findPost(id) {
	return connection.query(`SELECT * FROM ${TABLE.POSTS} WHERE id = $1`, [id]);
}

/* async function editPostText(comment, id) {
	return connection.query(
		`UPDATE ${TABLE.POSTS} SET text = $1 WHERE id = $2;`,
		[comment, id]
	);
} */

async function likes(id) {
	return connection.query(
		`
    SELECT COUNT(likes."postId") AS likes,
    json_agg(users.name) AS "likeBy",
    json_agg(likes."userId") AS "users"
    FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE likes."postId" = $1;
  `,
		[id]
	);
}

async function listUserFollowing(userId) {
	return connection.query(
		`SELECT users.id,
			users.name,
			users."imageUrl",
			JSON_BUILD_OBJECT('following', TRUE) AS follow
		FROM follows
		JOIN users ON follows."followeeId" = users.id
		WHERE follows."userId" = $1;`,
		[userId]
	);
}

async function listUserNotFollowing() {
	return connection.query(
		`SELECT users.id,
			users.name,
			users."imageUrl",
			JSON_BUILD_OBJECT('following', FALSE) AS follow
		FROM users
		WHERE users.id NOT IN
				(SELECT users.id
					FROM users
					JOIN follows ON follows."followeeId" = users.id
					GROUP BY users.id);`
	);
}

async function createNewRepost(postId, userId) {
	await connection.query(
		`INSERT INTO ${TABLE.REPOSTS} ("userId", "postId") VALUES ($1, $2);`,
		[userId, postId]
	);

	const result = (
		await connection.query(`
    SELECT reposts.id AS "repostId",
    reposts."userId",
    posts.id,
    posts.text,
    posts.url,
    users.name
    FROM reposts 
    JOIN posts ON posts.id=reposts."postId"
    JOIN users on posts."userId"=users.id
    WHERE reposts.id = (SELECT MAX(reposts.id) FROM reposts);
  `)
	).rows[0];

	connection.query(
		`
    INSERT INTO ${TABLE.POSTS} ("userId", text, url, "repostBy") VALUES ($1, $2, $3, $4);`,
		[result.userId, result.text, result.url, result.repostId]
	);
}

async function countReposts(id) {
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
}

export {
	updateLikes,
	listPostInterval,
	//editPostText,
	likes,
	findPost,
	createNewRepost,
	countReposts,
	listUserFollowing,
	listUserNotFollowing,
};
