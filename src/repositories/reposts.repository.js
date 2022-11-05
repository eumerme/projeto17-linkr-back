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

async function getAllReposts(userId) {
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

export { insertRepost, getUserReposts, getAllReposts };
