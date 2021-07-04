
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import './sass/main.scss';
import imgTemplate from './templates/imgTemplate.hbs';
import ImageAPIService from './js/apiService.js';
import { alert } from '@pnotify/core';
import notificationOptions from './js/notificationSettings.js';

const serviceOptions = {
    API_KEY: '21859893-eed1f1d786560e2667ad1f26b',
    imagePerPage: 12,
};
const apiService = new ImageAPIService(serviceOptions);

const initialMarkup = '<form class="search-form" id="search-form"><input id="search" type="search" name="query" autocomplete="off" placeholder="Search images..."/></form><ul class="gallery"></ul><div id="observe-element"></div>';
const renderInitialMarkup = () => {
    document.getElementById('gallery-container').innerHTML = initialMarkup;
};
renderInitialMarkup();
const refs = {
    form: document.getElementById('search-form'),
    input: document.getElementById('search'),
    gallery: document.querySelector('.gallery'),
    observeElement: document.querySelector('#observe-element'),
    scroll: document.querySelector('.gallery-item'),
};

let pageCounter = 1;
let searchQuery = '';

const renderImgCards = (data) => {
    const imagesHTML = imgTemplate(data);
    refs.gallery.insertAdjacentHTML('beforeend', imagesHTML);
};

const onSearch = async (e) => {
    e.preventDefault();
    e.target.firstElementChild.blur();
    refs.gallery.innerHTML = '';
    if (!refs.input.value) {
        alert(notificationOptions.emptyQuery);
        return
    }

    searchQuery = refs.input.value;
    refs.input.value = '';
    pageCounter = 1;
    const searchData = await apiService.getImagesPromise(searchQuery, pageCounter);
    if (!searchData.total) {
        alert(notificationOptions.noResult);
        return
    }

    alert(notificationOptions.successResult);
    renderImgCards(searchData);
};
const loadMoreImages = async () => {
    if (!refs.gallery.innerHTML) return
    pageCounter += 1;
    const searchData = await apiService.getImagesPromise(searchQuery, pageCounter);
    renderImgCards(searchData);
    // console.log(refs.gallery.children[refs.gallery.children.length - 12])
    setTimeout(() => {
        refs.gallery.children[refs.gallery.children.length - 12].scrollIntoView({
            block: 'end',
            behavior: 'smooth',
        }
        )
    }, 1000);
};
const onEntry = () => {
    loadMoreImages();
};

const observer = new IntersectionObserver(onEntry, {
    threshold: 0.5,
});

observer.observe(refs.observeElement);
refs.form.addEventListener('submit', onSearch);
