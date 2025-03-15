import { z } from "zod";

export const createShopValidation = z.object({
  shopName: z.string().min(1, "Shop name is required."),
  businessLicenseNumber: z
    .string()
    .min(1, "Business license number is required."),
  address: z.string().min(1, "Address is required."),
  contactNumber: z.string().min(1, "Contact number is required."),
  website: z.string().url("Invalid URL format.").optional().or(z.literal("")),

  user: z.string().min(1, "User ID is required."),

  servicesOffered: z.union([
    z.string().min(1, "At least one service must be provided."), // If it's a comma-separated string
    z.array(z.string()).min(1, "At least one service must be provided."), // If it's an array
  ]),

  ratings: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, "Ratings cannot be less than 0.")
      .max(5, "Ratings cannot exceed 5.")
      .default(0)
  ),

  establishedYear: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1900, "Invalid year.")
      .max(new Date().getFullYear(), "Year cannot be in the future.")
  ),

  socialMediaLinks: z
    .object({
      facebook: z.string().url("Invalid Facebook URL.").optional(),
      twitter: z.string().url("Invalid Twitter URL.").optional(),
      instagram: z.string().url("Invalid Instagram URL.").optional(),
    })
    .partial()
    .optional(),

  taxIdentificationNumber: z
    .string()
    .min(1, "Tax identification number is required."),

  logo: z.string().url("Invalid logo URL.").min(1, "Logo is required."),

  isActive: z.boolean().default(true),
});
