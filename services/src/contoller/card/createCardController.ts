import { Request, Response } from "express";
import DeckModel from "../../Schema/Deck";
export async function createCardController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId)
  if (!deck) return res.status(400).send("No deck of this id found")
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save()
  res.json(deck)
}
