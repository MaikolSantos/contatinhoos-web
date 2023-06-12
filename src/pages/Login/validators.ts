import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().nonempty(),
});

export type TLogin = z.infer<typeof loginSchema>;
