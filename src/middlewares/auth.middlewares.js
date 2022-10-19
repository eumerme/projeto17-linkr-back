import {connection} from '../database/db.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { signUpSchema } from '../schemas/schemas.js';

async function validateRegister(req, res, next){
    const { email } = req.body;
    try {
        const validation = signUpSchema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
            return;
        }
        
        const emailExist = (await connection.query(`
            SELECT * FROM users WHERE email = $1;
        `, [email])).rows;
        if(emailExist.length !== 0) return res.sendStatus(STATUS_CODE.CONFLICT);

        next();
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export {validateRegister};