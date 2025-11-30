// ===== SCROLL ANIMATIONS & NAVBAR EFFECTS =====
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scroll');
        } else {
            navbar.classList.remove('scroll');
        }
        
        // Scroll animation for elements
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });
});

// ===== LOGIN STATUS UPDATE =====
function updateLoginStatus() {
    const currentUser = localStorage.getItem('hydronest_current_user');
    const loginBtn = document.querySelector('.btn-login');
    
    if (currentUser && loginBtn) {
        const userName = JSON.parse(localStorage.getItem('hydronest_users') || '{}')[currentUser]?.name || 'User';
        loginBtn.textContent = `Logout (${userName})`;
        loginBtn.style.backgroundColor = '#ef4444';
        loginBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('hydronest_current_user');
            loginBtn.textContent = 'Masuk';
            loginBtn.style.backgroundColor = '#10b981';
            loginBtn.onclick = () => goToPage('login');
            alert('Anda telah berhasil logout');
            goToPage('home');
        };
    }
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0)';
    }, 400);
});

function updateThemeIcon() {
    const theme = htmlElement.getAttribute('data-theme');
    themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    hamburger.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// ===== PAGE NAVIGATION =====
const pages = {
    'home': document.getElementById('home-page'),
    'tentang': document.getElementById('about-page'),
    'pembelajaran': document.getElementById('pembelajaran-page'),
    'komunitas': document.getElementById('komunitas-page'),
    'kontak': document.getElementById('kontak-page'),
    'login': document.getElementById('login-page'),
    'signup': document.getElementById('signup-page')
};

function goToPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        if (page) page.style.display = 'none';
    });

    // Show selected page
    if (pages[pageName]) {
        pages[pageName].style.display = 'block';
        window.scrollTo(0, 0);
    }
}

// ===== COURSE FILTERING =====
function filterCourses(level) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter courses
    const courses = document.querySelectorAll('.course-item');
    courses.forEach(course => {
        if (level === 'all' || course.getAttribute('data-level') === level) {
            course.style.display = 'flex';
        } else {
            course.style.display = 'none';
        }
    });
}

// ===== COURSE SEARCH =====
const courseSearch = document.getElementById('courseSearch');
if (courseSearch) {
    courseSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const courses = document.querySelectorAll('.course-item');
        courses.forEach(course => {
            const title = course.querySelector('h3').textContent.toLowerCase();
            const desc = course.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                course.style.display = 'flex';
            } else {
                course.style.display = 'none';
            }
        });
    });
}

// ===== COURSE MODAL =====
const courseModal = document.getElementById('courseModal');

