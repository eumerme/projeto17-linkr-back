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
		`SELECT ${TABLE.USERS}.id,
			${TABLE.USERS}.name,
			${TABLE.USERS}."imageUrl",
			JSON_BUILD_OBJECT('following', TRUE) AS follow
		FROM ${TABLE.FOLLOWS}
		JOIN ${TABLE.USERS} ON ${TABLE.FOLLOWS}."followeeId" = ${TABLE.USERS}.id
		WHERE ${TABLE.FOLLOWS}."userId" = $1;`,
		[userId]
	);
}

async function listUserNotFollowing(userId) {
	return connection.query(
		`SELECT ${TABLE.USERS}.id,
			${TABLE.USERS}.name,
			${TABLE.USERS}."imageUrl",
			JSON_BUILD_OBJECT('following', FALSE) AS follow
		FROM ${TABLE.USERS}
		WHERE ${TABLE.USERS}.id NOT IN
				(SELECT ${TABLE.USERS}.id
				FROM ${TABLE.USERS}
				JOIN ${TABLE.FOLLOWS} ON ${TABLE.FOLLOWS}."followeeId" = ${TABLE.USERS}.id
				WHERE ${TABLE.FOLLOWS}."userId" = $1
				GROUP BY ${TABLE.USERS}.id);`,
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
