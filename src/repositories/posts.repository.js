import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function insertPost({
	userId,
	comment,
	url,
	urlTitle,
	urlImage,
	urlDescription,
}) {
	return connection.query(
		`INSERT INTO ${TABLE.POSTS} ("userId", text, url, "urlTitle", "urlImage", "urlDescription") 
        VALUES ($1, $2, $3, $4, $5, $6);`,
		[userId, comment, url, urlTitle, urlImage, urlDescription]
	);
}

async function listUserPosts(id) {
	return connection.query(
		`SELECT ${TABLE.POSTS}.text
            , ${TABLE.POSTS}.id
            , ${TABLE.POSTS}."userId"
            , ${TABLE.POSTS}.url
            , ${TABLE.POSTS}."urlTitle"
            , ${TABLE.POSTS}."urlImage"
            , ${TABLE.POSTS}."urlDescription"
            , ${TABLE.USERS}.name
            , ${TABLE.USERS}."imageUrl"
		FROM ${TABLE.POSTS}
		JOIN ${TABLE.USERS} ON ${TABLE.POSTS}."userId" = ${TABLE.USERS}.id
		WHERE ${TABLE.USERS}.id = $1
		ORDER BY ${TABLE.POSTS}."createdAt" DESC;`,
		[id]
	);
}

async function listAllPosts(userId) {
	return connection.query(
		`SELECT ${TABLE.POSTS}.text
            , ${TABLE.POSTS}.id
            , ${TABLE.POSTS}."userId"
            , ${TABLE.POSTS}.url
            , ${TABLE.POSTS}."urlTitle"
            , ${TABLE.POSTS}."urlImage"
            , ${TABLE.POSTS}."urlDescription"
            , ${TABLE.USERS}.name
            , ${TABLE.USERS}."imageUrl"
        FROM ${TABLE.FOLLOWS} 
        JOIN ${TABLE.POSTS} ON ${TABLE.FOLLOWS}."followeeId" = ${TABLE.POSTS}."userId"
            OR ${TABLE.FOLLOWS}."userId" = ${TABLE.POSTS}."userId"
        JOIN ${TABLE.USERS} ON ${TABLE.POSTS}."userId" = ${TABLE.USERS}.id
        WHERE ${TABLE.FOLLOWS}."userId" = $1
        GROUP BY ${TABLE.POSTS}.id,
            ${TABLE.USERS}.name,
            ${TABLE.USERS}."imageUrl"
        ORDER BY ${TABLE.POSTS}."createdAt" DESC;`,
		[userId]
	);
}

async function selectPostById(id) {
	return connection.query(`SELECT * FROM ${TABLE.POSTS} WHERE id = $1;`, [id]);
}

async function editPostText(comment, id) {
	return connection.query(
		`UPDATE ${TABLE.POSTS} SET text = $1 WHERE id = $2;`,
		[comment, id]
	);
}
async function deletePost(id) {
	return connection.query(`DELETE FROM ${TABLE.POSTS} WHERE id = $1;`, [id]);
}

export {
	insertPost,
	listUserPosts,
	listAllPosts,
	selectPostById,
	editPostText,
	deletePost,
};
