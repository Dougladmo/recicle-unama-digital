
import { createClient } from '@supabase/supabase-js';
import type { Aluno, Entrega, Turma, Unidade, EntregaFormData, DashboardData } from '@/types';

// These should be replaced with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signUp(email: string, password: string, userData: Partial<Aluno>) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return { data: null, error: authError };

  // If auth successful, create the user profile
  if (authData.user) {
    const { data, error } = await supabase
      .from('alunos')
      .insert({
        ...userData,
        id: authData.user.id
      })
      .select()
      .single();
    
    return { data, error };
  }

  return { data: null, error: new Error('Falha ao criar usuário') };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) return null;
  
  const { data } = await supabase
    .from('alunos')
    .select('*')
    .eq('id', session.session.user.id)
    .single();
  
  return data;
}

// Entregas API
export async function registerEntrega(entregaData: EntregaFormData) {
  const user = await getCurrentUser();
  if (!user) return { error: new Error('Usuário não autenticado') };

  const { data, error } = await supabase
    .from('entregas')
    .insert({
      aluno_id: user.id,
      quantidade_kg: entregaData.quantidade_kg,
      tipo_residuo: entregaData.tipo_residuo,
    })
    .select();

  return { data, error };
}

export async function getEntregas() {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: new Error('Usuário não autenticado') };

  return await supabase
    .from('entregas')
    .select('*')
    .eq('aluno_id', user.id)
    .order('criada_em', { ascending: false });
}

export async function deleteEntrega(id: string) {
  const user = await getCurrentUser();
  if (!user) return { error: new Error('Usuário não autenticado') };

  return await supabase
    .from('entregas')
    .delete()
    .eq('id', id)
    .eq('aluno_id', user.id); // Ensure user can only delete their own entries
}

// Turmas API
export async function getTurmas() {
  return await supabase
    .from('turmas')
    .select('*')
    .order('curso')
    .order('semestre');
}

// Unidades API
export async function getUnidades() {
  return await supabase
    .from('unidades')
    .select('*')
    .order('nome');
}

// Dashboard API
export async function getDashboardData(): Promise<{ data: DashboardData | null, error: any }> {
  // Get total kg recycled
  const { data: totalData, error: totalError } = await supabase
    .rpc('get_total_reciclado');
  
  if (totalError) return { data: null, error: totalError };

  // Get delivery count
  const { count: totalEntregas, error: countError } = await supabase
    .from('entregas')
    .select('*', { count: 'exact', head: true });
  
  if (countError) return { data: null, error: countError };

  // Get recycling by type
  const { data: tipoData, error: tipoError } = await supabase
    .rpc('get_reciclagem_por_tipo');
  
  if (tipoError) return { data: null, error: tipoError };

  // Get recycling by class
  const { data: turmaData, error: turmaError } = await supabase
    .rpc('get_reciclagem_por_turma');
  
  if (turmaError) return { data: null, error: turmaError };

  // Get weekly history (last 8 weeks)
  const { data: historicoData, error: historicoError } = await supabase
    .rpc('get_historico_semanal');
  
  if (historicoError) return { data: null, error: historicoError };

  // Get top classes ranking
  const { data: rankingTurmas, error: rankingTurmasError } = await supabase
    .rpc('get_ranking_turmas');
  
  if (rankingTurmasError) return { data: null, error: rankingTurmasError };

  // Get top students ranking
  const { data: rankingAlunos, error: rankingAlunosError } = await supabase
    .rpc('get_ranking_alunos');
  
  if (rankingAlunosError) return { data: null, error: rankingAlunosError };

  // Calculate percentage of target met (assuming 100kg is the target)
  const target = 100; // This should be configurable
  const percentualMeta = totalData ? (totalData.total_kg / target) * 100 : 0;

  return {
    data: {
      total_kg: totalData?.total_kg || 0,
      total_entregas: totalEntregas || 0,
      percentual_meta: percentualMeta,
      por_tipo: tipoData || [],
      por_turma: turmaData || [],
      historico: historicoData || [],
      ranking_turmas: rankingTurmas || [],
      ranking_alunos: rankingAlunos || [],
    },
    error: null
  };
}
