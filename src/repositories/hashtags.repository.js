import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function listHashtags() {
	return connection.query(`
	SELECT ${TABLE.HASHTAGS}.name
		, COUNT("${TABLE.HASHTAGSPOSTS}"."postId") AS amount
	FROM ${TABLE.HASHTAGS}
	JOIN "${TABLE.HASHTAGSPOSTS}" ON ${TABLE.HASHTAGS}.id = "${TABLE.HASHTAGSPOSTS}"."hashtagId"
	GROUP BY ${TABLE.HASHTAGS}.name
	ORDER BY amount DESC;
`);
}

async function listPostbyHashtag(text) {
	const newText = `%${text}%`;
	return connection.query(
		`SELECT posts.id, posts.text, posts."userId", posts.url, users.name, users."imageUrl" 
		FROM ${TABLE.POSTS} 
		JOIN ${TABLE.USERS} ON posts."userId" = users.id 
		WHERE text LIKE $1 
		ORDER BY posts."createdAt" DESC 
		LIMIT 20;`,
		[newText]
	);
}

async function insertHashtag(hashtag) {
	return connection.query(`INSERT INTO ${TABLE.HASHTAGS} (name) VALUES ($1);`, [
		hashtag,
	]);
}

async function selectHashtag(hashtag) {
	return connection.query(
		`SELECT id AS "hashtagId" FROM ${TABLE.HASHTAGS} WHERE name = $1;`,
		[hashtag]
	);
}

async function selectPostId(id) {
	return connection.query(
		`SELECT id AS "postId" FROM ${TABLE.POSTS} where "userId" = $1 ORDER BY "createdAt" DESC;`,
		[id]
	);
}

async function insertHashtagsPosts(postId, hashtagId) {
	return connection.query(
		`INSERT INTO "${TABLE.HASHTAGSPOSTS}" ("postId", "hashtagId") VALUES ($1, $2);`,
		[postId, hashtagId]
	);
}

async function selectHashtagName(id) {
	console.log("select is post", id);
	return connection.query(
		`SELECT ${TABLE.HASHTAGS}.name
		FROM "${TABLE.HASHTAGSPOSTS}"
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = "${TABLE.HASHTAGSPOSTS}"."postId"
		JOIN ${TABLE.HASHTAGS} ON ${TABLE.HASHTAGS}.id = "${TABLE.HASHTAGSPOSTS}"."hashtagId"
		WHERE ${TABLE.POSTS}.id = $1;`,
		[id]
	);
}

async function selectHashtagsPosts(hashtag) {
	console.log("select ", hashtag);
	return connection.query(
		`SELECT ${TABLE.HASHTAGS}.name
			, COUNT("${TABLE.HASHTAGSPOSTS}"."postId") AS amount
		FROM "${TABLE.HASHTAGSPOSTS}"
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = "${TABLE.HASHTAGSPOSTS}"."postId"
		JOIN ${TABLE.HASHTAGS} ON ${TABLE.HASHTAGS}.id = "${TABLE.HASHTAGSPOSTS}"."hashtagId"
		WHERE ${TABLE.HASHTAGS}.name = $1
		GROUP BY ${TABLE.HASHTAGS}.name;`,
		[hashtag]
	);
}

async function deleteHashtagsPosts(id) {
	return connection.query(`DELETE FROM "hashtagsPosts" WHERE "postId" = $1;`, [
		id,
	]);
}

async function deleteHashtags(hashtag) {
	return connection.query(`DELETE FROM hashtags WHERE name = $1;`, [hashtag]);
}

export {
	listPostbyHashtag,
	listHashtags,
	insertHashtag,
	selectHashtag,
	selectPostId,
	insertHashtagsPosts,
	selectHashtagsPosts,
	selectHashtagName,
	deleteHashtagsPosts,
	deleteHashtags,
};
