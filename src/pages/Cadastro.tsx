
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase, signUp, getTurmas } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { Turma } from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  matricula: z.string().min(5, "Matrícula inválida"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  turma_id: z.string().uuid("Selecione uma turma válida"),
  foto_url: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

export default function Cadastro() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      matricula: "",
      email: "",
      password: "",
      confirmPassword: "",
      turma_id: "",
      foto_url: "",
    },
  });

  useEffect(() => {
    async function loadTurmas() {
      try {
        const { data, error } = await getTurmas();
        
        if (error) throw error;
        
        if (data) {
          setTurmas(data);
        }
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as turmas disponíveis.",
          variant: "destructive",
        });
      }
    }

    loadTurmas();
  }, [toast]);

  const handleFotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFoto(true);
      
      // Create file preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `fotos/${fileName}`;

      const { data, error } = await supabase.storage
        .from('user-photos')
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: publicURL } = supabase.storage
        .from('user-photos')
        .getPublicUrl(filePath);

      form.setValue("foto_url", publicURL.publicUrl);
      
      toast({
        title: "Foto carregada",
        description: "Sua foto foi carregada com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao fazer upload da foto:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer upload da foto.",
        variant: "destructive",
      });
    } finally {
      setUploadingFoto(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      const userData = {
        nome: values.nome,
        matricula: values.matricula,
        turma_id: values.turma_id,
        foto_url: values.foto_url || "https://github.com/shadcn.png", // Default avatar
      };
      
      const { data, error } = await signUp(values.email, values.password, userData);
      
      if (error) {
        toast({
          title: "Erro ao cadastrar",
          description: error.message || "Verifique os dados e tente novamente.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso. Faça login para continuar.",
      });
      
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-gray-500 mt-2">
            Cadastre-se para começar a registrar suas entregas de reciclagem
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua matrícula na UNAMA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="turma_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua turma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {turmas.map((turma) => (
                        <SelectItem key={turma.id} value={turma.id}>
                          {turma.curso} - {turma.semestre}º semestre - {turma.turno}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione a turma em que você está matriculado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foto_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto de Perfil</FormLabel>
                  <div className="flex items-center gap-4">
                    {fotoPreview && (
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={fotoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFotoUpload}
                          disabled={uploadingFoto}
                          className="hidden"
                          id="foto-upload"
                        />
                        <label
                          htmlFor="foto-upload"
                          className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md inline-block transition-colors"
                        >
                          {uploadingFoto ? "Carregando..." : "Escolher Foto"}
                        </label>
                      </div>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Escolha uma foto de perfil (opcional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Criar Conta"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-gray-500">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-green-500 hover:text-green-600 font-medium"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
