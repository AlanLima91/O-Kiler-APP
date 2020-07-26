import axios from 'axios'

import * as c from './constant'

import { handler } from './handler'

export async function newQuestion (data) {
  try {
    const res = await axios.post(c.QUESTION, data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function getAllQuestion (limit) {
  try {
    const res = await axios.get(`${c.QUESTION}/all/${limit}`)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}
