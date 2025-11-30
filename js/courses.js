// ========================================
// HYDRONEST - COURSES PAGE JavaScript
// ======================================== 

const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

// ===== Filter Courses =====
function filterCourses(category) {
    courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            // Re-trigger animation
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== Search Courses =====
function searchCourses(query) {
    const lowercaseQuery = query.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(lowercaseQuery) || description.includes(lowercaseQuery)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== Combined Filter and Search =====
function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const currentCategory = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
    const searchQuery = searchInput.value.toLowerCase();
    
    courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        // Check category
        const categoryMatch = currentCategory === 'all' || cardCategory === currentCategory;
        
        // Check search
        const searchMatch = searchQuery === '' || title.includes(searchQuery) || description.includes(searchQuery);
        
        // Apply both filters
        if (categoryMatch && searchMatch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== Event Listeners =====
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Apply filters
        applyFilters();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', () => {
        applyFilters();
    });
}

// ===== Course Card Actions =====
const courseStartButtons = document.querySelectorAll('.course-card .btn-small');
courseStartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const courseTitle = btn.closest('.course-card').querySelector('h3').textContent;
        const difficulty = btn.closest('.course-card').querySelector('.difficulty').textContent;
        
        // Show notification
        if (window.HydroNest && window.HydroNest.showNotification) {
            window.HydroNest.showNotification(`Anda memulai: ${courseTitle} (${difficulty})`, 'success');
        }
        
        // Could redirect to course detail page
        // window.location.href = `course-detail.html?course=${courseTitle}`;
    });
});

// ===== Smooth Scroll for Category Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K = Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput?.focus();
    }
});

console.log('🌱 HydroNest Courses Page Loaded');
