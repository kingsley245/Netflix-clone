// const globalYoutubeApi = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';

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

// loading indicator fetch
fetch('html/loading.html')
  .then((res) => res.text())
  .then((html) => {
    const loaderWrapper = document.createElement('div');
    loaderWrapper.innerHTML = html;
    document.body.appendChild(loaderWrapper);
  });

function showloader() {
  const loading = document.getElementById('lottie-loader');
  if (loading) loading.style.display = 'block';
}

function hideLoader() {
  const loading = document.getElementById('lottie-loader');
  if (loading) loading.style.display = 'none';
}
// using the youtube api

async function fetchVideosFromDatabase() {
  showloader();
  try {
    const response = await fetch('http://localhost:5000/videos');
    const data = await response.json();

    const wrapper = document.getElementById('trending-cards-wrapper');
    wrapper.innerHTML = '';

    data.forEach((video) => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> 🎬</div>
        <div class="movie-title">${
          video.title.length > 30
            ? video.title.slice(0, 30) + '...'
            : video.title
        }</div>
      `;

      // 🎬 On click, open the video in a new tab (YouTube)
      card.onclick = () => {
        window.open(
          `https://www.youtube.com/watch?v=${video.videoId}`,
          '_blank'
        );
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching videos from DB:', error);
  } finally {
    hideLoader();
  }
}

async function fetchNollywoodMovies() {
  const query = 'latest nollywood movie trailers 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

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
  const query = 'Trending Nigerian Comedy Skits 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

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
        <div class="movie-rating"><i class="fas fa-star"></i> </div>
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
  // const apiKey = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';
  const query = 'Trending Nigerian Cartoons for kids 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

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

// k-drama
async function fetchLatestKDrama() {
  const query = 'Latest Korean Drama 2025 with English Subtitles';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('kdrama-wrapper');
    console.log(wrapper);
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> 🇰🇷</div>
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
    console.error('K-Drama fetch failed:', error);
  }
}

async function fetchLatestRomanticMovies() {
  const query = 'Latest Romantic Movies 2025 full movie English';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('romantic-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-heart"></i> </div>
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
    console.error('Romantic movie fetch failed:', error);
  }
}

async function fetchHollywoodRomanticMovies() {
  const query = 'Hollywood Romantic Movies 2025 full movie English';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('hollywood-romantic-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-heart"></i></div>
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
    console.error('Hollywood Romantic Movies fetch failed:', error);
  }
}

async function fetchActionMovies() {
  const query = 'Latest Hollywood Action Movies 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('action-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i></div>
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
    console.error(' Action movies fetch failed:', error);
  }
}

// fetchActionMovies();
// fetchHollywoodRomanticMovies();
// fetchLatestRomanticMovies();
// fetchLatestKDrama();
// fetchTrendingComediesNigeria();
// fetchTrendingComediesNigeria();
// fetchNollywoodMovies();
// fetchDataFromYouTUBE();
fetchVideosFromDatabase();
