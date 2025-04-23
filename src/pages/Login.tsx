
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function Login() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await signIn(values.email, values.password);

      if (error) {
        toast({
          title: "Erro ao entrar",
          description: error.message || "Email ou senha incorretos.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login realizado",
        description: "Você entrou com sucesso!",
      });

      navigate(from);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao entrar",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Entrar</h1>
          <p className="text-gray-500 mt-2">
            Entre na sua conta para registrar suas entregas de reciclagem
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu.email@unama.br" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-gray-500">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-green-500 hover:text-green-600 font-medium"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
