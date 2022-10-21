import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function publishNewPost(userId, comment, url) {
  return connection.query(
    `INSERT INTO ${TABLE.POSTS} ("userId", text, url) VALUES ($1, $2, $3);`,
    [userId, comment, url]
  );
}

async function listPost() {
  return connection.query(
    `SELECT posts.text,
    posts.id, 
    posts.url,
    posts.likes,
    users.name,
    users."imageUrl"
    FROM posts
    JOIN users ON posts."userId" = users.id
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`
  );
}

async function editPostText(comment, id) {
  return connection.query(`UPDATE posts SET text = $1 WHERE id = $2;`, [
    comment,
    id,
  ]);
}

export { publishNewPost, listPost, editPostText };
