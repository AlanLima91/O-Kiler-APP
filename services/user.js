import axios from 'axios';

import * as c from './constants';

import { handler } from './handler';

export async function login(data) {
	try {
		let res = await axios.post(c.LOGIN, data);

		return res.data;
	} catch (e) {
		throw handler(e);
	}
}