import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function selectFollower(userId, followeeId) {
	return connection.query(
		`SELECT * FROM ${TABLE.FOLLOWS} WHERE "userId" = $1 AND "followeeId" = $2;`,
		[userId, followeeId]
	);
}

async function follow(userId, followeeId) {
	return connection.query(
		`INSERT INTO ${TABLE.FOLLOWS} ("userId", "followeeId") VALUES ($1, $2);`,
		[userId, followeeId]
	);
}

async function unfollow(userId, followeeId) {
	return connection.query(
		`DELETE FROM ${TABLE.FOLLOWS} WHERE "userId" = $1 AND "followeeId" = $2;`,
		[userId, followeeId]
	);
}

async function checkUserFollows(userId) {
	return connection.query(
		`SELECT * FROM ${TABLE.FOLLOWS} WHERE "userId" = $1;`,
		[userId]
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

async function listUserNotFollowing(userId) {
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
				WHERE follows."userId" = $1
				GROUP BY users.id);`,
		[userId]
	);
}

export {
	selectFollower,
	follow,
	unfollow,
	checkUserFollows,
	listUserFollowing,
	listUserNotFollowing,
};
