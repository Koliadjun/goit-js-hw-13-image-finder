import './sass/main.scss';
import imgTemplate from './templates/imgTemplate.hbs';
import ImageAPIService from './js/apiService.js';

const refs = {
    input: document.querySelector('#search'),
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('#search-form'),
    loadMoreButton: document.querySelector('.load-more'),
};
const serviceOptions = {
    API_KEY: '21859893-eed1f1d786560e2667ad1f26b',
    imagePerPage: 12,
};
let pageCounter = 1;
let searchQuery = '';
const apiService = new ImageAPIService(serviceOptions);

const renderImgCards = (data) => {
    const imagesHTML = imgTemplate(data);
    refs.gallery.insertAdjacentHTML('beforeend', imagesHTML);
};
const onSearch = async (e) => {
    e.preventDefault();
    e.target.firstElementChild.blur();
    refs.gallery.innerHTML = '';
    if (!refs.input.value) {
        refs.loadMoreButton.classList.add('visually-hidden')
        return
    }
    searchQuery = refs.input.value;
    refs.input.value = '';
    pageCounter = 1;
    const searchData = await apiService.getImagesPromise(searchQuery, pageCounter);
    renderImgCards(searchData);
    refs.loadMoreButton.classList.remove('visually-hidden');

};
const loadMoreImages = async () => {
    pageCounter += 1;
    const searchData = await apiService.getImagesPromise(searchQuery, pageCounter);
    renderImgCards(searchData)
};
refs.form.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', loadMoreImages)
