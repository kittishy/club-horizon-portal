import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "validation.email.invalid" }).min(1, { message: "validation.email.required" }),
  password: z.string().min(1, { message: "validation.password.required" }),
  // Em um cenário real, a senha teria requisitos de complexidade
  // .min(8, { message: "Password must be at least 8 characters long" })
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" })
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "validation.name.required" }),
  email: z.string().email({ message: "validation.email.invalid" }).min(1, { message: "validation.email.required" }),
  password: z.string().min(6, { message: "validation.password.minLength:6" }), // Exemplo de tamanho mínimo
  confirmPassword: z.string().min(1, { message: "validation.confirmPassword.required" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "auth.passwordMismatch",
  path: ["confirmPassword"], // Campo onde o erro será exibido
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

// Esquema para edição de perfil
export const EditProfileSchema = z.object({
  name: z.string().min(1, { message: "validation.name.required" }),
  // Email pode ser incluído se você decidir torná-lo editável, 
  // mas geralmente é mais complexo devido à verificação.
  // email: z.string().email({ message: "validation.email.invalid" }).min(1, { message: "validation.email.required" }),
});

export type EditProfileFormData = z.infer<typeof EditProfileSchema>; 