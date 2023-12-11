const API_KEY = '40248939-f712c7f983066a304da5b3485';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 15;

export function fetchGallery(query, page) {
  return fetch(
    `${BASE_URL}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${page}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
