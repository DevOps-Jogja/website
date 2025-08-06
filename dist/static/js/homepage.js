// Simple Gallery Slider
let currentSlide = 0;
let totalSlides = 0;
let autoPlayInterval = null;

function initGallery() {
    console.log('Initializing simple gallery...');

    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.gallery-indicator');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    if (!slider || slides.length === 0) {
        console.log('No gallery found');
        return;
    }

    totalSlides = slides.length;
    console.log('Gallery initialized with', totalSlides, 'slides');

    // Navigation buttons
    if (prevBtn) {
        prevBtn.onclick = function () {
            console.log('Previous clicked');
            previousSlide();
            return false;
        };
    }

    if (nextBtn) {
        nextBtn.onclick = function () {
            console.log('Next clicked');
            nextSlide();
            return false;
        };
    }

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.onclick = function () {
            console.log('Indicator', index, 'clicked');
            goToSlide(index);
            return false;
        };
    });

    // Start auto play
    startAutoPlay();

    // Pause on hover
    const container = document.querySelector('.gallery-slider-container');
    if (container) {
        container.onmouseenter = function () {
            pauseAutoPlay();
        };
        container.onmouseleave = function () {
            startAutoPlay();
        };
    }

    // Initial display
    updateSlider();
}

// Sponsors Slider
function initSponsors() {
    const sliders = document.querySelectorAll('.sponsors-slider');
    sliders.forEach(slider => {
        const sponsorItems = slider.innerHTML;
        slider.innerHTML = sponsorItems + sponsorItems;
    });
}

// Electron Animation
function initElectronAnimation() {
    const electronBackground = document.querySelector('.electron-background');
    const electronContainer = document.querySelector('.electron-container');

    if (!electronBackground || !electronContainer) return;

    electronBackground.addEventListener('mousemove', (e) => {
        const rect = electronBackground.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const offsetX = (x - centerX) * 0.1;
        const offsetY = (y - centerY) * 0.1;

        electronContainer.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
    });

    electronBackground.addEventListener('mouseleave', () => {
        electronContainer.style.transform = 'translate(-50%, -50%)';
    });

    // Hide on mobile
    if (window.innerWidth <= 768) {
        electronContainer.style.display = 'none';
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slider = document.querySelector('.gallery-slider');
    const indicators = document.querySelectorAll('.gallery-indicator');

    if (slider) {
        const translateX = -currentSlide * 100;
        slider.style.transform = `translateX(${translateX}%)`;
        console.log('Slider moved to slide', currentSlide);
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('bg-white');
            indicator.classList.remove('bg-white/40');
        } else {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/40');
        }
    });
}

function startAutoPlay() {
    if (totalSlides <= 1) return;

    pauseAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 4000);
    console.log('Auto-play started');
}

function pauseAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        console.log('Auto-play paused');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM ready, initializing all features...');
    initGallery();
    initSponsors();
    initElectronAnimation();
    console.log('All features initialized');
});
