import supabase from './supabase'

const sendMessage = async (body: string) => {
	const { error } = await supabase.from('messages').insert({ body })
	
	if (error)
		throw error
}

export default sendMessage
