import ApiService from './apiService';
import cardTpl from '../templates/card.hbs';
import LoadMoreBtn from './load-more-btn';
// import { notification } from './notify';
import error from './error';
var debounce = require('lodash.debounce');

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const apiService = new ApiService();



refs.searchForm.addEventListener('input', debounce(onSearch,300));
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(event) {
    event.preventDefault();
    
    apiService.query = refs.searchForm.elements.query.value.trim();

    if (apiService.query !== ' ' && apiService.query !== '' ) {
        
    loadMoreBtn.show();
    apiService.resetPage();
    clearGalleryContainer();
    fetchGallery();
    } else {
        error();
        }
}

function fetchGallery() {
    loadMoreBtn.disable();
    apiService.fetchGallery().then(hits => {

        if (hits.length < 12) {
            console.log(hits.length);
            loadMoreBtn.hide();
            appenCardMarkup(hits);
            return;
        }
            appenCardMarkup(hits);
            loadMoreBtn.enable();
        
        if (apiService.page > 2) {
            console.log(apiService.page);
            window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth',
            });
        }
    });
    setTimeout(scrollDown, 600);
    function scrollDown() {
        
        document.querySelector('.btn').scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    }
        
}

function appenCardMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}