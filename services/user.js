import axios from 'axios';

import * as c from './constant';

import { handler } from './handler';

export async function login(data) {
	try {
		let res = await axios.post(c.LOGIN, data);

		return res.data;
	} catch (e) {
		throw handler(e);
	}
}

export async function register(data) {
	try {
		let res = await axios.post(c.REGISTER, data);

		return res.data;
	} catch (e) {
		throw handler(e);
	}
}

export async function loginJWT(data) {
	try {
		let res = await axios.post(c.LOGINJWT,data);

		return res.data;
	} catch (e) {
		throw handler(e);
	}
}

export async function addTags(data) {
	try {
		console.log("add tags")
		let res = await axios.patch(`${c.USER}/addTags`,data);

		return res.data;
	} catch (e) {
		throw handler(e);
	}
}
