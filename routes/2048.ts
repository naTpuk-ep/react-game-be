import { v4 as uuid } from "uuid";
import { Router } from "express";
import * as storage from "../storage/postgre";
import { knex } from "../db/pg";
import { table } from "console";
// import { auth } from "../middleware/auth";

const router = Router();

router.get("/", async (req, res, next) => {
	const list = await storage.listAll();
	res.json(list);
});

router.post('/', async (req, res, next) => {

		const { body } = req;

		const {
			body: { name },
		} = req;

	if (name.length < 4) {
		res.json({
			statusCode: 404,
			reason: "Name can't be less than 4",
		});
		return;
	}

	const [user] = await knex(storage.tableName).select().where({ name });

	if (user) {
		res.json({
			statusCode: 404,
			reason: `${name} already exist`,
		});
		return;
	}

	const userId = uuid();
  
  const newBody = await storage.create(
    userId, 
    body
  );
  res.json(newBody);
});



router.put('/', async (req, res, next) => {
  const {body} = req;

  const newBody = await storage.update(
    body.userId,
    {
      ...body,
    }
  );
  res.json(newBody);
});



export default router;