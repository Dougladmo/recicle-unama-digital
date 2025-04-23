
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDashboardData } from "@/lib/supabase";
import { DashboardData } from "@/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecyclingChart } from "@/components/dashboard/RecyclingChart";
import { PieChartTurmas } from "@/components/dashboard/PieChartTurmas";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { RankingTurmasTable, RankingAlunosTable } from "@/components/dashboard/RankingTable";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const { data, error } = await getDashboardData();
        
        if (error) {
          setError(error.message);
        } else if (data) {
          setDashboardData(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-2">Erro ao carregar dados</h2>
              <p className="text-gray-600">{error}</p>
              <p className="mt-4">Verifique sua conexão com a internet e tente novamente mais tarde.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Reciclagem</h1>
        <p className="text-gray-500">Acompanhe o impacto da reciclagem na UNAMA</p>
      </div>

      {dashboardData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard
              title="Total Reciclado"
              value={`${dashboardData.total_kg} kg`}
              description="Total de resíduos reciclados até agora"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 14 6-6"/>
                  <path d="m9 8 6 6"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              }
            />
            <StatCard
              title="Total de Entregas"
              value={dashboardData.total_entregas}
              description="Número de entregas registradas"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V8"/>
                  <path d="m5 12-2-2 2-2"/>
                  <path d="m19 12 2-2-2-2"/>
                  <path d="M5 10h14"/>
                  <path d="m5 14 4 4 10-10"/>
                </svg>
              }
            />
            <StatCard
              title="Meta Atingida"
              value={`${dashboardData.percentual_meta.toFixed(1)}%`}
              description={`Progresso para atingir a meta`}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-6"/>
                  <path d="m17 14-5-4-5 4"/>
                  <rect width="20" height="12" x="2" y="2" rx="2"/>
                </svg>
              }
            />
          </div>

          <Tabs defaultValue="graficos" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="graficos">Gráficos</TabsTrigger>
              <TabsTrigger value="ranking">Ranking</TabsTrigger>
            </TabsList>
            <TabsContent value="graficos">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecyclingChart 
                  data={dashboardData.por_tipo} 
                  title="Reciclagem por Tipo de Material" 
                />
                <PieChartTurmas 
                  data={dashboardData.por_turma} 
                />
                <TimeSeriesChart 
                  data={dashboardData.historico} 
                />
              </div>
            </TabsContent>
            <TabsContent value="ranking">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RankingTurmasTable 
                  data={dashboardData.ranking_turmas} 
                />
                <RankingAlunosTable 
                  data={dashboardData.ranking_alunos} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
