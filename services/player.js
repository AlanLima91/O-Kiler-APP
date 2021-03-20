import axiosAPI from './axiosAPI'

import { handler } from './handler'

export async function getAllGamePlay () {
  try {
    const res = await axiosAPI.get('players')

    return res.data
  } catch (e) {
    throw handler(e)
  }
}
