import { useForm } from "react-hook-form";
import { TLogin, loginSchema } from "./validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { login } = useAuth();
  
  const { register, handleSubmit } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(login)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />

        <button type="submit">Entrar</button>
      </form>
    </>
  );
};
