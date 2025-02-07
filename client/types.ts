import { z } from 'zod';

const itemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number()
});

export const cartItemSchema = itemSchema.extend({
  quantity: z.number()
});

export const catalogItemSchema = cartItemSchema;

export const catalogItemsSchema = z.array(catalogItemSchema);

export const cartItemsSchema = z.array(cartItemSchema);

export const cartItemAddedSchema = z.object({
  product: catalogItemSchema,
  item: cartItemSchema
});

export type CartItem = z.infer<typeof cartItemSchema>;

export type CatalogItem = CartItem;

export const newItemSchema = catalogItemSchema.omit({
  _id: true
});

export type NewItem = z.infer<typeof newItemSchema>;
