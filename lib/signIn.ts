import supabase from './supabase'

const signIn = async () => {
	const { error } = await supabase.auth.signIn({ provider: 'google' })
	
	if (error)
		throw error
}

export default signIn
