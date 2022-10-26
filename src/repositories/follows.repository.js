import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function selectFollower(userId, followeeId) {
	return connection.query(
		`SELECT * FROM follows WHERE "userId" = $1 AND "followeeId" = $2;`,
		[userId, followeeId]
	);
}

async function follow(userId, followeeId) {
	return connection.query(
		`INSERT INTO follows ("userId", "followeeId") VALUES ($1, $2);`,
		[userId, followeeId]
	);
}

async function unfollow(userId, followeeId) {
	return connection.query(
		`DELETE FROM follows WHERE "userId" = $1 AND "followeeId" = $2;`,
		[userId, followeeId]
	);
}

async function checkUserFollows(userId) {
	return connection.query(`SELECT * FROM follows WHERE "userId" = $1;`, [
		userId,
	]);
}

export { selectFollower, follow, unfollow, checkUserFollows };
