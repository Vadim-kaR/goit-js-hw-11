import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import cardTpl from './tamplates/List-item.hbs'
import params from './js/getParams.js'
import getInfo from './js/getCardsInfo.js'
import refs from './js/refs.js'


axios.defaults.baseURL = 'https://pixabay.com/api/?'

 async function onSearchSubmitBtn(e) {
     e.preventDefault();
     const searchQuery = e.currentTarget.elements.searchQuery.value;

     if (searchQuery.trim() === '') {
       Notiflix.Notify.info('The string must not be empty');
        return;
     }
     params.q = searchQuery;
     const { data } = await getInfo();
     emptyResponseCheker(data);
     resetPage();
    renderCards(data.hits)
}

refs.searchForm.addEventListener('submit', onSearchSubmitBtn)


 function renderCards(data) { 
    refs.listBox.insertAdjacentHTML('beforeend', cardTpl(data))
}

async function onLoadMoreBtnClick() { 
    params.page += 1;
    const { data } = await getInfo();
    renderCards(data.hits)   
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)


function emptyResponseCheker (data) { 
    if ((data.hits).length === 0) { 
         Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return
    }
}

function resetPage() { 
    params.page = 1;
    refs.listBox.innerHTML = '';
}
