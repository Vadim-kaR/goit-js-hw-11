import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?'
const API_KEY = '27534164-ac67924df2b02df41d2da9fc8';

//Axios does not support Pixabay API_KEY
const params = {
    key: API_KEY,
    q:'',
    orientation: 'horzontal',
    image_type: 'photo',
    safesearch: true,
    per_page: 40,
    page:1,
}

const axiosIstance = axios.create();
axiosIstance.defaults.baseURL = BASE_URL;

 async function getImages () { 
    try {
        return await axiosIstance.get(``, { params });
    }
    catch (error) {
        if (error.response) {
            Notiflix.Notify.failure('Error server request')
        }
     }
}

export { params, getImages}