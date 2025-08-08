import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface BeforeAfterCase {
  id: number;
  title: string;
  age: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  createdAt: string;
  isPublished: boolean;
}

// Database functions for before/after cases
export const beforeAfterService = {
  async getCases(): Promise<BeforeAfterCase[]> {
    const { data, error } = await supabase
      .from('before_after_cases')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching cases:', error);
      return [];
    }
    
    return data || [];
  },

  async saveCase(caseData: Omit<BeforeAfterCase, 'id' | 'createdAt'>): Promise<BeforeAfterCase | null> {
    const { data, error } = await supabase
      .from('before_after_cases')
      .insert([{
        title: caseData.title,
        age: caseData.age,
        description: caseData.description,
        before_image: caseData.beforeImage,
        after_image: caseData.afterImage,
        is_published: caseData.isPublished
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error saving case:', error);
      return null;
    }
    
    return {
      id: data.id,
      title: data.title,
      age: data.age,
      description: data.description,
      beforeImage: data.before_image,
      afterImage: data.after_image,
      createdAt: data.created_at,
      isPublished: data.is_published
    };
  },

  async updateCase(id: number, updates: Partial<BeforeAfterCase>): Promise<boolean> {
    const { error } = await supabase
      .from('before_after_cases')
      .update({
        title: updates.title,
        age: updates.age,
        description: updates.description,
        before_image: updates.beforeImage,
        after_image: updates.afterImage,
        is_published: updates.isPublished
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating case:', error);
      return false;
    }
    
    return true;
  },

  async deleteCase(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('before_after_cases')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting case:', error);
      return false;
    }
    
    return true;
  }
};