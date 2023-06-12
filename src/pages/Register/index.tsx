import { useForm } from "react-hook-form";
import { TRegister, registerSchema } from "./validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/useUser";

export const Register = () => {
  const {createUser} = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(createUser)}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" {...register("name")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="phone">Telefone</label>
        <input type="text" id="phone" {...register("phone")} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && errors.password.message}

        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
          id="comfirnPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && errors.confirmPassword.message}

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};
