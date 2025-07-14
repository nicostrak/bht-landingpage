// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Code tabs functionality
const codeTabs = document.querySelectorAll('.code-tab');
const codeSnippet = document.getElementById('code-snippet');

const codeExamples = {
    curl: `curl -X POST https://api.boletaapi.com/v1/boletas \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "emisor_rut": "76.543.210-8",
    "receptor_rut": "12.345.678-9",
    "monto": 250000,
    "servicio": "Asesoría contable",
    "fecha": "2023-12-15"
  }'`,
    javascript: `// Ejemplo de emisión de boleta
const response = await fetch('https://api.boletaapi.com/v1/boletas', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        emisor_rut: '76.543.210-8',
        receptor_rut: '12.345.678-9',
        monto: 250000,
        servicio: 'Asesoría contable',
        fecha: '2023-12-15'
    })
});

const data = await response.json();
console.log(data);`,
    python: `import requests

url = "https://api.boletaapi.com/v1/boletas"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "emisor_rut": "76.543.210-8",
    "receptor_rut": "12.345.678-9",
    "monto": 250000,
    "servicio": "Asesoría contable",
    "fecha": "2023-12-15"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`
};

codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        document.querySelector('.code-tab.active').classList.remove('active');
        tab.classList.add('active');
        
        // Update code snippet
        const lang = tab.getAttribute('data-lang');
        codeSnippet.textContent = codeExamples[lang];
        codeSnippet.className = `language-${lang}`;
    });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

document.querySelector('.slider-next').addEventListener('click', () => {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonials.length) nextIndex = 0;
    showTestimonial(nextIndex);
});

document.querySelector('.slider-prev').addEventListener('click', () => {
    let prevIndex = currentTestimonial - 1;
    if (prevIndex < 0) prevIndex = testimonials.length - 1;
    showTestimonial(prevIndex);
});

// Auto-rotate testimonials
setInterval(() => {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonials.length) nextIndex = 0;
    showTestimonial(nextIndex);
}, 5000);

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to your server
        console.log({ name, email, message });
        
        // Show success message (in a real app, you'd handle errors too)
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Scroll animation for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
});