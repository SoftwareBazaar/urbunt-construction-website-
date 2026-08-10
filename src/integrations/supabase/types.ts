export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      client_projects: {
        Row: {
          client_user_id: string
          contract_value: number | null
          created_at: string
          current_stage: string
          id: string
          location: string | null
          manager_name: string | null
          manager_phone: string | null
          progress: number
          project_type: string
          start_date: string | null
          status: string
          target_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_user_id: string
          contract_value?: number | null
          created_at?: string
          current_stage?: string
          id?: string
          location?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          progress?: number
          project_type?: string
          start_date?: string | null
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_user_id?: string
          contract_value?: number | null
          created_at?: string
          current_stage?: string
          id?: string
          location?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          progress?: number
          project_type?: string
          start_date?: string | null
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_type: string
          created_at: string
          email: string | null
          experience: string | null
          id: string
          location: string | null
          message: string | null
          name: string
          phone: string
          role_title: string | null
          source_page: string | null
          status: string
        }
        Insert: {
          applicant_type?: string
          created_at?: string
          email?: string | null
          experience?: string | null
          id?: string
          location?: string | null
          message?: string | null
          name: string
          phone: string
          role_title?: string | null
          source_page?: string | null
          status?: string
        }
        Update: {
          applicant_type?: string
          created_at?: string
          email?: string | null
          experience?: string | null
          id?: string
          location?: string | null
          message?: string | null
          name?: string
          phone?: string
          role_title?: string | null
          source_page?: string | null
          status?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          bundle_discount: number
          created_at: string
          email: string | null
          estimate_high: number | null
          estimate_low: number | null
          id: string
          kind: string
          location: string | null
          name: string
          notes: string | null
          package_slug: string | null
          phone: string
          referrer: string | null
          service_slugs: string[]
          size: string | null
          source_channel: string
          source_page: string | null
          stage: string | null
          status: string
          track: string | null
          updated_at: string
          utm: Json
        }
        Insert: {
          bundle_discount?: number
          created_at?: string
          email?: string | null
          estimate_high?: number | null
          estimate_low?: number | null
          id?: string
          kind?: string
          location?: string | null
          name: string
          notes?: string | null
          package_slug?: string | null
          phone: string
          referrer?: string | null
          service_slugs?: string[]
          size?: string | null
          source_channel?: string
          source_page?: string | null
          stage?: string | null
          status?: string
          track?: string | null
          updated_at?: string
          utm?: Json
        }
        Update: {
          bundle_discount?: number
          created_at?: string
          email?: string | null
          estimate_high?: number | null
          estimate_low?: number | null
          id?: string
          kind?: string
          location?: string | null
          name?: string
          notes?: string | null
          package_slug?: string | null
          phone?: string
          referrer?: string | null
          service_slugs?: string[]
          size?: string | null
          source_channel?: string
          source_page?: string | null
          stage?: string | null
          status?: string
          track?: string | null
          updated_at?: string
          utm?: Json
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source_page: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source_page?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source_page?: string | null
        }
        Relationships: []
      }
      project_documents: {
        Row: {
          created_at: string
          doc_type: string
          file_url: string
          id: string
          name: string
          project_id: string
        }
        Insert: {
          created_at?: string
          doc_type?: string
          file_url: string
          id?: string
          name: string
          project_id: string
        }
        Update: {
          created_at?: string
          doc_type?: string
          file_url?: string
          id?: string
          name?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          actual_date: string | null
          created_at: string
          id: string
          name: string
          notes: string | null
          planned_date: string | null
          position: number
          project_id: string
          status: string
          weight: number
        }
        Insert: {
          actual_date?: string | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          planned_date?: string | null
          position?: number
          project_id: string
          status?: string
          weight?: number
        }
        Update: {
          actual_date?: string | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          planned_date?: string | null
          position?: number
          project_id?: string
          status?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          body: string | null
          id: string
          photo_url: string | null
          posted_at: string
          project_id: string
          title: string
        }
        Insert: {
          body?: string | null
          id?: string
          photo_url?: string | null
          posted_at?: string
          project_id: string
          title: string
        }
        Update: {
          body?: string | null
          id?: string
          photo_url?: string | null
          posted_at?: string
          project_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
