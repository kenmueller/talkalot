import supabase from './supabase'

const getCurrentUser = () =>
	supabase.auth.user()

export default getCurrentUser
