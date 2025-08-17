// DarkWatch Movie Finder - Main JavaScript

class DarkWatch {
    constructor() {
        this.apiKey = ''; // TMDB API key (user needs to provide)
        this.youtubeApiKey = ''; // YouTube API key (user needs to provide)
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
        this.currentPage = 1;
        this.currentQuery = '';
        this.currentRegion = '';
        this.currentYear = '';
        this.ytPlayer = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkApiKeys();
        this.loadPopularMovies();
    }

    checkApiKeys() {
        if (!this.apiKey) {
            this.showApiKeyMessage();
        }
    }

    showApiKeyMessage() {
        const moviesGrid = document.getElementById('movies-grid');
        moviesGrid.innerHTML = `
            <div class="api-key-message">
                <h3>🔑 API Keys Required</h3>
                <p>To use DarkWatch, you need to:</p>
                <ol>
                    <li>Get a free API key from <a href="https://www.themoviedb.org/settings/api" target="_blank">TMDB</a></li>
                    <li>Get a YouTube Data API key from <a href="https://console.developers.google.com/" target="_blank">Google Cloud Console</a></li>
                    <li>Replace the empty apiKey and youtubeApiKey values in script.js</li>
                </ol>
                <p>For now, you can see the demo interface with sample data.</p>
                <button onclick="darkWatch.loadSampleMovies()" class="trailer-btn">View Sample Movies</button>
            </div>
        `;
    }

