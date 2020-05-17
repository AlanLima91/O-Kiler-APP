import axios from 'axios';

import * as c from './constant';

import { handler } from './handler';

export async function newQuestion(data) {
	try {
		let res = await axios.post(c.QUESTION, data);

		return res.data;
	} catch (e) {
		throw handler(e);
	}
}
