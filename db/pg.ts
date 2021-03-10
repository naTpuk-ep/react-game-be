import * as knexInit from 'knex';
import * as initEnv from 'dotenv';
initEnv.config();
import { ConnectionString } from "connection-string";

const {
	PG_PASSWORD,
	PG_USERNAME,
	PG_HOST,
	PG_DBNAME,
	DATABASE_URL,
} = process.env;

const url = DATABASE_URL
	? `${DATABASE_URL}`
	: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}/${PG_DBNAME}`;


const cnObj = new ConnectionString(url);

const cn = {
	host: cnObj.hostname,
	port: cnObj.port,
	database: cnObj.path?.[0],
	user: cnObj.user,
	password: cnObj.password,
	ssl: {
		rejectUnauthorized: false,
	},
};

const knex = knexInit({
	client: "pg",
	connection: cn,
	debug: true,
});

export {knex};