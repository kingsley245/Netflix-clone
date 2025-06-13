// checking scroll behavior
const scrollContainerScroll = document.querySelector('.scroll-container');
const btnLeftScroll = document.querySelector('.scroll-left');
const btnRightScroll = document.querySelector('.scroll-right');

// console.log('scrollContainerScroll:', scrollContainerScroll);
// console.log('btnLeftScroll:', btnLeftScroll);
// console.log('btnRightScroll:', btnRightScroll);

function checkingArrow() {
  const scrollLeft = scrollContainerScroll.scrollLeft;
  const scrollWidth = scrollContainerScroll.scrollWidth;
  const clientWidth = scrollContainerScroll.clientWidth;

  if (scrollLeft <= 0) {
    btnLeftScroll.classList.add('hidden');
  } else {
    btnLeftScroll.classList.remove('hidden');
  }

  if (scrollLeft + clientWidth >= scrollWidth - 1) {
    btnRightScroll.classList.add('hidden');
  } else {
    btnRightScroll.classList.remove('hidden');
  }
}

window.addEventListener('load', checkingArrow);
scrollContainerScroll.addEventListener('scroll', checkingArrow);

// toggling arrow button
const scrollContainer = document.querySelector('.scroll-container');
const btnLeft = document.querySelector('.scroll-left');
const btnRight = document.querySelector('.scroll-right');

const scrollAmount = 300;

btnLeft.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

btnRight.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

// using the youtube api

const APIKEY = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';
const query = 'latest movies trailers';

const tvWrapper = document.getElementById('trending-cards-wrapper');

console.log(tvWrapper);
async function fetchDataFromYouTUBE(params) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=20&key=${APIKEY}`
  );

  const data = await res.json();
  console.log(data);

  data.items.forEach((video) => {
    const title =
      video.snippet.title.length > 40
        ? video.snippet.title.substring(0, 37) + '...'
        : video.snippet.title;
    const thumbnail = video.snippet.thumbnails.high.url;

    const cards = document.createElement('div');
    cards.className = 'movie-card';
    cards.innerHTML = `
    <img src="${thumbnail}" alt="${title}" />
    <div class="movie-title">${title}</div>
    `;

    tvWrapper.appendChild(cards);
  });
}

async function fetchNollywoodMovies() {
  const apiKey = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';
  const query = 'latest nollywood movie trailers 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=30&q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('nollywood-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> N/A</div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to fetch Nollywood movies:', error);
  }
}

async function fetchTrendingComediesNigeria() {
  const apiKey = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';
  const query = 'Trending Nigerian Comedy Skits 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=30&q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('nigeria-comedy-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> 😂</div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Comedy fetch error:', error);
  }
}

async function fetchTrendingNigerianCartoons() {
  const apiKey = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';
  const query = 'Trending Nigerian Cartoons for kids 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('cartoons-wrapper');
    console.log(wrapper);
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> 🎬</div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Cartoon fetch failed:', error);
  }
}

fetchTrendingComediesNigeria();
fetchTrendingComediesNigeria();
fetchNollywoodMovies();
fetchDataFromYouTUBE();
