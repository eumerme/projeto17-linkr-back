import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function listHashtags() {
  return connection.query(`SELECT * FROM ${TABLE.HASHTAGS};`);
}

async function listPostbyHashtag(text) {
  const newText = `%${text}%`;
  return connection.query(
    `SELECT posts.text, posts.url, posts.likes, users.name, users."imageUrl" FROM ${TABLE.POSTS} JOIN ${TABLE.USERS} ON posts."userId" = users.id WHERE text LIKE $1 ORDER BY posts."createdAt" DESC LIMIT 20;`,
    [newText]
  );
}

export { listPostbyHashtag, listHashtags };
