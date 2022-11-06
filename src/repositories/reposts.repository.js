import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function insertRepost(userId, postId) {
	return connection.query(
		`INSERT INTO ${TABLE.REPOSTS} ("repostBy", "postId") VALUES ($1, $2);`,
		[userId, postId]
	);
}

async function getUserReposts(userId) {
	return connection.query(
		`SELECT ${TABLE.REPOSTS}."repostBy" 
			, ${TABLE.USERS}.name
			, ${TABLE.REPOSTS}."postId"
			, ${TABLE.REPOSTS}."createdAt"
		FROM ${TABLE.REPOSTS}
		JOIN ${TABLE.USERS} ON ${TABLE.REPOSTS}."repostBy" = ${TABLE.USERS}.id
		WHERE ${TABLE.REPOSTS}."repostBy" = $1
		ORDER BY ${TABLE.REPOSTS}."createdAt" DESC;`,
		[userId]
	);
}

async function getAllRepostsFromFollows(userId) {
	return connection.query(
		`SELECT ${TABLE.REPOSTS}."repostBy" 
			, ${TABLE.USERS}.name
			, ${TABLE.REPOSTS}."postId"
			, ${TABLE.REPOSTS}."createdAt"
		FROM ${TABLE.FOLLOWS}
		JOIN ${TABLE.REPOSTS} ON ${TABLE.FOLLOWS}."followeeId" = ${TABLE.REPOSTS}."repostBy"
			OR ${TABLE.FOLLOWS}."userId" = ${TABLE.REPOSTS}."repostBy"
		JOIN ${TABLE.USERS} ON ${TABLE.REPOSTS}."repostBy" = ${TABLE.USERS}.id
		WHERE ${TABLE.FOLLOWS}."userId" = $1
		GROUP BY ${TABLE.REPOSTS}."repostBy" 
			, ${TABLE.REPOSTS}."postId"
			, ${TABLE.REPOSTS}."createdAt"
			, ${TABLE.USERS}.name
		ORDER BY ${TABLE.REPOSTS}."createdAt" DESC;`,
		[userId]
	);
}

async function getAllRepostsFromHashtags(hashtagName) {
	return connection.query(
		`SELECT reposts."repostBy" 
			, users.name
			, reposts."postId"
			, reposts."createdAt"
		FROM reposts
		JOIN users ON reposts."repostBy" = users.id
		JOIN "hashtagsPosts" ON reposts."postId" = "hashtagsPosts"."postId"
		JOIN hashtags ON hashtags.id = "hashtagsPosts"."hashtagId"
		WHERE hashtags.name = $1;`,
		[hashtagName]
	);
}

async function selectRepost(id) {
	return connection.query(
		`SELECT ${TABLE.REPOSTS}."repostBy" 
			, ${TABLE.REPOSTS}."postId"
		FROM ${TABLE.REPOSTS}
		JOIN ${TABLE.POSTS} ON ${TABLE.POSTS}.id = ${TABLE.REPOSTS}."postId"
		WHERE ${TABLE.REPOSTS}."postId" = $1;`,
		[id]
	);
}

async function deletePostsReposts(repostBy, postId) {
	return connection.query(
		`DELETE FROM ${TABLE.REPOSTS}
		WHERE ${TABLE.REPOSTS}."repostBy" = $1 AND ${TABLE.REPOSTS}."postId" = $2;`,
		[repostBy, postId]
	);
}

export {
	insertRepost,
	getUserReposts,
	getAllRepostsFromFollows,
	getAllRepostsFromHashtags,
	selectRepost,
	deletePostsReposts,
};
