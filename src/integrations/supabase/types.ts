export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alunos: {
        Row: {
          created_at: string | null
          foto_url: string | null
          id: string
          matricula: string
          nome: string
          turma_id: string
        }
        Insert: {
          created_at?: string | null
          foto_url?: string | null
          id: string
          matricula: string
          nome: string
          turma_id: string
        }
        Update: {
          created_at?: string | null
          foto_url?: string | null
          id?: string
          matricula?: string
          nome?: string
          turma_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alunos_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      entregas: {
        Row: {
          aluno_id: string
          created_at: string | null
          criada_em: string | null
          id: string
          quantidade_kg: number
          tipo_residuo: Database["public"]["Enums"]["tipo_residuo"]
        }
        Insert: {
          aluno_id: string
          created_at?: string | null
          criada_em?: string | null
          id?: string
          quantidade_kg: number
          tipo_residuo: Database["public"]["Enums"]["tipo_residuo"]
        }
        Update: {
          aluno_id?: string
          created_at?: string | null
          criada_em?: string | null
          id?: string
          quantidade_kg?: number
          tipo_residuo?: Database["public"]["Enums"]["tipo_residuo"]
        }
        Relationships: [
          {
            foreignKeyName: "entregas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
        ]
      }
      turmas: {
        Row: {
          created_at: string | null
          curso: string
          id: string
          semestre: number
          turno: string
          unidade_id: string | null
        }
        Insert: {
          created_at?: string | null
          curso: string
          id?: string
          semestre: number
          turno: string
          unidade_id?: string | null
        }
        Update: {
          created_at?: string | null
          curso?: string
          id?: string
          semestre?: number
          turno?: string
          unidade_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "turmas_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      unidades: {
        Row: {
          created_at: string | null
          endereco: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          endereco: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          endereco?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_count_entregas: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
        }[]
      }
      get_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_kg: number
          total_entregas: number
          meta_percent: number
          entregas_por_tipo: Json
          entregas_por_turma: Json
          ranking_turmas: Json
          ranking_alunos: Json
        }[]
      }
      get_historico_semanal: {
        Args: Record<PropertyKey, never>
        Returns: {
          semana: string
          quantidade: number
        }[]
      }
      get_ranking_alunos: {
        Args: Record<PropertyKey, never>
        Returns: {
          nome: string
          turma: string
          quantidade: number
        }[]
      }
      get_ranking_turmas: {
        Args: Record<PropertyKey, never>
        Returns: {
          turma: string
          curso: string
          semestre: number
          quantidade: number
        }[]
      }
      get_reciclagem_por_tipo: {
        Args: Record<PropertyKey, never>
        Returns: {
          tipo: string
          quantidade: number
        }[]
      }
      get_reciclagem_por_turma: {
        Args: Record<PropertyKey, never>
        Returns: {
          turma: string
          quantidade: number
        }[]
      }
      get_total_reciclado: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_kg: number
        }[]
      }
    }
    Enums: {
      tipo_residuo: "aluminio" | "vidro" | "pano" | "PET"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      tipo_residuo: ["aluminio", "vidro", "pano", "PET"],
    },
  },
} as const
