import { API_URL } from './config'

export async function createDeck(title: string | undefined) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      title,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
