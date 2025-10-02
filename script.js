
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    // --- Navbar fixed on scroll ---
    // This adds a class to the navbar when the user scrolls down,
    // making it appear more distinct or add a shadow.
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust '50' for when you want the effect to kick in
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add a simple shadow for scrolled state (requires CSS for `.navbar.scrolled`)
    // You can add this to your style.css:
    /*
    .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    */


    // --- Hamburger Menu Toggle (Mobile Navigation) ---
    if (hamburger) { // Check if hamburger exists (for safety)
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Prevent body scrolling when mobile menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when a link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) { // If mobile menu is open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = ''; // Restore body scrolling
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links (if not using CSS `scroll-behavior: smooth;`) ---
    // If you add `html { scroll-behavior: smooth; }` to your CSS, you often don't need this JS.
    // However, this JS method gives you more control and works in older browsers.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href'); // Get the href (e.g., "#about")
            const targetElement = document.querySelector(targetId); // Find the element

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Aligns the top of the element to the top of the viewport
                });

                // Optional: Update the URL hash without a jump (good for history)
                // history.pushState(null, null, targetId);
            }
        });
    });

    // --- Simple Contact Form Submission (for demonstration) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // In a real application, you would send this data to a server
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert(`Thank you, ${name}! Your message has been received (not actually sent in this demo).`);

            // Clear the form
            contactForm.reset();
        });
    }

    // --- Hero Image Slider ---
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');

    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length; // Loop around

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.dataset.slide));
                resetInterval();
            });
        });

        // Auto-play
        let autoPlay = setInterval(nextSlide, slideInterval);

        const resetInterval = () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, slideInterval);
        };
    }

    
});