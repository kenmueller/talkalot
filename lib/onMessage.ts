import Message from 'models/Message'
import supabase from './supabase'

const onMessage = (callback: (message: Message) => void) => {
	const subscription = supabase
		.from('messages')
		.on('INSERT', payload => callback(payload.new))
		.subscribe()
	
	return () => {
		supabase.removeSubscription(subscription)
	}
}

export default onMessage
