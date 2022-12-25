import { Request, Response } from "express";
import DeckModel from "../../Schema/Deck";
export async function getCardController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId)
  res.json(deck)
}
