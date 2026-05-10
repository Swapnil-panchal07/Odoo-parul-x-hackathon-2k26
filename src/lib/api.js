import { supabase } from './supabase'

// 1. Cost Breakdown (Expenses)
export const budgetAPI = {
  getExpenses: async (tripId) => {
    const { data, error } = await supabase.from('expenses').select('*').eq('trip_id', tripId)
    if (error) throw error
    return data
  },
  addExpense: async (expense) => {
    const { data, error } = await supabase.from('expenses').insert(expense).select()
    if (error) throw error
    return data
  }
}

// 2. Packing Checklist
export const checklistAPI = {
  getItems: async (tripId) => {
    const { data, error } = await supabase.from('packing_items').select('*').eq('trip_id', tripId)
    if (error) throw error
    return data
  },
  addItem: async (item) => {
    const { data, error } = await supabase.from('packing_items').insert(item).select()
    if (error) throw error
    return data
  },
  toggleItem: async (itemId, packed) => {
    const { data, error } = await supabase.from('packing_items').update({ packed }).eq('id', itemId).select()
    if (error) throw error
    return data
  }
}

// 3. Shared/Public Itinerary
export const publicItineraryAPI = {
  getPublicTrip: async (tripId) => {
    const { data, error } = await supabase.from('trips').select('*, stops(*, activities(*))').eq('id', tripId).eq('is_public', true).single()
    if (error) throw error
    return data
  },
  makePublic: async (tripId) => {
    const { data, error } = await supabase.from('trips').update({ is_public: true }).eq('id', tripId).select()
    if (error) throw error
    return data
  }
}

// 4. Trip Notes / Journal
export const notesAPI = {
  getNotes: async (tripId) => {
    const { data, error } = await supabase.from('trip_notes').select('*').eq('trip_id', tripId).order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
  addNote: async (note) => {
    const { data, error } = await supabase.from('trip_notes').insert(note).select()
    if (error) throw error
    return data
  },
  updateNote: async (noteId, updates) => {
    const { data, error } = await supabase.from('trip_notes').update(updates).eq('id', noteId).select()
    if (error) throw error
    return data
  },
  deleteNote: async (noteId) => {
    const { error } = await supabase.from('trip_notes').delete().eq('id', noteId)
    if (error) throw error
    return true
  }
}

// 5. Admin Dashboard
export const adminAPI = {
  getAdminStats: async () => {
    // Note: To use these, the user must have an admin role or bypass RLS in a secure backend function.
    // For now, this is the client script layout.
    const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    const { count: tripCount } = await supabase.from('trips').select('*', { count: 'exact', head: true })
    
    return {
      totalUsers: userCount || 0,
      totalTrips: tripCount || 0
    }
  },
  getAllUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) throw error
    return data
  }
}
