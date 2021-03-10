import * as knexInit from 'knex';
import * as initEnv from 'dotenv';
initEnv.config();

const {
	PG_PASSWORD,
	PG_USERNAME,
	PG_HOST,
	PG_DBNAME,
	DATABASE_URL,
} = process.env;

const url = DATABASE_URL
	? `${DATABASE_URL}?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory`
	: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}/${PG_DBNAME}`;

console.log("URL", url);


const knex = knexInit({
  client: 'pg',
	connection: url,
	debug: true,
});

export {knex};