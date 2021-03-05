
import { ItemType } from '../types/item';
import { knex } from '../db/pg';
import { tableName } from "../constants";

export const listAll = async () => {
	const list = await knex(tableName).select();
	return list;
		// .where({ userId })
}

// const getById = async (userId: string) => {
// 	if (!userId) {
// 		throw new Error('User id must be provided')
// 	}
// 	const list = await knex(tableName)
// 		.select()
// 		.where({ userId });

// 	return list[0];
// }

export const create = async (userId: string, item: ItemType) => {
	if (!userId) {
		throw new Error('User id must be provided')
	}
	let { name, four, six, eight } = item;

	const list = await knex(tableName)
		.insert({ name, four, six, eight, userId })
		.returning("*");

	return list[0];
}
export const update = async (userId: string, item: ItemType) => {
	let { four, six, eight } = item;

	const [userScore] = await knex(tableName).select().where({ userId });
	let newScore = [four, six, eight];

	newScore = [
		userScore.four,
		userScore.six,
		userScore.eight,
	].map((score, i) => (score < newScore[i] ? newScore[i] : score));

	[four, six, eight] = newScore;

	const list = await knex(tableName)
		.update({ four, six, eight })
		.where({ userId })
		.returning("*");

	return list[0];
}
// const remove = async (userId: string, id: string) => {
// 	if (!userId) {
// 		throw new Error('User id must be provided')
// 	}
// 	if (!id) return;
// 	await knex(tableName)
// 		.delete()
// 		.where({ id, userId });
// }

