import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function listHashtags() {
	return connection.query(`SELECT * FROM ${TABLE.HASHTAGS};`);
}

async function listPostbyHashtag(text) {
	const newText = `%${text}%`;
	return connection.query(
		`SELECT posts.text, posts.url, users.name, users."imageUrl" FROM ${TABLE.POSTS} JOIN ${TABLE.USERS} ON posts."userId" = users.id WHERE text LIKE $1 ORDER BY posts."createdAt" DESC LIMIT 20;`,
		[newText]
	);
}

async function insertHashtag(hashtag) {
	return connection.query(`INSERT INTO ${TABLE.HASHTAGS} (name) VALUES ($1);`, [
		hashtag,
	]);
}

async function selectHashtag(hashtag) {
	return connection.query(`SELECT * FROM ${TABLE.HASHTAGS} WHERE name = $1;`, [
		hashtag,
	]);
}

export { listPostbyHashtag, listHashtags, insertHashtag, selectHashtag };
