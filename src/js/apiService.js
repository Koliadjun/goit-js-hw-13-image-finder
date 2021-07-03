export default class ImageAPIService {
    constructor({ API_KEY, imagePerPage, imageType = 'photo', orientation = 'horizontal' }) {
        this.BASE_URL = 'https://pixabay.com/api/';
        this.API_KEY = API_KEY;
        this.imageType = imageType;
        this.orientation = orientation;
        this.imagePerPage = imagePerPage;
    }
    getImagesPromise = async (searchQuery, page) => {
        const result = fetch(`${this.BASE_URL}?image_type=${this.imageType}&orientation=${this.orientation}&key=${this.API_KEY}&q=${searchQuery}&per_page=${this.imagePerPage}&page=${page}`);
        return await (await result).json();
    }
}