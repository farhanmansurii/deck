import axios from "axios"

export async function getdecks() {
  const response = axios.get('http://localhost:5000/deck')
  return response
}
