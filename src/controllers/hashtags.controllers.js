import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

const listHashtags = async (req, res) => {
  try {
    const result = await hashtagsRepository.listHashtags();
    res.status(STATUS_CODE.OK).send(result.rows);
    return;
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    return;
  }
};

const listPostHashtag = async (req, res) => {
  const { hashtagName } = req.params;
  try {
    const result = await hashtagsRepository.listPostbyHashtag(hashtagName);
    res.status(STATUS_CODE.OK).send(result.rows);
    return;
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR);
    return;
  }
};

const createHashtag = async (req, res, next) => {
  const { hashtagText } = req.body;

  try {
    const { rows: hashtagExists } = await hashtagsRepository.selectHashtag(
      hashtagText
    );
    if (hashtagExists.length === 0) {
      await hashtagsRepository.insertHashtag(hashtagText);
    }
    next();
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR);
  }
};

export { listPostHashtag, listHashtags, createHashtag };
