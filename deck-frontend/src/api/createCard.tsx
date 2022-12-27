import { API_URL } from './config'
import { TDeck } from './getDecks'

export async function createCard(deckId: string, text: string | undefined): Promise<TDeck> {
  const response = await fetch(`${API_URL}/${deckId}/card`, {
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
