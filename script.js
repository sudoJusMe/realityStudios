document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation Smooth Scroll
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && navMenu) { // Ensure elements exist
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                 window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20; // Added 20px offset
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting (Intersection Observer)
    const sections = document.querySelectorAll('section, header'); 
    const navLinks = document.querySelectorAll('nav ul li a');

    const navObserverOptions = {
        root: null,
        threshold: 0.25, 
        rootMargin: "-10% 0px -50% 0px" // Trigger slightly before the section hits center
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                let activeLink;

                if (id) {
                     activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                } else if (entry.target.classList.contains('main-header') || entry.target.classList.contains('hero')) {
                     activeLink = document.querySelector(`nav ul li a[href="#"]`);
                }

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Smooth Scroll for Hero Buttons
    const viewWorkBtn = document.getElementById('btn-work');
    const viewShowreelBtn = document.getElementById('btn-showreel');

    if(viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    }

    if(viewShowreelBtn) {
        viewShowreelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const showreelSection = document.querySelector('#showreel');
            if (showreelSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = showreelSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Auto-play and unmute when clicking the button
                const showreelVideo = document.getElementById('showreel-video');
                const btnMute = document.getElementById('btn-mute');
                if (showreelVideo) {
                    // Reset manual mute preference
                    if (typeof userMuted !== 'undefined') {
                        userMuted = false;
                    }

                    showreelVideo.muted = false;
                    showreelVideo.play();
                    
                    // Update mute button UI
                    if (btnMute) {
                        btnMute.innerHTML = '<i class="fas fa-volume-up"></i>';
                        btnMute.setAttribute('aria-label', 'Mute');
                    }
                }
            }
        });
    }

    // Scroll Reveal Animation for Project Cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        // Set initial state for animation in JS to avoid accessibility issues if JS fails
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s, box-shadow 0.3s ease, border-color 0.3s ease`;
        
        observer.observe(card);
    });

    // Showreel Controls
    const showreelVideo = document.getElementById('showreel-video');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const btnMute = document.getElementById('btn-mute');
    const youtubeBtn = document.querySelector('.youtube-btn');

    let userMuted = false; // Track manual mute state

    if (showreelVideo && btnPlayPause && btnMute) {
        
        // Pause and Mute when opening YouTube link
        if (youtubeBtn) {
            youtubeBtn.addEventListener('click', () => {
                showreelVideo.pause();
                userMuted = true;
                showreelVideo.muted = true;
                showreelVideo.volume = 0;
                
                // Update UI
                btnPlayPause.innerHTML = '<i class="fas fa-play"></i>';
                btnMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
                btnMute.setAttribute('aria-label', 'Unmute');
            });
        }
        
        // Play/Pause Toggle
        btnPlayPause.addEventListener('click', () => {
            if (showreelVideo.paused) {
                showreelVideo.play();
                btnPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
                btnPlayPause.setAttribute('aria-label', 'Pause');
            } else {
                showreelVideo.pause();
                btnPlayPause.innerHTML = '<i class="fas fa-play"></i>';
                btnPlayPause.setAttribute('aria-label', 'Play');
            }
        });

        // Mute/Unmute Toggle
        btnMute.addEventListener('click', () => {
            if (showreelVideo.muted) {
                // User unmuting
                userMuted = false;
                fadeAudio(1, 500); 
                btnMute.innerHTML = '<i class="fas fa-volume-up"></i>';
                btnMute.setAttribute('aria-label', 'Mute');
            } else {
                // User muting
                userMuted = true;
                fadeAudio(0, 500);
                btnMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
                btnMute.setAttribute('aria-label', 'Unmute');
            }
        });

        // Update icons if video state changes externally (e.g. video ends)
        showreelVideo.addEventListener('pause', () => {
            btnPlayPause.innerHTML = '<i class="fas fa-play"></i>';
            btnPlayPause.setAttribute('aria-label', 'Play');
        });
        
        showreelVideo.addEventListener('play', () => {
            btnPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
            btnPlayPause.setAttribute('aria-label', 'Pause');
        });

        // Helper: Audio Fade
        let fadeInterval;
        const fadeAudio = (targetVol, duration) => {
            clearInterval(fadeInterval);
            
            // If starting from muted, set volume to 0 and unmute first
            if (showreelVideo.muted && targetVol > 0) {
                showreelVideo.volume = 0;
                showreelVideo.muted = false;
            }

            const startVol = showreelVideo.volume;
            const diff = targetVol - startVol;
            const steps = 20;
            const interval = duration / steps;
            let step = 0;

            fadeInterval = setInterval(() => {
                step++;
                let newVol = startVol + (diff * (step / steps));
                newVol = Math.max(0, Math.min(1, newVol)); // Clamp
                
                showreelVideo.volume = newVol;

                if (step >= steps) {
                    clearInterval(fadeInterval);
                    if (targetVol === 0) showreelVideo.muted = true;
                }
            }, interval);
        };

        // Auto-play/mute based on visibility
        const showreelSection = document.getElementById('showreel');
        if (showreelSection) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Fade In only if not manually muted
                        showreelVideo.play().catch(() => {});
                        
                        if (!userMuted) {
                            fadeAudio(1, 1500); // 1.5s fade in
                            if (btnMute) {
                                btnMute.innerHTML = '<i class="fas fa-volume-up"></i>';
                                btnMute.setAttribute('aria-label', 'Mute');
                            }
                        }
                    } else {
                        // Fade Out
                        fadeAudio(0, 1000); // 1s fade out
                        
                        if (btnMute) {
                            btnMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
                            btnMute.setAttribute('aria-label', 'Unmute');
                        }
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

            videoObserver.observe(showreelSection);
        }
    }

    // Observe Contact Section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(30px)';
        contactSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(contactSection);
    }

    /* --- Project Modal Logic --- */
    const projectModal = document.getElementById('project-modal');
    const projectFrame = document.getElementById('project-frame');
    const modalCloseBtn = document.querySelector('.modal-close');
    const projectLinks = document.querySelectorAll('.project-card a');

    if (projectModal && projectFrame) {
        
        // Open Modal
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only intercept internal project links
                if (href && !href.startsWith('http') && href.endsWith('.html')) {
                    e.preventDefault();
                    
                    // Set iframe source
                    projectFrame.src = href;
                    
                    // Show modal
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Disable background scroll

                    // Hide "Back to Portfolio" nav inside iframe once loaded
                    projectFrame.onload = () => {
                        try {
                            const frameDoc = projectFrame.contentDocument || projectFrame.contentWindow.document;
                            const backNav = frameDoc.querySelector('.back-nav');
                            if (backNav) {
                                backNav.style.display = 'none';
                            }
                            
                            // Also ensure iframe body doesn't double scroll weirdly if possible
                            // frameDoc.body.style.overflowX = 'hidden';
                        } catch (err) {
                            console.log('Cannot access iframe content (likely cross-origin restriction if not local):', err);
                        }
                    };
                }
            });
        });

        // Close Modal Function
        const closeModal = () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable background scroll
            
            // Clear src after transition to stop video/audio playing
            setTimeout(() => {
                projectFrame.src = '';
            }, 400); 
        };

        // Close Event Listeners
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        // Close when clicking outside the modal content
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
