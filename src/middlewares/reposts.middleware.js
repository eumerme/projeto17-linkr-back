import { STATUS_CODE } from "../enums/status.code.js";
import * as postsRepository from "../repositories/posts.repository.js";
import * as repostsRepository from "../repositories/reposts.repository.js";

async function validateRepost(req, res, next) {
	const { path } = req.route;

	try {
		let reposts;

		if (path === "/posts") {
			const { userId, followSomeone } = res.locals;
			if (followSomeone === false) {
				reposts = (await repostsRepository.getUserReposts(userId)).rows;
			} else {
				reposts = (await repostsRepository.getAllRepostsFromFollows(userId))
					.rows;
			}
		}

		if (path === "/url/:id") {
			const { id } = req.params;
			reposts = (await repostsRepository.getUserReposts(id)).rows;
		}

		if (path === "/hashtags/:hashtagName") {
			const { hashtagName } = req.params;
			reposts = (await repostsRepository.getAllRepostsFromHashtags(hashtagName))
				.rows;
		}

		if (reposts.length !== 0) {
			const allReposts = [];
			await Promise.all(
				reposts.map(async (value) => {
					const post = (await postsRepository.selectPostById(value.postId))
						.rows[0];
					post.createdAt = value.createdAt;
					post.repost = {
						isRepost: true,
						repostedById: value.repostBy,
						repostedByName: value.name,
					};

					allReposts.push(post);
				})
			);

			res.locals.existRepost = true;
			res.locals.reposts = allReposts;
		}

		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

export { validateRepost };
