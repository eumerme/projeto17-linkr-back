import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function register(name, email, passwordHash, imageUrl) {
	return connection.query(
		`INSERT INTO ${TABLE.USERS} (name, email, password, "imageUrl") VALUES ($1, $2, $3, $4);`,
		[name, email, passwordHash, imageUrl]
	);
}

async function verifyEmail(email) {
	return connection.query(`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`, [
		email,
	]);
}

async function selectUserToken(userId, token) {
	return connection.query(
		`SELECT * FROM ${TABLE.SESSIONS} WHERE "userId" = $1 AND token = $2 AND active = TRUE;`,
		[userId, token]
	);
}

async function inactivateToken(token) {
	return connection.query(
		`UPDATE ${TABLE.SESSIONS} SET active = FALSE WHERE token = $1;`,
		[token]
	);
}

async function insertUserIntoSessions(userId, token) {
	return connection.query(
		`INSERT INTO ${TABLE.SESSIONS} ("userId", token) VALUES ($1, $2);`,
		[userId, token]
	);
}

async function selectUserFromSessions(userId) {
	return connection.query(
		`SELECT * FROM ${TABLE.SESSIONS} WHERE "userId" = $1 AND active = TRUE;`,
		[userId]
	);
}

export {
	register,
	verifyEmail,
	selectUserToken,
	inactivateToken,
	insertUserIntoSessions,
	selectUserFromSessions,
};
