
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getEntregas, deleteEntrega } from "@/lib/supabase";
import { Entrega } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MinhasEntregas() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login", { state: { from: "/minhas-entregas" } });
      return;
    }

    async function loadEntregas() {
      try {
        const { data, error } = await getEntregas();
        
        if (error) throw error;
        
        if (data) {
          setEntregas(data);
        }
      } catch (error) {
        console.error("Erro ao carregar entregas:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar suas entregas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadEntregas();
  }, [user, navigate, toast]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await deleteEntrega(id);
      
      if (error) throw error;
      
      // Remove from local state
      setEntregas(entregas.filter((entrega) => entrega.id !== id));
      
      toast({
        title: "Entrega removida",
        description: "A entrega foi removida com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao remover entrega:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a entrega.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando suas entregas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Minhas Entregas</h1>
          <p className="text-gray-500">Histórico de materiais recicláveis entregues</p>
        </div>
        <Button onClick={() => navigate('/registrar')} className="bg-green-500 hover:bg-green-600">
          Nova Entrega
        </Button>
      </div>

      {entregas.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma entrega registrada</h3>
          <p className="text-gray-500 mb-6">
            Você ainda não registrou nenhuma entrega de materiais recicláveis.
          </p>
          <Button 
            onClick={() => navigate('/registrar')}
            className="bg-green-500 hover:bg-green-600"
          >
            Registrar Primeira Entrega
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entregas.map((entrega) => (
                <TableRow key={entrega.id}>
                  <TableCell>{formatDate(entrega.criada_em)}</TableCell>
                  <TableCell className="capitalize">{entrega.tipo_residuo}</TableCell>
                  <TableCell className="text-right">{entrega.quantidade_kg} kg</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteId(entrega.id)}
                        >
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este registro de entrega? 
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteId && handleDelete(deleteId)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
