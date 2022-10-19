import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from './routers/index.js';
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(router);

server.listen(process.env.PORT, () =>
	console.log(`Server is listening on port ${process.env.PORT}`)
);
