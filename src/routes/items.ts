import express, { Request, Response } from "express";
import Item, { IItem } from "../models/item";
import { auth } from "../middleware/auth";
import Joi from "joi";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);

    console.log("items", items);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const newItemSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),

  description: Joi.string().required(),

  price: Joi.number().required(),

  imageUrl: Joi.string().required(),
});

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const { error } = newItemSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    });

    const newItem: IItem = await item.save();
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
