import axios from 'axios'

import * as c from './constant'

import { handler } from './handler'

export async function newTag (data) {
  try {
    const res = await axios.post(c.TAG, data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function getTags () {
  try {
    const res = await axios.get(`${c.TAG}/all`)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function deleteTag (id) {
  try {
    const res = await axios.delete(`${c.TAG}/${id}`)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}
