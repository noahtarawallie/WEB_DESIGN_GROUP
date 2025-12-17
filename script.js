// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
    
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Initialize player filters if on players page
    if (document.querySelector('.filter-btn')) {
        initPlayerFilters();
    }
    
    // Initialize contact form if on contact page
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initPlayerFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const playerCards = document.querySelectorAll('.player-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter players
            playerCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-position') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Add this function to your existing script.js file

function initSocialMedia() {
    // Set up social media links with actual URLs
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        const platform = link.querySelector('i').className;
        let url = '#';
        
        // Set URLs based on platform
        if (platform.includes('twitter')) {
            url = 'https://twitter.com/FASL_SierraLeone';
            link.classList.add('twitter');
        } else if (platform.includes('facebook')) {
            url = 'https://facebook.com/FASL.SierraLeone';
            link.classList.add('facebook');
        } else if (platform.includes('instagram')) {
            url = 'https://instagram.com/FASL.SierraLeone';
            link.classList.add('instagram');
        } else if (platform.includes('youtube')) {
            url = 'https://youtube.com/c/FASLSierraLeone';
            link.classList.add('youtube');
        } else if (platform.includes('whatsapp')) {
            url = 'https://wa.me/23274558899';
            link.classList.add('whatsapp');
        }
        
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
    
    // Add share buttons functionality
    addShareButtons();
}

function addShareButtons() {
    // Check if we're on a specific page (like a news article)
    const pageTitle = document.title;
    const pageUrl = window.location.href;
    
    // Create share buttons container if it doesn't exist
    let shareContainer = document.querySelector('.share-buttons');
    
    if (!shareContainer && (pageTitle.includes('News') || document.querySelector('.news-card'))) {
        // For news pages, add share buttons
        const newsArticles = document.querySelectorAll('.news-card');
        
        newsArticles.forEach((article, index) => {
            const title = article.querySelector('h3').textContent;
            const shareDiv = document.createElement('div');
            shareDiv.className = 'share-buttons';
            shareDiv.innerHTML = `
                <span>Share:</span>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}" target="_blank" class="share-btn twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}" target="_blank" class="share-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://wa.me/?text=${encodeURIComponent(title + ' ' + pageUrl)}" target="_blank" class="share-btn whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            `;
            
            // Add to the news card
            const newsContent = article.querySelector('.news-content');
            newsContent.appendChild(shareDiv);
        });
    }
}

// Update the DOMContentLoaded event to include initSocialMedia
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize social media links
    initSocialMedia();
    
    // ... rest of existing code ...
});