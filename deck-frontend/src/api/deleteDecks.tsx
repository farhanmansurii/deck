import { API_URL } from './config'

export async function deleteDeck(deckId: string) {
  await fetch(`${API_URL}/${deckId}`, {
    method: 'DELETE',
  })
}
