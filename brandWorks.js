document.addEventListener("DOMContentLoaded", () => {
    const scrollSpeed = 0.6; // Speed of scrolling
    let isPaused = false;
    let scrollAccumulator = 0;
    let animationFrameId;

    const videoGrid = document.querySelector('.video-grid');

    function autoScroll() {
        if (!isPaused) {
            // Check if reached bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
                // Optional: Stop at bottom
                isPaused = true; 
                return;
            }

            scrollAccumulator += scrollSpeed;
            if (scrollAccumulator >= 1) {
                const pixelsToScroll = Math.floor(scrollAccumulator);
                window.scrollBy(0, pixelsToScroll);
                scrollAccumulator -= pixelsToScroll;
            }
        }
        animationFrameId = requestAnimationFrame(autoScroll);
    }

    // Start scrolling after a short delay to let user orient
    setTimeout(() => {
        animationFrameId = requestAnimationFrame(autoScroll);
    }, 1500);

    // Pause on hover (desktop)
    videoGrid.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    videoGrid.addEventListener('mouseleave', () => {
        // Only resume if we haven't reached the bottom manually
        if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 5) {
            isPaused = false;
        }
    });

    // Pause on touch (mobile)
    videoGrid.addEventListener('touchstart', () => {
        isPaused = true;
    }, { passive: true });
    
    // Listen for manual scroll to potentially pause temporarily?
    // For now, simpler is better: if they interact with the grid, it stops.
});
