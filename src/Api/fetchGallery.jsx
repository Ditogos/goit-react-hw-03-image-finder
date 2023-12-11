const API_KEY = '40248939-f712c7f983066a304da5b3485';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchGallery(query, page) {
  const perPage = 15;
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
