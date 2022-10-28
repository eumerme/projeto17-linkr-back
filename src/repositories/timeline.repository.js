import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function publishNewPost(userId, comment, url) {
  return connection.query(
    `INSERT INTO ${TABLE.POSTS} ("userId", text, url) VALUES ($1, $2, $3);`,
    [userId, comment, url]
  );
}

async function listPost(userId) {
  return connection.query(
    `SELECT posts.text,
			posts.id, 
			posts."userId",
			posts.url,
      posts."createdAt",
			users.name,
			users."imageUrl"
		FROM follows 
		JOIN posts ON follows."followeeId" = posts."userId"
			OR follows."userId" = posts."userId"
		JOIN users ON posts."userId" = users.id
		WHERE follows."userId" = $1
    GROUP BY posts.id,
			users.name,
			users."imageUrl"
		ORDER BY posts."createdAt" DESC;`,
    [userId]
  );
}

function updateLikes(id, userId, type) {
  if (type === "like") {
    connection.query(
      `INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
      [userId, id]
    );
  } else {
    connection.query(
      `DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2;`,
      [userId, id]
    );
  }
}

async function findPost(id) {
  return connection.query(`SELECT * FROM ${TABLE.POSTS} WHERE id = $1`, [id]);
}

async function editPostText(comment, id) {
  return connection.query(
    `UPDATE ${TABLE.POSTS} SET text = $1 WHERE id = $2;`,
    [comment, id]
  );
}

async function deleteFatalPost(id) {

  connection.query(`DELETE FROM ${TABLE.LIKES} WHERE "postId" = $1;`, [id]);
  const result = (await connection.query(`
    SELECT * FROM ${TABLE.POSTS} WHERE id = $1;
  `, [id])).rows[0];
  connection.query(`DELETE FROM ${TABLE.POSTS} WHERE id = $1;`, [id]);

  return result.repostBy;
}

async function deteleRepost(id){
  return connection.query(`
    DELETE FROM reposts WHERE id = $1;`
  , [id]);
}

async function likes(id) {
  return connection.query(
    `
    SELECT COUNT(likes."postId") AS likes,
    json_agg(users.name) AS "likeBy",
    json_agg(likes."userId") AS "users"
    FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE likes."postId" = $1;
  `,
    [id]
  );
}

async function getUserPosts(id) {
  return connection.query(
    `SELECT posts.text,
			posts.id, 
			posts."userId",
			posts.url,
      posts."createdAt",
			users.name,
			users."imageUrl"
		FROM posts
		JOIN users ON posts."userId" = users.id
		WHERE users.id = $1
		ORDER BY posts."createdAt" DESC;`,
    [id]
  );
}

async function listPostComments(userId, postId) {
  return connection.query(
    `SELECT comments.comment, comments."userId" as "commentUserId", users.name, users."imageUrl", posts."userId" as "postUserId", follows."followeeId" AS "followee" FROM comments JOIN users ON users.id = comments."userId" JOIN posts ON comments."postId" = posts.id FULL JOIN follows ON comments."userId" = (SELECT follows."followeeId" FROM follows JOIN comments ON comments."userId" = follows."followeeId" WHERE follows."userId" = $1 LIMIT 1) WHERE posts.id = $2 ORDER BY comments."createdAt" DESC;`,
    [userId, postId]
  );
}

async function createNewComment(comment, postId, userId) {
  return connection.query(
    `INSERT INTO ${TABLE.COMMENTS} (comment, "postId", "userId") VALUES ($1, $2, $3)`,
    [comment, postId, userId]
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

async function listUserNotFollowing() {
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
					GROUP BY users.id);`
  );
}

async function createNewRepost(postId, userId){

  await connection.query(
    `INSERT INTO ${TABLE.REPOSTS} ("userId", "postId") VALUES ($1, $2);`
  , [userId, postId]);

  const result = (await connection.query(`
    SELECT reposts.id AS "repostId",
    reposts."userId",
    posts.id,
    posts.text,
    posts.url,
    users.name
    FROM reposts 
    JOIN posts ON posts.id=reposts."postId"
    JOIN users on posts."userId"=users.id
    WHERE reposts.id = (SELECT MAX(reposts.id) FROM reposts);
  `)).rows[0];
  
  connection.query(`
    INSERT INTO ${TABLE.POSTS} ("userId", text, url, "repostBy") VALUES ($1, $2, $3, $4);`
  , [result.userId, result.text, result.url, result.repostId]);
};

async function countReposts(id){
  return connection.query(
    `SELECT COUNT("postId") AS "countReposts"
      FROM reposts 
      WHERE "postId" = $1;`
  , [id]);
};

async function listPostInterval(limit) {
  return connection.query(
    `SELECT COUNT(id) AS "allPosts" FROM posts WHERE "createdAt" > $1;`,
    [limit]
  );
}

async function getUserReposts(id){
  return connection.query(`
    SELECT reposts.*, 
    "u1".name AS "nameRepost",
    "u1"."imageUrl" AS "imageUrl",
    posts.text,
    posts."userId" AS "userPost",
    posts.url,
    "u2".name AS "namePost"
    FROM reposts
    JOIN users "u1" ON reposts."userId"="u1".id
    JOIN posts ON reposts."postId"=posts.id
    JOIN users "u2" ON posts."userId"="u2".id
    WHERE "u1".id = $1
    ORDER BY reposts."createdAt" DESC;
  `, [id]);
}


async function getListRepost(id){
  return connection.query(`
    SELECT reposts.*, 
    "u1".name AS "nameRepost",
    "u1"."imageUrl" AS "imageUrl",
    posts.text,
    posts."userId" AS "userPost",
    posts.url,
    "u2".name AS "namePost"
    FROM follows 
    JOIN reposts ON follows."followeeId" = reposts."userId"
    OR follows."userId" = reposts."userId"
    JOIN users "u1" ON reposts."userId"="u1".id
    JOIN posts ON reposts."postId"=posts.id
    JOIN users "u2" ON posts."userId"="u2".id
    WHERE "u1".id = $1
    ORDER BY reposts."createdAt" DESC;
  `, [id]);
};

export {
  publishNewPost,
  updateLikes,
  listPost,
  listPostInterval,
  editPostText,
  deleteFatalPost,
  likes,
  findPost,
  getUserPosts,
  listPostComments,
  createNewComment,
  createNewRepost,
  countReposts,
  listUserFollowing,
  listUserNotFollowing,
  deteleRepost,
  getUserReposts,
  getListRepost
};
