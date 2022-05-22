import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import cardTpl from './tamplates/List-item.hbs'

const API_KEY = '27534164-ac67924df2b02df41d2da9fc8';
axios.defaults.baseURL = 'https://pixabay.com/api/?'

let page = 1;

const params = {
    key: API_KEY,
    orientation: 'horzontal',
    image_type: 'photo',
    safesearch:true,
}

const refs = {
    searchForm: document.querySelector('#search-form'),
    listBox: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.moreCards button')
}

 async function onSearchSubmitBtn(e) {
    e.preventDefault();
     params.q = e.currentTarget.elements.searchQuery.value;
     
    const {data} = await getInfo()
    renderCards(data.hits)
}

async function getInfo() { 
    try {
        const fetchData = await axios.get(`page=${page}&per_page=40`, { params });
        page += 1;
        
        return fetchData
    } catch (error) { 
        throw new Error (error)
    }
}

 function renderCards(data) { 
    refs.listBox.insertAdjacentHTML('beforeend', cardTpl(data))
}

refs.searchForm.addEventListener('submit', onSearchSubmitBtn)

async function onLoadMoreBtnClick() { 
    console.log('until', page)
    const { data } = await getInfo();
    console.log('after', page)
    renderCards(data.hits)   
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)

