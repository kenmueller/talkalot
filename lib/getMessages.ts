import Message from 'models/Message'
import supabase from './supabase'

const getMessages = async (): Promise<Message[]> => {
	const { data, error } = await supabase.from('messages')
	
	if (error)
		throw error
	
	return data
}

export default getMessages
