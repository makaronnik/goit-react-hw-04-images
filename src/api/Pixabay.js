import axios from 'axios';

export default class Pixabay {
  constructor() {
    this.key = 'key=34749100-f13756ca679aed7b8f55ab5a5';
    this.url = 'https://pixabay.com/api/?';
    this.query = '&q=';
    this.imageType = '&image_type=photo';
    this.orientation = '&orientation=horizontal';
    this.perPage = '&per_page=12';
    this.page = '&page=';
  }

  async getImages(searchQuery, page = 1) {
    return await axios.get(
      `${this.url}${this.key}${this.query}${searchQuery}${this.imageType}${this.orientation}${this.perPage}${this.page}${page}`
    );
  }
}
