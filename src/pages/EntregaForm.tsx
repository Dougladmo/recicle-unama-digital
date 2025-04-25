import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getTurmas, getUnidades, registerEntrega } from "@/lib/supabase";
import type { Turma, Unidade, EntregaFormData } from "@/types";

const formSchema = z.object({
  quantidade_kg: z.number().positive("A quantidade precisa ser maior que zero").refine(val => !isNaN(val), {
    message: "A quantidade precisa ser um número"
  }),
  tipo_residuo: z.enum(["aluminio", "vidro", "pano", "PET"], {
    required_error: "Selecione um tipo de resíduo"
  }),
  turma_id: z.string().uuid({
    message: "Selecione uma turma válida"
  }),
  curso: z.enum(["ADS", "BCC"], {
    required_error: "Selecione um curso"
  }),
  semestre: z.number().min(1).max(10),
  turno: z.string().min(1, {
    message: "Selecione um turno"
  }),
  unidade_id: z.string().uuid({
    message: "Selecione uma unidade válida"
  })
});

export default function EntregaForm() {
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantidade_kg: 0,
      tipo_residuo: undefined,
      turma_id: "",
      curso: undefined,
      semestre: 1,
      turno: "",
      unidade_id: ""
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/registrar"
        }
      });
      return;
    }
    async function loadOptions() {
      try {
        const {
          data: turmasData
        } = await getTurmas();
        if (turmasData) {
          setTurmas(turmasData);
        }

        const {
          data: unidadesData
        } = await getUnidades();
        if (unidadesData) {
          setUnidades(unidadesData);
        }

        if (user.turma_id) {
          const turma = turmasData?.find(t => t.id === user.turma_id);
          if (turma) {
            form.setValue("turma_id", turma.id);
            form.setValue("curso", turma.curso);
            form.setValue("semestre", turma.semestre);
            form.setValue("turno", turma.turno);
            form.setValue("unidade_id", turma.unidade_id);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar opções:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados necessários.",
          variant: "destructive"
        });
      }
    }
    loadOptions();
  }, [user, navigate, form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const entregaData: EntregaFormData = {
        quantidade_kg: values.quantidade_kg,
        tipo_residuo: values.tipo_residuo,
        turma_id: values.turma_id,
        curso: values.curso,
        semestre: values.semestre,
        turno: values.turno,
        unidade_id: values.unidade_id
      };
      const {
        data,
        error
      } = await registerEntrega(entregaData);
      if (error) {
        throw error;
      }
      toast({
        title: "Entrega registrada!",
        description: "Sua contribuição foi registrada com sucesso."
      });
      navigate("/minhas-entregas");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao registrar entrega:", error);
      toast({
        title: "Erro ao registrar entrega",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleTurmaChange = (turmaId: string) => {
    const selectedTurma = turmas.find(t => t.id === turmaId);
    if (selectedTurma) {
      form.setValue("curso", selectedTurma.curso);
      form.setValue("semestre", selectedTurma.semestre);
      form.setValue("turno", selectedTurma.turno);
      form.setValue("unidade_id", selectedTurma.unidade_id);
    }
  };

  return <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Registrar Entrega de Resíduos</h1>
        <p className="text-gray-500 mb-8">
          Preencha os dados abaixo para registrar sua entrega de materiais recicláveis.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="quantidade_kg" render={({
            field
          }) => <FormItem>
                  <FormLabel>Quantidade (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="Ex: 1.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} min={0.1} />
                  </FormControl>
                  <FormDescription>
                    Informe o peso aproximado em quilogramas
                  </FormDescription>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="tipo_residuo" render={({
            field
          }) => <FormItem>
                  <FormLabel>Tipo de Resíduo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="alumínio">Alumínio</SelectItem>
                      <SelectItem value="vidro">Vidro</SelectItem>
                      <SelectItem value="pano">Pano/Tecido</SelectItem>
                      <SelectItem value="PET">PET</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione o tipo principal do material entregue
                  </FormDescription>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="turma_id" render={({
            field
          }) => <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <Select onValueChange={value => {
              field.onChange(value);
              handleTurmaChange(value);
            }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua turma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {turmas.map(turma => <SelectItem key={turma.id} value={turma.id}>
                          {turma.curso} - {turma.semestre}º semestre - {turma.turno}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormDescription>Ao selecionar a sua turma, outros campos serão preenchidos automaticamente</FormDescription>
                  <FormMessage />
                </FormItem>} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="curso" render={({
              field
            }) => <FormItem>
                    <FormLabel>Curso</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!form.getValues("turma_id")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADS">ADS</SelectItem>
                        <SelectItem value="BCC">BCC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="semestre" render={({
              field
            }) => <FormItem>
                    <FormLabel>Semestre</FormLabel>
                    <Select onValueChange={value => field.onChange(parseInt(value))} value={field.value?.toString()} disabled={!!form.getValues("turma_id")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Semestre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map(semestre => <SelectItem key={semestre} value={semestre.toString()}>
                            {semestre}º
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="turno" render={({
              field
            }) => <FormItem>
                    <FormLabel>Turno</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!form.getValues("turma_id")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Turno" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Manhã">Manhã</SelectItem>
                        <SelectItem value="Tarde">Tarde</SelectItem>
                        <SelectItem value="Noite">Noite</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="unidade_id" render={({
              field
            }) => <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!form.getValues("turma_id")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unidades.map(unidade => <SelectItem key={unidade.id} value={unidade.id}>
                            {unidade.nome}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
                {isLoading ? "Enviando..." : "Registrar Entrega"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>;
}
