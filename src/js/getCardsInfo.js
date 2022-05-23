import axios from 'axios';
import params from './getParams.js'

export default async function () { 
    try {
        return await axios.get(``, { params });
    }
    catch (error) {
        if (error.response) {
            Notiflix.Notify.failure('Error server request')
        }
     }
}