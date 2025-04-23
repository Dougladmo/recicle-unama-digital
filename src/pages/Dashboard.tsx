import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDashboardData } from "@/lib/supabase";
import { DashboardData, DashboardFilters } from "@/types";

import { StatCard } from "@/components/dashboard/StatCard";
import { RecyclingChart } from "@/components/dashboard/RecyclingChart";
import { PieChartTurmas } from "@/components/dashboard/PieChartTurmas";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import {
  RankingTurmasTable,
  RankingAlunosTable,
} from "@/components/dashboard/RankingTable";
import {
  DashboardFilters as DashboardFiltersComponent,
} from "@/components/dashboard/DashboardFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>({
    curso: null,
    semestre: null,
    dataInicio: null,
    dataFim: null,
  });

  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const fetchDashboardData = useCallback(
    async (currentFilters: DashboardFilters) => {
      try {
        setLoading(true);
        const { data, error } = await getDashboardData({
          curso: currentFilters.curso,
          semestre: currentFilters.semestre,
          dataInicio: currentFilters.dataInicio,
          dataFim: currentFilters.dataFim,
        });

        if (error) {
          setError(error.message);
          toast({
            variant: "destructive",
            title: "Erro ao carregar dados",
            description: error.message,
          });
        } else if (data) {
          setDashboardData(data);
        }
      } catch (err: any) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    fetchDashboardData(filters);
  }, [fetchDashboardData, filters]);

  const handleFilterChange = useCallback((newFilters: DashboardFilters) => {
    setFilters(newFilters);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              Erro ao carregar dados
            </h2>
            <p className="text-gray-600">{error}</p>
            <p className="mt-4">
              Verifique sua conexão com a internet e tente novamente mais tarde.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard de Reciclagem</h1>
        <p className="text-gray-500">
          Acompanhe o impacto da reciclagem na UNAMA
        </p>
      </div>

      {/* Filtros */}
      <DashboardFiltersComponent onFilterChange={handleFilterChange} />

      {dashboardData && (
        <>
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total Reciclado"
              value={`${dashboardData.total_kg} kg`}
              description="Total de resíduos reciclados até agora"
            />
            <StatCard
              title="Total de Entregas"
              value={dashboardData.total_entregas}
              description="Número de entregas registradas"
            />
            <StatCard
              title="Meta Atingida"
              value={`${dashboardData.percentual_meta.toFixed(1)}%`}
              description="Progresso para atingir a meta"
            />
          </div>

          {/* Tabs de gráficos e ranking */}
          <Tabs defaultValue="graficos" className="mb-8">
            <TabsList className="mb-4 w-full justify-start overflow-x-auto">
              <TabsTrigger value="graficos">Gráficos</TabsTrigger>
              <TabsTrigger value="ranking">Ranking</TabsTrigger>
            </TabsList>

            <TabsContent value="graficos">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={isMobile ? "col-span-1" : "col-span-2"}>
                  <RecyclingChart
                    data={dashboardData.por_tipo}
                    title="Reciclagem por Tipo de Material"
                  />
                </div>
                <div className="col-span-1">
                  <PieChartTurmas data={dashboardData.por_turma} />
                </div>
                <div className="col-span-1 lg:col-span-3">
                  <TimeSeriesChart data={dashboardData.historico} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ranking">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RankingTurmasTable data={dashboardData.ranking_turmas} />
                <RankingAlunosTable data={dashboardData.ranking_alunos} />
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
