import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z
    .string()
    .regex(/(?=.*\d)/, "Sua senha deve conter ao menos um dígito")
    .regex(/(?=.*[a-z])/, "Sua senha deve conter ao menos uma letra minúscula")
    .regex(/(?=.*[A-Z])/, "Sua senha deve conter ao menos uma letra maiúscula")
    .regex(
      /(?=.*[$*&,.@#])/,
      "Sua senha deve conter ao menos um caractere especial"
    ),
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});


export type TRegister = z.infer<typeof registerSchema>;
