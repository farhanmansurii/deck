import { Request, Response } from "express";
import DeckModel from "../../Schema/Deck";
export async function getDeckController(req: Request, res: Response) {
  const deck = await DeckModel.find()
  res.json(deck)
}
