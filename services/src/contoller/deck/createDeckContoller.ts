import { Request, Response } from "express";
import DeckModel from "../../Schema/Deck";

export async function createDeckController(req: Request, res: Response) {

  const newDeck = new DeckModel({
    title: req.body.title
  });
  const createdDeck = await newDeck.save()
  res.json(createdDeck)
}
