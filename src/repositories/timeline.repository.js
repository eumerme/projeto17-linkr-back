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
    posts."userId",
    posts.url,
    users.name,
    users."imageUrl"
    FROM posts
    JOIN users ON posts."userId" = users.id
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`
  );
}

function updateLikes(id, userId, type){
  if(type === 'like') connection.query(`
    INSERT INTO likes ("userId", "postId") VALUES ($1, $2);
    `, [userId, id]);
  else connection.query(`DELETE FROM likes WHERE "userId" = $1;`, [userId]);
}

async function editPostText(comment, id) {
  return connection.query(
    `UPDATE ${TABLE.POSTS} SET text = $1 WHERE id = $2;`,
    [comment, id]
  );
}

async function deleteFatalPost(id) {
  return connection.query(`DELETE FROM ${TABLE.POSTS} WHERE id = $1;`, [id]);
}

async function likes(id){
  return connection.query(`
    SELECT COUNT(likes."postId") AS likes,
    json_agg(users.name) AS "likeBy",
    json_agg(likes."userId") AS "users"
    FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE likes."postId" = $1;
  `, [id]);
}

export { publishNewPost, updateLikes, listPost, editPostText, deleteFatalPost, likes };
