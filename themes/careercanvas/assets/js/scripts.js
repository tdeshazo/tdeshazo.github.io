// Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Section fade-in system
function initializeSectionFadeIn() {
    const sections = document.querySelectorAll('section[data-animate]');
    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function initializePronunciationButton() {
    const trigger = document.querySelector('[data-pronunciation-trigger]');
    const audio = document.getElementById('hero-pronunciation-audio');

    if (!trigger || !audio) return;

    const clearPlayingState = () => {
        trigger.classList.remove('is-playing');
    };

    trigger.addEventListener('click', async function() {
        audio.currentTime = 0;
        trigger.classList.add('is-playing');

        try {
            await audio.play();
        } catch (error) {
            clearPlayingState();
        }
    });

    audio.addEventListener('ended', clearPlayingState);
    audio.addEventListener('pause', clearPlayingState);
}

// Initialize section fade-in when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSectionFadeIn();
    initializePronunciationButton();
});
