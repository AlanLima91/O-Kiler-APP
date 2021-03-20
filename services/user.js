import axiosAPI from './axiosAPI'

import { handler } from './handler'

export async function login (data) {
  try {
    const res = await axiosAPI.post('login', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function register (data) {
  try {
    const res = await axiosAPI.post('register', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function loginJWT (data) {
  try {
    const res = await axiosAPI.post('loginjwt', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}
