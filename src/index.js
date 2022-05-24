import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import cardTpl from './tamplates/List-item.hbs'
import params from './js/getParams.js'
import getInfo from './js/getCardsInfo.js'
import refs from './js/refs.js'
import smoothScroll from './js/smoothScroll.js'



axios.defaults.baseURL = 'https://pixabay.com/api/?'

let totalHits = 0;
let totalPageAmount = 0;
let instance = null;


 function renderCards(card) { 
     refs.listBox.insertAdjacentHTML('beforeend', cardTpl(card))
      lightbox = new SimpleLightbox('.gallery a');
}

function checkEmptyResponse (data) { 
    if ((data.hits).length === 0) { 
         Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return
    }
}

function resetPage() { 
    params.page = 1;
    refs.listBox.innerHTML = '';
}

function viewTotalHitsAmount() { 
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}

 async function onSearchSubmitBtn(e) {
     e.preventDefault();
     const searchQuery = e.currentTarget.elements.searchQuery.value;

     if (searchQuery.trim() === '') {
       Notiflix.Notify.info('The string must not be empty');
        return;
     }
     params.q = searchQuery;
     const { data } = await getInfo();
     checkEmptyResponse(data);
     resetPage();
     totalHits = data.totalHits;
     totalPageAmount = totalHits / params.per_page
     renderCards(data.hits);
     viewTotalHitsAmount();
}

refs.searchForm.addEventListener('submit', onSearchSubmitBtn)

const options = {
    rootMargin: '200px'
}
 
const callback = entries => {
    entries.forEach(async entry => {

        if (entry.isIntersecting && params.q !== '') { 

            if (params.page > totalPageAmount) { 
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                return
            }
            
            params.page += 1;
            const { data } = await getInfo();
            renderCards(data.hits);
            smoothScroll()
            lightbox.refresh()
        }
    })
}

const observer = new IntersectionObserver(callback, options)

observer.observe(document.querySelector('#spyBox'));

