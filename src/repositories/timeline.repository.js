import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function publishNewPost(userId, comment, url) {
	return connection.query(
		`INSERT INTO ${TABLE.POSTS} ("userId", text, url) VALUES ($1, $2, $3);`,
		[userId, comment, url]
	);
}

async function listPost(userId) {
	return connection.query(
		`SELECT posts.text,
			posts.id, 
			posts."userId",
			posts.url,
			users.name,
			users."imageUrl"
		FROM follows 
		JOIN posts ON follows."followeeId" = posts."userId"
			OR follows."userId" = posts."userId"
		JOIN users ON posts."userId" = users.id
		WHERE follows."userId" = $1
		ORDER BY posts."createdAt" DESC
		LIMIT 100;`,
		[userId]
	);
}

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

async function editPostText(comment, id) {
	return connection.query(
		`UPDATE ${TABLE.POSTS} SET text = $1 WHERE id = $2;`,
		[comment, id]
	);
}

async function deleteFatalPost(id) {
	return connection.query(`DELETE FROM ${TABLE.POSTS} WHERE id = $1;`, [id]);
}

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

async function getUsers() {
	return connection.query(`SELECT id, name, "imageUrl" FROM ${TABLE.USERS};`);
}

async function getUserPosts(id) {
	return connection.query(
		`SELECT posts.text,
			posts.id, 
			posts."userId",
			posts.url,
			users.name,
			users."imageUrl"
		FROM posts
		JOIN users ON posts."userId" = users.id
		WHERE users.id = $1
		ORDER BY posts."createdAt" DESC
		LIMIT 20;`,
		[id]
	);
}

async function listPostComments(id) {
	return connection.query(
		`SELECT comments.comment, comments."userId" as "commentUserId", users.name, users."imageUrl", posts."userId" as "postUserId" FROM ${TABLE.COMMENTS} JOIN ${TABLE.USERS} ON users.id = comments."userId" JOIN ${TABLE.POSTS} ON comments."postId" = posts.id WHERE posts.id = $1 ORDER BY comments."createdAt" DESC;`,
		[id]
	);
}

async function createNewComment(comment, postId, userId) {
	return connection.query(
		`INSERT INTO ${TABLE.COMMENTS} (comment, "postId", "userId") VALUES ($1, $2, $3)`,
		[comment, postId, userId]
	);
}

export {
	publishNewPost,
	updateLikes,
	listPost,
	editPostText,
	deleteFatalPost,
	likes,
	findPost,
	getUserPosts,
	getUsers,
	listPostComments,
	createNewComment,
};