const courseData = {
    'Pengenalan Hidroponik': {
        description: 'Pelajari dasar-dasar sistem hidroponik, sejarah perkembangannya, keuntungan, keterbatasan, dan aplikasinya di berbagai bidang pertanian modern.',
        duration: '2 jam',
        videos: '8',
        rating: '4.8',
        curriculum: [
            'Sejarah dan Perkembangan Hidroponik',
            'Keuntungan vs Kerugian Sistem Hidroponik',
            'Prinsip Dasar Nutrisi Tanaman',
            'Komponen Sistem Hidroponik Dasar',
            'Pemilihan Tanaman untuk Hidroponik',
            'Persiapan Ruang dan Peralatan',
            'Safety dan Best Practices',
            'Q&A dan Tips dari Praktisi'
        ]
    },
    'Sistem NFT': {
        description: 'Teknik film nutrisi (NFT) adalah sistem hidroponik paling ekonomis dan cocok untuk pemula. Pelajari cara membuat, mengoperasikan, dan merawat sistem NFT.',
        duration: '3 jam',
        videos: '12',
        rating: '4.9',
        curriculum: [
            'Pengenalan Sistem NFT',
            'Cara Kerja dan Aliran Nutrisi',
            'Desain dan Perencanaan NFT',
            'Membuat Sistem NFT dari Awal',
            'Instalasi Pompa dan Pipa',
            'Persiapan Larutan Nutrisi',
            'Monitoring Sistem NFT',
            'Troubleshooting Masalah Umum',
            'Optimasi Produksi',
            'Harvest dan Pasca Panen',
            'Studi Kasus Berhasil',
            'Live Q&A Session'
        ]
    },
    'Sistem DWC': {
        description: 'Deep Water Culture adalah sistem hidroponik dengan akar terendam dalam larutan nutrisi. Cocok untuk tanaman sayuran dengan pertumbuhan cepat.',
        duration: '3.5 jam',
        videos: '14',
        rating: '4.7',
        curriculum: [
            'Pengenalan Sistem DWC',
            'Perbedaan DWC vs Sistem Lainnya',
            'Komponen-Komponen DWC',
            'Merancang Sistem DWC Efisien',
            'Perhitungan Kebutuhan Ruang',
            'Pemilihan Tangki dan Material',
            'Sistem Aerasi dan Oksigenasi',
            'Persiapan Larutan Nutrisi',
            'Transplantasi Bibit',
            'Monitoring pH dan EC',
            'Pencegahan Root Rot',
            'Manajemen Alga',
            'Optimasi Lingkungan',
            'Harvest Maksimal'
        ]
    },
    'Manajemen Nutrisi': {
        description: 'Pelajari cara mengatur pH, EC (Electrical Conductivity), dan komposisi nutrisi yang tepat untuk hasil panen maksimal.',
        duration: '2.5 jam',
        videos: '10',
        rating: '4.8',
        curriculum: [
            'Dasar Nutrisi Tanaman',
            'Macro dan Micronutrient',
            'Pemahaman pH dan Perannya',
            'Memukur dan Menyesuaikan pH',
            'Electrical Conductivity (EC) Explained',
            'Mengukur dan Mengontrol EC',
            'Tabel Nutrisi Standar',
            'Menyiapkan Larutan Nutrisi',
            'Monitoring Rutin',
            'Troubleshooting Nutrisi'
        ]
    },
    'Otomasi Hidroponik': {
        description: 'Implementasi sistem otomasi dan monitoring untuk hidroponik skala besar dengan IoT, sensor, dan kontrol otomatis.',
        duration: '4 jam',
        videos: '16',
        rating: '4.6',
        curriculum: [
            'Pengenalan IoT untuk Pertanian',
            'Sensor yang Digunakan',
            'Arduino dan Microcontroller Basics',
            'Merancang Sistem Monitoring',
            'Instalasi Sensor',
            'Programming Dasar',
            'Sistem Alarm Otomatis',
            'Kontrol Pompa Otomatis',
            'Dashboard Monitoring',
            'Integrasi Mobile App',
            'Maintenance Sistem',
            'Troubleshooting Teknis',
            'Skalabilitas Sistem',
            'ROI Analisis',
            'Case Studies',
            'Workshop Hands-on'
        ]
    },
    'Pengenalan Akuaponik': {
        description: 'Pahami konsep dasar akuaponik, siklus nitrogen dalam sistem, dan bagaimana ikan dan tanaman saling menguntungkan.',
        duration: '3 jam',
        videos: '10',
        rating: '4.7',
        curriculum: [
            'Apa itu Akuaponik?',
            'Sejarah dan Perkembangan',
            'Siklus Nitrogen Dijelaskan',
            'Peran Bakteri Nitrifikasi',
            'Hubungan Ikan dan Tanaman',
            'Keuntungan Akuaponik',
            'Tantangan dan Solusi',
            'Persiapan Sistem Awal',
            'Pemilihan Spesies Ikan',
            'Demo Sistem Akuaponik'
        ]
    },
    'Desain Akuaponik': {
        description: 'Rancang sistem akuaponik yang efisien dan berkelanjutan sesuai dengan kebutuhan dan sumber daya Anda.',
        duration: '3.5 jam',
        videos: '12',
        rating: '4.8',
        curriculum: [
            'Prinsip Desain Akuaponik',
            'Menentukan Ukuran Sistem',
            'Perhitungan Kebutuhan Air',
            'Pemilihan Tangki Ikan',
            'Sistem Grow Bed Design',
            'Media Tanam untuk Akuaponik',
            'Sistem Filtering',
            'Sump Tank dan Return Line',
            'Sistem Plumbing',
            'Aerasi dan Oksigenasi',
            'Heat Management',
            'Desain Multi-Tier'
        ]
    },
    'Kesehatan Ekosistem': {
        description: 'Jaga keseimbangan ekosistem akuaponik, identifikasi dan selesaikan masalah umum yang mungkin terjadi.',
        duration: '4 jam',
        videos: '14',
        rating: '4.9',
        curriculum: [
            'Monitoring Ekosistem',
            'Parameter Penting',
            'Penyakit Ikan Umum',
            'Pest Management',
            'Hama Tanaman',
            'Nutrisi Supplement',
            'Tekanan Biologis',
            'Cycling Sistem Baru',
            'Balancing Ikan dan Tanaman',
            'Algae Management',
            'Biofilm Control',
            'Emergency Protocols',
            'Preventive Maintenance',
            'Long-term System Health'
        ]
    },
    'Urban Farming Pemula': {
        description: 'Mulai berkebun di apartemen atau rumah dengan ruang terbatas. Pelajari teknik dan tanaman yang cocok untuk urban farming.',
        duration: '2 jam',
        videos: '8',
        rating: '4.9',
        curriculum: [
            'Konsep Urban Farming',
            'Manfaat Berkebun di Kota',
            'Tanaman Cocok untuk Apartemen',
            'Container dan Pot Selection',
            'Soil dan Media Tanam',
            'Pencahayaan Indoor',
            'Watering Strategies',
            'Harvesting dan Cycling'
        ]
    },
    'Vertical Garden': {
        description: 'Manfaatkan ruang vertikal untuk meningkatkan produksi tanaman dalam area yang terbatas.',
        duration: '2.5 jam',
        videos: '9',
        rating: '4.8',
        curriculum: [
            'Pengenalan Vertical Gardening',
            'Keuntungan Sistem Vertikal',
            'Desain dan Layout',
            'Material dan DIY Options',
            'Sistem Irigasi Vertikal',
            'Tanaman Cocok Vertikal',
            'Maintenance Rutin',
            'Troubleshooting',
            'Showcase Real Projects'
        ]
    },
    'Rooftop Farming': {
        description: 'Gunakan atap rumah atau gedung untuk sistem pertanian produktif dengan pertimbangan struktural dan lingkungan.',
        duration: '3 jam',
        videos: '11',
        rating: '4.7',
        curriculum: [
            'Potensi Rooftop Farming',
            'Structural Assessment',
            'Waterproofing Solutions',
            'Drainage Systems',
            'Container Choices',
            'Tanaman Cocok Atap',
            'Wind Resistance',
            'Irrigation Setup',
            'Monitoring dan Maintenance',
            'Community Benefits',
            'Case Study Jakarta'
        ]
    },
    'Kebun Komunitas': {
        description: 'Bangun kebun komunitas yang memberdayakan lingkungan sekitar dan meningkatkan ketahanan pangan lokal.',
        duration: '3.5 jam',
        videos: '13',
        rating: '4.8',
        curriculum: [
            'Community Gardening Basics',
            'Site Selection dan Persiapan',
            'Building Community Engagement',
            'Governance Structure',
            'Funding dan Resources',
            'Layout Planning',
            'Soil Preparation',
            'Plant Selection',
            'Irrigation Systems',
            'Maintenance Schedule',
            'Harvest Distribution',
            'Educational Workshops',
            'Sustainability Practices'
        ]
    }
};

