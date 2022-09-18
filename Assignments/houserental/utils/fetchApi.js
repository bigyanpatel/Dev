import axios from 'axios';


export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {'X-RapidAPI-Key': '15dd0a4c57mshc2467c365e6a6afp132484jsn54630218ea92',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'},
    });
      
    return data;
  }