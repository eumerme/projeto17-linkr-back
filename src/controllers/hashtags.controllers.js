import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

const listPostHashtag = async (req, res) => {
  const { hashtagName } = req.params;

  try {
    const result = await hashtagsRepository.listPostbyHashtag(hashtagName);
    res.status(STATUS_CODE.OK).send(result.rows);
    return;
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    return;
  }
};

export { listPostHashtag };
