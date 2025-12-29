document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Scroll Reveal Animation --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay based on index if needed, or just let them flow
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger effect if multiple appear at once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const items = document.querySelectorAll('.masonry-item');
    items.forEach(item => observer.observe(item));


    /* --- 2. Lightbox Functionality --- */
    
    // Build Lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;'; // HTML entity for 'X'
    closeBtn.className = 'close-lightbox';
    closeBtn.ariaLabel = 'Close Lightbox';

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Open Lightbox
    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable background scroll
        });
    });

    // Close Lightbox (Function)
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scroll
    };

    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});