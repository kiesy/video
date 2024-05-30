
import { z } from 'zod';

export const DealFlowObject = z.object({
  name: z.string(),
  packageSize: z.string(),
  price: z.number(),
  salePrice: z.number(),
  productImage: z.string().url(), // Image URL validator
});

export const ParentObject = z.object({
  deals: z.array(DealFlowObject),
});

export type DealFlowObjectType = z.infer<typeof DealFlowObject>;
export type ParentObjectType = z.infer<typeof ParentObject>;