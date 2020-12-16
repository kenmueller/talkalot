import { useRef, useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify'

import Message from 'models/Message'
import getMessages from 'lib/getMessages'
import sendMessage from 'lib/sendMessage'
import onMessage from 'lib/onMessage'
import Navbar from 'components/Navbar'

import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
	const messagesRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	
	const [messages, setMessages] = useState<Message[]>([])
	const [message, setMessage] = useState('')
	
	const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		try {
			setMessage('')
			inputRef.current?.focus()
			
			await sendMessage(message)
		} catch (error) {
			setMessage(message)
			toast.error(error.message)
		}
	}, [inputRef, message, setMessage])
	
	const onMessageChange = useCallback(event => {
		setMessage(event.target.value)
	}, [setMessage])
	
	useEffect(() => {
		inputRef.current?.focus()
	}, [inputRef])
	
	useEffect(() => {
		const element = messagesRef.current
		
		if (element)
			element.scrollTop = element.scrollHeight
	}, [messagesRef, messages])
	
	useEffect(() => {
		getMessages()
			.then(newMessages => {
				setMessages(oldMessages => [...newMessages, ...oldMessages])
			})
			.catch(({ message }) => toast.error(message))
		
		return onMessage(message => {
			setMessages(messages => [...messages, message])
		})
	}, [setMessages])
	
	return (
		<div className={styles.root}>
			<Head>
				<title key="title">talkalot</title>
			</Head>
			<Navbar />
			<div ref={messagesRef} className={styles.messages}>
				{messages.map(message => (
					<p key={message.id} className={styles.message}>
						{message.body}
					</p>
				))}
			</div>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					ref={inputRef}
					className={styles.input}
					required
					placeholder="enter your message"
					value={message}
					onChange={onMessageChange}
				/>
				<button className={styles.button} disabled={!message}>
					send
				</button>
			</form>
		</div>
	)
}

export default Home
