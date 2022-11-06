import { STATUS_CODE } from "../enums/status.code.js";
import * as postsRepository from "../repositories/posts.repository.js";
import * as repostsRepository from "../repositories/reposts.repository.js";
import urlMetadata from "url-metadata";

async function publishPost(req, res) {
	const { userId } = res.locals;
	const { comment, url } = req.body;

	try {
		const urlmetadata = await urlMetadata(url);
		let body = { userId, comment, url };

		if (urlmetadata.title === null) {
			body = {
				...body,
				urlTitle: "Cannot load title information",
				urlImage: "https://cdn-icons-png.flaticon.com/512/3097/3097257.png",
				urlDescription: "Cannot load description information",
			};
		} else {
			body = {
				...body,
				urlTitle: urlmetadata.title,
				urlImage: urlmetadata.image,
				urlDescription: urlmetadata.description,
			};
		}

		await postsRepository.insertPost(body);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function listPosts(req, res) {
	const { userId, followSomeone, existRepost, reposts } = res.locals;

	try {
		if (followSomeone === false) {
			const { rows: userPosts } = await postsRepository.listUserPosts(userId);

			if (existRepost) {
				const posts = [...reposts, ...userPosts];
				await Promise.all(
					posts.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
				);
				return res.status(STATUS_CODE.OK).send({ followSomeone, posts });
			}

			return res
				.status(STATUS_CODE.OK)
				.send({ followSomeone, posts: userPosts });
		}

		const { rows: posts } = await postsRepository.listAllPosts(userId);

		if (existRepost) {
			const postsReposts = [...reposts, ...posts];
			await Promise.all(
				postsReposts.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
			);
			return res
				.status(STATUS_CODE.OK)
				.send({ followSomeone: true, posts: postsReposts });
		}

		return res.status(STATUS_CODE.OK).send({ followSomeone: true, posts });
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function listUserPosts(req, res) {
	const { id } = req.params;

	try {
		const { rows: posts } = await postsRepository.listUserPosts(id);
		return res.status(STATUS_CODE.OK).send(posts);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function updatePost(req, res) {
	const { comment } = req.body;
	const { id } = req.params;

	try {
		await postsRepository.editPostText(comment, id);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function deletePost(req, res) {
	const { id } = req.params;

	try {
		await postsRepository.deletePost(id);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { publishPost, listPosts, updatePost, deletePost, listUserPosts };
