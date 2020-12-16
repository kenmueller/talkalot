import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

import getCurrentUser from 'lib/getCurrentUser'
import signIn from 'lib/signIn'
import signOut from 'lib/signOut'

import styles from 'styles/Navbar.module.scss'

const Navbar = () => {
	const isSignedIn = Boolean(getCurrentUser())
	const [isAuthLoading, setIsAuthLoading] = useState(false)
	
	const toggleAuth = useCallback(async () => {
		try {
			setIsAuthLoading(true)
			await (isSignedIn ? signOut : signIn)()
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsAuthLoading(false)
		}
	}, [isSignedIn])
	
	return (
		<nav className={styles.root}>
			<h1 className={styles.title}>talkalot</h1>
			<button
				className={styles.auth}
				disabled={isAuthLoading}
				onClick={toggleAuth}
			>
				sign {isSignedIn ? 'out' : 'in'}
			</button>
		</nav>
	)
}

export default Navbar
