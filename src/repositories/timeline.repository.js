import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function publishNewPost(userId, comment, url) {
	return connection.query(
		`INSERT INTO ${TABLE.POSTS} ("userId", text, url) VALUES ($1, $2, $3);`,
		[userId, comment, url]
	);
}

async function listPost() {
	return connection.query(
		`SELECT posts.id,
    posts.text, 
    posts.url,
    users.name,
    users."imageUrl"
    FROM posts
    JOIN users ON posts."userId" = users.id
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`
	);
}

async function getUsers() {
	return connection.query(`SELECT id, name, "imageUrl" FROM ${TABLE.USERS};`);
}

export { publishNewPost, listPost, getUsers };
