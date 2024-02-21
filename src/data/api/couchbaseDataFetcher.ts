// couchbaseDataFetcher.ts
import axios from "axios"
import { RequestParameters } from "../../types/koreTypes"

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchAllCouchbaseData = async (params: RequestParameters) => {
  try {
    const response = await axios.post(`${baseURL}/cb/getall`, params)

    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch couchbase id/date data -> ${error}`)
  }
}

export const getCouchbaseDataByID = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/cb/${id}`)

    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch couchbase id/date data -> ${error}`)
  }
}

export const deleteCouchbaseDataByID = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/cb/${id}`)

    return response.data
  } catch (error) {
    throw new Error(`Failed to delete couchbase id/date data -> ${error}`)
  }
}
