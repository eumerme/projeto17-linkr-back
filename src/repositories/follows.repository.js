import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function selectFollower(userId, followeeId) {
	return connection.query(
		`SELECT * FROM follows WHERE "userId" = $1 AND "followeeId" = $2;`,
		[userId, followeeId]
	);
}

export { selectFollower };
