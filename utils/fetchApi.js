import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';
 

export const fetchApi = async (url) => {
	const { data } = await axios.get((url), {
		headers: {
	    'X-RapidAPI-Key': 'd7575619acmsh72fcd43ed40a67ep16108ajsnaf113432e015',
	    'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
	  }
	});
// console.log(data)
	return data;
}