function openCourseDetail(courseName) {
    const data = courseData[courseName];
    if (!data) return;

    document.getElementById('modalTitle').textContent = courseName;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalDuration').textContent = data.duration;
    document.getElementById('modalVideos').textContent = data.videos;
    document.getElementById('modalRating').textContent = data.rating;

    const curriculumList = document.getElementById('modalCurriculum');
    curriculumList.innerHTML = '';
    data.curriculum.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item}`;
        curriculumList.appendChild(li);
    });

    courseModal.style.display = 'flex';
}

function closeCourseModal() {
    courseModal.style.display = 'none';
}

// Close modal when clicking outside
courseModal.addEventListener('click', (e) => {
    if (e.target === courseModal) {
        closeCourseModal();
    }
});

// ===== FORM SUBMISSIONS =====
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Mohon isi semua field');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('hydronest_users') || '{}');
    if (users[email] && users[email].password === password) {
        localStorage.setItem('hydronest_current_user', email);
        alert(`Selamat datang, ${users[email].name}!`);
        e.target.reset();
        updateLoginStatus();
        goToPage('home');
    } else {
        alert('Email atau password salah!');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    if (!name || !email || !password || !confirm) {
        alert('Mohon isi semua field');
        return;
    }

    if (password !== confirm) {
        alert('Password tidak cocok!');
        return;
    }

    if (password.length < 6) {
        alert('Password minimal 6 karakter');
        return;
    }

    const users = JSON.parse(localStorage.getItem('hydronest_users') || '{}');
    if (users[email]) {
        alert('Email sudah terdaftar!');
        return;
    }

    users[email] = { name, password, createdAt: new Date().toISOString() };
    localStorage.setItem('hydronest_users', JSON.stringify(users));
    
    alert(`Selamat! Akun Anda telah dibuat.\n\nNama: ${name}\nEmail: ${email}\n\nSilakan login dengan akun Anda.`);
    e.target.reset();
    goToPage('login');
}

function submitContact(e) {
    e.preventDefault();
    const nama = document.getElementById('kontakNama').value;
    const email = document.getElementById('kontakEmail').value;
    const subjek = document.getElementById('kontakSubjek').value;
    const pesan = document.getElementById('kontakPesan').value;

    alert(`Terima kasih ${nama}!\n\nPesan Anda telah kami terima:\n\nSubjek: ${subjek}\n\nKami akan menghubungi Anda di ${email} sesegera mungkin.`);
    e.target.reset();
}

function socialLogin(platform) {
    alert(`Login dengan ${platform.toUpperCase()} sedang dalam pengembangan.\n\nSilakan gunakan Email/Password untuk saat ini.`);
}

function enrollCourse() {
    alert('Terima kasih! Anda telah mendaftar kursus ini.\n\nSilakan login untuk melanjutkan pembelajaran.');
    closeCourseModal();
    goToPage('login');
}

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Close other open FAQs
        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== question) {
                q.nextElementSibling.style.display = 'none';
                q.querySelector('i').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current FAQ
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to certain elements
document.querySelectorAll('.featured-card, .course-item, .member-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== HIDE FAQ ANSWERS INITIALLY =====
document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== COMMUNITY FEATURE PAGE FUNCTIONS =====
function openNewTopicForm() {
    const topic = prompt('Masukkan judul topik Anda:');
    if (topic) {
        alert('Topik "' + topic + '" akan ditambahkan ke forum. Fitur ini akan dikembangkan lebih lanjut.');
    }
}

function openShareProjectForm() {
    const project = prompt('Masukkan nama proyek Anda:');
    if (project) {
        alert('Proyek "' + project + '" akan dibagikan. Fitur ini akan dikembangkan lebih lanjut.');
    }
}

function openPartnerForm() {
    const partner = prompt('Masukkan nama mitra yang Anda cari:');
    if (partner) {
        alert('Pencarian mitra untuk "' + partner + '" akan dimulai. Fitur ini akan dikembangkan lebih lanjut.');
    }
}

function registerEvent() {
    alert('Anda telah terdaftar untuk event ini! Silahkan cek email untuk konfirmasi.');
}

function contactPartner() {
    alert('Pesan telah dikirim ke mitra. Mereka akan menghubungi Anda segera.');
}

// ===== MODAL POPUP FUNCTIONS =====
function showDevModal() {
    const modal = document.getElementById('devModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeDevModal() {
    const modal = document.getElementById('devModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('devModal');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// ===== UPDATE LOGIN STATUS ON PAGE LOAD =====
updateLoginStatus();

// ===== ADD SOME INTERACTIVITY =====
console.log('%cHydroNest - Platform Edukasi Pertanian Modern', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cBerkomitmen untuk ketahanan pangan Indonesia melalui teknologi pertanian modern', 'font-size: 14px; color: #10b981;');
