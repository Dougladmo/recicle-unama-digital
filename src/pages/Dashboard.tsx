
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { getDashboardData } from "@/lib/supabase";
import type {
  DashboardData,
  DashboardFilters,
} from "@/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecyclingChart } from "@/components/dashboard/RecyclingChart";
import { PieChartTurmas } from "@/components/dashboard/PieChartTurmas";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import {
  RankingTurmasTable,
  RankingAlunosTable,
} from "@/components/dashboard/RankingTable";
import { DashboardFiltersComponent } from "@/components/dashboard/DashboardFilters";
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

  const isMobile = useIsMobile();
  const { toast } = useToast();

  const fetchDashboardData = useCallback(
    async (current: DashboardFilters) => {
      setLoading(true);
      try {
        const { data, error } = await getDashboardData(current);
        if (error) {
          setError(error.message);
          toast({
            variant: "destructive",
            title: "Erro ao carregar dados",
            description: error.message,
          });
        } else {
          setDashboardData(data);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleFilterChange = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Carregando dados…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="glassmorphism">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              Erro ao carregar dados
            </h2>
            <p className="text-gray-600">{error}</p>
            <p className="mt-4">
              Verifique sua conexão e tente novamente mais tarde.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiMwMGEwNTAiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwIi8+PC9nPjwvc3ZnPg==')] opacity-5" />
      
      <div className="container mx-auto py-12 px-4 relative z-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard de Reciclagem</h1>
          <p className="text-gray-600 text-lg">Acompanhe o impacto da reciclagem na UNAMA</p>
        </header>

        <DashboardFiltersComponent onFilterChange={handleFilterChange} />

        {dashboardData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Reciclado"
                value={`${dashboardData.total_kg} kg`}
                description="Total de resíduos reciclados até agora"
                className="glassmorphism hover:shadow-lg transition-all duration-300"
              />
              <StatCard
                title="Total de Entregas"
                value={dashboardData.total_entregas}
                description="Número de entregas registradas"
                className="glassmorphism hover:shadow-lg transition-all duration-300"
              />
              <StatCard
                title="Meta Atingida"
                value={`${dashboardData.percentual_meta.toFixed(1)}%`}
                description="Progresso para atingir a meta"
                className="glassmorphism hover:shadow-lg transition-all duration-300"
              />
            </div>

            <Tabs defaultValue="graficos" className="mb-8">
              <TabsList className="mb-6 w-full justify-start overflow-x-auto bg-white/50 backdrop-blur-sm p-1 rounded-lg border border-white/20">
                <TabsTrigger value="graficos" className="text-base">Gráficos</TabsTrigger>
                <TabsTrigger value="ranking" className="text-base">Ranking</TabsTrigger>
              </TabsList>

              <TabsContent value="graficos">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className={isMobile ? "col-span-1" : "col-span-2"}>
                    <Card className="glassmorphism hover:shadow-lg transition-all duration-300">
                      <RecyclingChart data={dashboardData.por_tipo} title="Reciclagem por Tipo de Material" />
                    </Card>
                  </div>
                  <div className="col-span-1">
                    <Card className="glassmorphism hover:shadow-lg transition-all duration-300">
                      <PieChartTurmas data={dashboardData.por_turma} />
                    </Card>
                  </div>
                  <div className="col-span-1 lg:col-span-3">
                    <Card className="glassmorphism hover:shadow-lg transition-all duration-300">
                      <TimeSeriesChart data={dashboardData.historico} />
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ranking">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glassmorphism hover:shadow-lg transition-all duration-300">
                    <RankingTurmasTable data={dashboardData.ranking_turmas} />
                  </Card>
                  <Card className="glassmorphism hover:shadow-lg transition-all duration-300">
                    <RankingAlunosTable data={dashboardData.ranking_alunos} />
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}

