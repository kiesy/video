import { z } from 'zod';

const DealSchema = z.object({
  brand: z.string().optional().nullable(), // Allows the brand to be optional and nullable
  name: z.string(),
  packageSize: z.string(),
  price: z.number(),
  salePrice: z.number(),
  productImage: z.string().url(), // Validates that the productImage is a valid URL
});

// Define the schema for the full data structure expected in props

const DealDataIndividual = z.array(DealSchema)

export const FullDealSchema = z.object({
  dealsData: z.array(DealSchema), // An array of deals
  storeName: z.string() // The store name as a string
});


export type DealDataIndividualType = z.infer<typeof DealDataIndividual>
export type DealType = z.infer<typeof DealSchema>;
export type FullDealType = z.infer<typeof FullDealSchema>;