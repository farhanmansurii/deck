import { Request, Response } from "express";
import DeckModel from "../../Schema/Deck";
export async function deleteCardController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const index = req.params.index
  const deck = await DeckModel.findById(deckId)
  if (!deck) return res.status(400).send("No deck of this id found")
  deck.cards.splice(parseInt(index), 1);
  await deck.save()
  res.json(deck)
}
