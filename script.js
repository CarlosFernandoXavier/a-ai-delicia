// Efeito de rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adiciona classe de destaque ao cabeçalho ao rolar a página
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Rolar para baixo
        header.style.transform = 'translateY(-100%)';
    } else {
        // Rolar para cima
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Animação de fade-in para as seções
const fadeElements = document.querySelectorAll('.welcome, .location');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Define o estado inicial dos elementos
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Adiciona o evento de scroll
window.addEventListener('scroll', fadeInOnScroll);

// Dispara uma vez no carregamento da página para verificar elementos visíveis
document.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Atualiza o ano no rodapé automaticamente
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', year);
    }
});
