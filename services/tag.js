import axios from 'axios';

import * as c from './constant';

import { handler } from './handler';

export async function newTag(data) {
	try {
		let res = await axios.post(c.TAG, data);

		return res.data;
	} catch (e) {
		console.log(e);
		throw handler(e);
	}
}


export async function getTags() {
	try {
		let res = await axios.get(`${c.TAG}/all`);

		return res.data;
	} catch (e) {
		console.log(e);
		throw handler(e);
	}
}

export async function deleteTag(id) {
	try {
		let res = await axios.delete(`${c.TAG}/${id}`);

		return res.data;
	} catch (e) {
		console.log(e);
		throw handler(e);
	}
}
