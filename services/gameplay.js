import axiosAPI from './axiosAPI'

import { handler } from './handler'

export async function newGamePlay (data) {
  try {
    const res = await axiosAPI.put('gameplays/new', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function joinedGamePlay (data) {
  try {
    const res = await axiosAPI.post('gameplays/joined', data)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function launchGamePlay (data) {
  try {
    const res = await axiosAPI.post('gameplays/started', data)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function getAllGamePlay () {
  try {
    const res = await axiosAPI.get('gameplays')

    return res.data
  } catch (e) {
    throw handler(e)
  }
}
