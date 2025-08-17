# 🎬 DarkWatch Movie Finder

A beautiful, responsive web application for discovering movies from around the world with integrated YouTube trailer functionality.

## 🌟 Features

### Core Functionality
- **Movie Search**: Search for movies by title with real-time results
- **Regional Filtering**: Filter movies by country/region (US, UK, France, Germany, Japan, Korea, India, Brazil, etc.)
- **Year Filtering**: Filter movies by release year (2020-2024)
- **Popular Movies**: Browse trending and popular movies when no search is active

### YouTube Trailer Integration
- **Trailer Buttons**: Each movie card includes a "Watch Trailer" button (only for movies with titles)
- **YouTube Data API v3**: Lazy loads trailers using YouTube's official API
- **Smart Search**: Automatically searches for "Movie Title + official trailer"
- **Modal Player**: Trailers open in a beautiful modal with responsive YouTube player
- **Auto-close**: Modal closes on ESC key, close button, or clicking outside

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme**: Beautiful dark gradient theme with orange accents
- **Loading States**: Smooth loading indicators and transitions
- **Error Handling**: Graceful error handling with helpful messages
- **No API Key Demo**: Works with sample data even without API keys

## 🚀 Quick Start

### Prerequisites
1. **TMDB API Key** (free): Get one at [TMDB API](https://www.themoviedb.org/settings/api)
2. **YouTube Data API Key** (free): Get one at [Google Cloud Console](https://console.developers.google.com/)

### Installation
1. Clone or download this repository
2. Open `script.js` and add your API keys:
   ```javascript
   this.apiKey = 'YOUR_TMDB_API_KEY_HERE';
   this.youtubeApiKey = 'YOUR_YOUTUBE_API_KEY_HERE';
   ```
3. Open `index.html` in a web browser
4. Start discovering movies!

### Without API Keys
The application works with sample movie data even without API keys, so you can:
- Explore the interface immediately
- Test the YouTube trailer functionality (with demo data)
- See the responsive design in action

## 🎯 Usage

### Movie Search
1. **Basic Search**: Type a movie title in the search box and press Enter or click Search
2. **Regional Filter**: Select a region from the dropdown to see movies from specific countries
3. **Year Filter**: Select a year to see movies from that release year
4. **Combined Filters**: Use search + region + year together for precise results

### Watching Trailers
1. Click the "🎬 Watch Trailer" button on any movie card
2. The trailer will load automatically in a modal window
3. Close the trailer by:
   - Clicking the × button
   - Pressing the ESC key
   - Clicking outside the modal

### Responsive Features
- **Mobile**: Touch-friendly interface with optimized layout
- **Tablet**: Grid adjusts for optimal viewing
- **Desktop**: Full-featured experience with hover effects

## 🛠️ Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **No Framework Dependencies**: Lightweight and fast
- **API Integration**: TMDB API for movie data, YouTube Data API v3 for trailers
- **Responsive Design**: CSS Grid and Flexbox for layouts

### APIs Used
1. **The Movie Database (TMDB) API**:
   - Movie search and discovery
   - Movie metadata (title, overview, rating, poster)
   - Popular movies endpoint
   - Regional and year filtering

2. **YouTube Data API v3**:
   - Trailer search functionality
   - Video metadata retrieval
   - Embedded player integration

### Key Features Implementation
- **Lazy Loading**: Trailers are only fetched when requested
- **Error Handling**: Comprehensive error handling for API failures
- **Modal System**: Custom modal implementation with proper accessibility
- **Search Optimization**: Debounced search with proper query building
- **Responsive Images**: Optimized poster loading with fallbacks

## 🎨 Design Features

### Visual Design
- **Dark Theme**: Modern dark gradient background (navy to deep blue)
- **Orange Accents**: Vibrant orange-to-yellow gradients for interactive elements
- **Glassmorphism**: Subtle transparency and backdrop filters
- **Smooth Animations**: Hover effects, loading spinners, and transitions

### Layout
- **CSS Grid**: Responsive movie card grid that adapts to screen size
- **Flexbox**: Flexible layouts for search, filters, and card content
- **Mobile-First**: Responsive breakpoints for optimal mobile experience

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] Basic movie search functionality
- [x] YouTube trailer integration
- [x] Responsive design
- [x] Regional and year filtering
- [x] Popular movies display

### Phase 2: Enhanced Features (Planned)
- [ ] Movie details modal with cast, crew, and reviews
- [ ] Watchlist functionality with local storage
- [ ] Advanced search filters (genre, rating, runtime)
- [ ] Movie recommendations based on viewing history
- [ ] Social sharing functionality

### Phase 3: Advanced Features (Future)
- [ ] User accounts and personalized recommendations
- [ ] Multiple trailer sources (not just YouTube)
- [ ] Movie streaming availability checker
- [ ] Reviews and ratings system
- [ ] Offline mode with cached popular movies

## 📋 YouTube Trailer Documentation

### How Trailer Search Works
1. **Trigger**: User clicks "Watch Trailer" button on a movie card
2. **Validation**: System checks if movie has a title (no button shown for untitled movies)
3. **Search Query**: Constructs search query: `"{movie_title} official trailer"`
4. **API Call**: Calls YouTube Data API v3 search endpoint
5. **Result Processing**: Takes the first video result from search
6. **Player Loading**: Embeds YouTube player in modal with autoplay

### Error Handling
- **No API Key**: Shows informative message about API key requirement
- **No Results**: Displays friendly message when no trailer is found
- **API Errors**: Graceful handling of rate limits and network errors
- **Regional Restrictions**: Handles videos not available in user's region

### Player Features
- **Autoplay**: Trailers start automatically when modal opens
- **Responsive**: Player adjusts to screen size (mobile: 100% width, desktop: 560x315)
- **Clean Interface**: Modest branding and no related videos
- **Auto-stop**: Video stops when modal is closed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB**: For providing the comprehensive movie database API
- **YouTube**: For the trailer video content and API
- **Community**: For feedback and feature suggestions

---

**Made with ❤️ for movie lovers worldwide**
