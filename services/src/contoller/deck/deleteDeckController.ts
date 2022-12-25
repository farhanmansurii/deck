import { Request, Response } from "express";
import DeckModel from "../../Schema/Deck";

export async function deleteDeckController(req: Request, res: Response) {

  const deckId = req.params.deckId
  const deck = await DeckModel.findByIdAndDelete(deckId)
  res.json(deck)

}