    bindEvents() {
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        const regionFilter = document.getElementById('region-filter');
        const yearFilter = document.getElementById('year-filter');
        const modal = document.getElementById('trailer-modal');
        const closeBtn = document.querySelector('.close-btn');

        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        regionFilter.addEventListener('change', () => this.handleSearch());
        yearFilter.addEventListener('change', () => this.handleSearch());

        closeBtn.addEventListener('click', () => this.closeTrailerModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeTrailerModal();
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeTrailerModal();
        });
    }

    async handleSearch() {
        const query = document.getElementById('search-input').value.trim();
        const region = document.getElementById('region-filter').value;
        const year = document.getElementById('year-filter').value;

        this.currentQuery = query;
        this.currentRegion = region;
        this.currentYear = year;
        this.currentPage = 1;

        if (query || region || year) {
            await this.searchMovies();
        } else {
            await this.loadPopularMovies();
        }
    }

    async searchMovies() {
        if (!this.apiKey) {
            this.loadSampleMovies();
            return;
        }

        this.showLoading(true);
        
        try {
            let url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(this.currentQuery)}&page=${this.currentPage}`;
            
            if (this.currentRegion) {
                url += `&region=${this.currentRegion}`;
            }
            
            if (this.currentYear) {
                url += `&year=${this.currentYear}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            
            this.displayMovies(data.results || []);
        } catch (error) {
            console.error('Error searching movies:', error);
            this.showError('Failed to search movies. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    async loadPopularMovies() {
        if (!this.apiKey) {
            this.loadSampleMovies();
            return;
        }

        this.showLoading(true);
        
        try {
            const response = await fetch(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=1`);
            const data = await response.json();
            
            this.displayMovies(data.results || []);
        } catch (error) {
            console.error('Error loading popular movies:', error);
            this.showError('Failed to load movies. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    loadSampleMovies() {
        // Sample data for demonstration
        const sampleMovies = [
            {
                id: 1,
                title: "The Dark Knight",
                release_date: "2008-07-18",
                overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
                poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                vote_average: 9.0
            },
            {
                id: 2,
                title: "Inception",
                release_date: "2010-07-16",
                overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
                poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                vote_average: 8.8
            },
            {
                id: 3,
                title: "Parasite",
                release_date: "2019-05-30",
                overview: "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
                poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                vote_average: 8.5
            }
        ];

        this.displayMovies(sampleMovies);
    }

    displayMovies(movies) {
        const moviesGrid = document.getElementById('movies-grid');
        const noResults = document.getElementById('no-results');

        if (movies.length === 0) {
            moviesGrid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        
        moviesGrid.innerHTML = movies.map(movie => this.createMovieCard(movie)).join('');
    }

    createMovieCard(movie) {
        const posterUrl = movie.poster_path 
            ? `${this.imageBaseUrl}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster';
        
        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        const overview = movie.overview || 'No overview available.';
        
        // Only show trailer button if movie has a title
        const trailerButton = movie.title ? 
            `<button class="trailer-btn" onclick="darkWatch.openTrailer('${movie.title}', ${movie.id})">
                🎬 Watch Trailer
            </button>` : '';

        return `
            <div class="movie-card">
                <img src="${posterUrl}" alt="${movie.title}" class="movie-poster" 
                     onerror="this.src='https://via.placeholder.com/500x750/1a1a2e/ffffff?text=No+Poster'">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title || 'Untitled'}</h3>
                    <div class="movie-year">${year}</div>
                    <div class="movie-overview">${overview}</div>
                    <div class="movie-rating">
                        <span class="rating-star">⭐</span>
                        <span class="rating-score">${rating}/10</span>
                    </div>
                    <div class="movie-actions">
                        ${trailerButton}
                    </div>
                </div>
            </div>
        `;
    }

    async openTrailer(movieTitle, movieId) {
        if (!movieTitle) {
            this.showError('Cannot load trailer: Movie title is missing');
            return;
        }

        // Show modal with loading state
        const modal = document.getElementById('trailer-modal');
        const trailerContainer = document.getElementById('trailer-container');
        
        trailerContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading trailer...</p>
            </div>
        `;
        
        modal.classList.remove('hidden');

        try {
            await this.searchYouTubeTrailer(movieTitle, movieId);
        } catch (error) {
            console.error('Error loading trailer:', error);
            trailerContainer.innerHTML = `
                <div class="trailer-error">
                    <h3>Trailer not available</h3>
                    <p>Sorry, we couldn't find a trailer for "${movieTitle}".</p>
                    <p>This might be because:</p>
                    <ul>
                        <li>No YouTube API key is configured</li>
                        <li>No trailer exists for this movie</li>
                        <li>The trailer is not available in your region</li>
                    </ul>
                </div>
            `;
        }
    }

    async searchYouTubeTrailer(movieTitle, movieId) {
        if (!this.youtubeApiKey) {
            throw new Error('YouTube API key not configured');
        }

        const query = `${movieTitle} official trailer`;
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&type=video&key=${this.youtubeApiKey}`;

        try {
            const response = await fetch(youtubeUrl);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                this.loadYouTubePlayer(videoId);
            } else {
                throw new Error('No trailer found');
            }
        } catch (error) {
            console.error('YouTube API error:', error);
            throw error;
        }
    }

    loadYouTubePlayer(videoId) {
        const trailerContainer = document.getElementById('trailer-container');
        trailerContainer.innerHTML = `<div id="youtube-player"></div>`;

        // Initialize YouTube player
        if (window.YT && window.YT.Player) {
            this.ytPlayer = new YT.Player('youtube-player', {
                height: '315',
                width: '560',
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0
                }
            });
        } else {
            // Fallback: direct iframe embed
            trailerContainer.innerHTML = `
                <iframe id="youtube-player" 
                        width="560" height="315" 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen>
                </iframe>
            `;
        }
    }

    closeTrailerModal() {
        const modal = document.getElementById('trailer-modal');
        modal.classList.add('hidden');
        
        // Stop video if playing
        if (this.ytPlayer && this.ytPlayer.stopVideo) {
            this.ytPlayer.stopVideo();
        }
        
        // Clear the container
        const trailerContainer = document.getElementById('trailer-container');
        trailerContainer.innerHTML = '<div id="youtube-player"></div>';
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const moviesGrid = document.getElementById('movies-grid');
        
        if (show) {
            loading.classList.remove('hidden');
            moviesGrid.style.opacity = '0.5';
        } else {
            loading.classList.add('hidden');
            moviesGrid.style.opacity = '1';
        }
    }

    showError(message) {
        const moviesGrid = document.getElementById('movies-grid');
        moviesGrid.innerHTML = `
            <div class="error-message">
                <h3>❌ Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// YouTube API ready callback
function onYouTubeIframeAPIReady() {
    console.log('YouTube API ready');
}

// Initialize the app
const darkWatch = new DarkWatch();

// Additional CSS for error and API key messages
const additionalStyles = `
<style>
.api-key-message, .error-message, .trailer-error {
    text-align: center;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    margin: 2rem 0;
    grid-column: 1 / -1;
}

.api-key-message h3, .error-message h3, .trailer-error h3 {
    margin-bottom: 1rem;
    color: #ff6b35;
}

.api-key-message ol {
    text-align: left;
    display: inline-block;
    margin: 1rem 0;
}

.api-key-message a {
    color: #ff6b35;
    text-decoration: none;
}

.api-key-message a:hover {
    text-decoration: underline;
}

.trailer-error ul {
    text-align: left;
    display: inline-block;
    margin: 1rem 0;
}

.trailer-error {
    max-width: 400px;
    margin: 0 auto;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);