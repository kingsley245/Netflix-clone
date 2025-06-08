async function fetchAPIData(endpoint) {
  const api_key =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmZkYzAzNDE4YWUxNDEyYWFmMGIwMzc2MjY5MWMyMiIsIm5iZiI6MTc0MDA3MDQxOS4wNzIsInN1YiI6IjY3Yjc1ZTEzYmM4NGQ1NmNiZWJhMGU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AaOSDu2daaBc65yUTLh63CTzVc6BaDBXX7RVIZl3VdM';

  const apiUrl = 'https://api.themoviedb.org/3/';

  const res = await fetch(apiUrl + endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${api_key}`,
      'content-Type': 'application/json'
    }
  });

  const data = await res.json();

  return data;
}

// export default fetchAPIData  ;

const container = document.getElementById('trendingContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

const updateArrows = () => {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  scrollLeftBtn.style.display = container.scrollLeft > 0 ? 'block' : 'none';
  scrollRightBtn.style.display =
    container.scrollLeft < maxScrollLeft - 10 ? 'block' : 'none';
};

scrollLeftBtn.addEventListener('click', () => {
  container.scrollBy({
    left: -container.clientWidth,
    behavior: 'smooth'
  });
});

scrollRightBtn.addEventListener('click', () => {
  container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
});

container.addEventListener('scroll', updateArrows);
window.addEventListener('load', updateArrows);

// fetchTrending movies
async function fetchTrendingMovies() {
  const trending = await fetchAPIData('/trending/tv/day');
  console.log(trending);
}

fetchTrendingMovies();
