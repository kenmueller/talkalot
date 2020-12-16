// import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

// import Message from 'models/Message'

import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
	// const [messages, setMessages] = useState<Message[]>([])
	// const [message, setMessage] = useState('')
	
	return (
		<div className={styles.root}>
			<Head>
				<title key="title">talkalot</title>
			</Head>
		</div>
	)
}

export default Home
