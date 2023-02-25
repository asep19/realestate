import Head from 'next/head';
import { Box } from '@chakra-ui/react';

const Layout = (children) => (
	<>
		<Head>Real Estate</Head>	
		<Box>
			<header>Header</header>
			<main>
				{children}
			</main>
			<footer>Footer</footer>
		</Box>
	</>
)

export default Layout;