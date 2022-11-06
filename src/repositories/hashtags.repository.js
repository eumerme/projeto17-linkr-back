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

async function listPostbyHashtag(hashtagName) {
	return connection.query(
		`SELECT ${TABLE.POSTS}.*
            , ${TABLE.USERS}.name
            , ${TABLE.USERS}."imageUrl"
			, JSON_BUILD_OBJECT('isRepost', FALSE) AS repost
			, COUNT(${TABLE.REPOSTS}."postId") AS "repostsAmount"
		FROM ${TABLE.POSTS} 
		JOIN ${TABLE.USERS} ON ${TABLE.POSTS}."userId" = ${TABLE.USERS}.id 
		FULL JOIN ${TABLE.REPOSTS} ON posts.id = ${TABLE.REPOSTS}."postId"
		WHERE text LIKE $1 
		GROUP BY ${TABLE.POSTS}.id,
            ${TABLE.USERS}.name,
            ${TABLE.USERS}."imageUrl"
		ORDER BY ${TABLE.POSTS}."createdAt" DESC;`,
		[`%#${hashtagName}%`]
	);
}

async function insertHashtag(hashtag) {
	return connection.query(`INSERT INTO ${TABLE.HASHTAGS} (name) VALUES ($1);`, [
		hashtag,
	]);
}

async function selectHashtagByName(hashtag) {
	return connection.query(
		`SELECT id AS "hashtagId" FROM ${TABLE.HASHTAGS} WHERE name = $1;`,
		[hashtag]
	);
}

async function insertHashtagsPosts(postId, hashtagId) {
	return connection.query(
		`INSERT INTO "${TABLE.HASHTAGSPOSTS}" ("postId", "hashtagId") VALUES ($1, $2);`,
		[postId, hashtagId]
	);
}

async function selectHashtag(id) {
	return connection.query(
		`SELECT ${TABLE.HASHTAGS}.name
			,  ${TABLE.HASHTAGS}.id
		FROM "${TABLE.HASHTAGSPOSTS}"
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = "${TABLE.HASHTAGSPOSTS}"."postId"
		JOIN ${TABLE.HASHTAGS} ON ${TABLE.HASHTAGS}.id = "${TABLE.HASHTAGSPOSTS}"."hashtagId"
		WHERE ${TABLE.POSTS}.id = $1;`,
		[id]
	);
}

async function selectHashtagsPosts(hashtag) {
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
	return connection.query(
		`DELETE FROM "${TABLE.HASHTAGSPOSTS}" WHERE "postId" = $1;`,
		[id]
	);
}

async function deleteHashtag(id) {
	return connection.query(`DELETE FROM ${TABLE.HASHTAGS} WHERE id = $1;`, [id]);
}

export {
	listPostbyHashtag,
	listHashtags,
	insertHashtag,
	selectHashtag,
	insertHashtagsPosts,
	selectHashtagsPosts,
	selectHashtagByName,
	deleteHashtagsPosts,
	deleteHashtag,
};
