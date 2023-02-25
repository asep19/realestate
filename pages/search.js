import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import noresult from '../assets/images/noresult.svg';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';


const Search = ({ properties }) => {
	const [searchFilters, setSearchFilters] = useState(false);
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Search</title>
			</Head>
			<Box>
				<Flex
					cursor="pointer"
					bg="gray.100"
					borderBottom="1px"
					borderColor="gray.200"
					p="2"
					fontWeight="medium"
					alignItems="center"
					justifyContent="space-between"
					onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
				>
					<Text>Search Property by Filters</Text>
					<Icon w="7" as={BsFilter} />
				</Flex>
				{searchFilters && <SearchFilters />}
				<Text>
					Properties {router.query.purpose}
				</Text>
				<Flex flexWrap="wrap">
					{properties.map((property) => <Property property={property} key={property.id} />)}
				</Flex>
				{properties.length === 0 && (
					<Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
						<Image src={noresult} alt="no result" />
						<Text fontSize="2xl" paddingTop="4">No Result Found</Text>
					</Flex>
				)}
			</Box>
		</>
		
	)
}

export default Search;


export async function getServerSideProps({ query }) { 
	const purpose = query.purpose || 'for-rent';
	const rentFrequency = query.rentFrequency || 'yearly';
	const minPrice = query.minPrice || '0';
	const maxPrice = query.maxPrice || '1000000';
	const roomsMin = query.roomsMin || '0';
	const bathsMin = query.bathsMin || '0';
	const sort = query.sort || 'price-desc';
	const areaMax = query.areaMax || '35000';
	const locationExternalIDs = query.locationExternalIDs || '5002';
	const categoryExternalIDs = query.categoryExternalIDs || '4';

	const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalIDs=${categoryExternalIDs}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

	return {
		props: {
			properties: data?.hits 
		}
	}
}