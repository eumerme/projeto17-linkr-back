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
    `SELECT posts.id, 
    posts.text, 
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

function updateLikes(id, like, type){
  if(type === 'like') connection.query(`UPDATE posts SET likes = $1 WHERE id = $2;`, [like+1, id]);
  else connection.query(`UPDATE posts SET likes = $1 WHERE posts.id = $2;`, [like-1, id]);
}


export { publishNewPost, listPost, updateLikes };
