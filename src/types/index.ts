export type Unidade = {
  id: string;
  nome: string;
  endereco: string;
};

export type Turma = {
  id: string;
  curso: 'ADS' | 'BCC';
  semestre: number;
  turno: string;
  unidade_id: string;
};

export type Aluno = {
  id: string;
  nome: string;
  matricula: string;
  foto_url: string;
  turma_id: string;
};

export type Entrega = {
  id: string;
  aluno_id: string;
  quantidade_kg: number;
  tipo_residuo: 'alumínio' | 'vidro' | 'pano' | 'PET';
  criada_em: string;
};

export type EntregaFormData = {
  quantidade_kg: number;
  tipo_residuo: 'alumínio' | 'vidro' | 'pano' | 'PET';
  turma_id: string;
  curso: 'ADS' | 'BCC';
  semestre: number;
  turno: string;
  unidade_id: string;
};

export type DashboardData = {
  total_kg: number;
  total_entregas: number;
  percentual_meta: number;
  por_tipo: {
    tipo: string;
    quantidade: number;
  }[];
  por_turma: {
    turma: string;
    quantidade: number;
  }[];
  historico: {
    semana: string;
    quantidade: number;
  }[];
  ranking_turmas: {
    turma: string;
    curso: string;
    semestre: number;
    quantidade: number;
  }[];
  ranking_alunos: {
    nome: string;
    turma: string;
    quantidade: number;
  }[];
};

export type DashboardFilters = {
  curso: string | null;
  semestre: number | null;
  dataInicio: Date | null;
  dataFim: Date | null;
};
