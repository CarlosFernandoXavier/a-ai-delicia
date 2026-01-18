// Função para enviar pedido direto pelo WhatsApp
function sendOrderDirectly(productName, maxComplementos) {
  let message = `Olá! Gostaria de pedir um ${productName}. Pode me dizer os complementos disponíveis para eu escolher?`;
  
 
  
  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/5551999999999?text=${encodedMessage}`, '_blank');
}

// Configura os botões de pedido
document.querySelectorAll('.btn-pedir').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = btn.getAttribute('data-product');
    const maxComp = parseInt(btn.getAttribute('data-max-complementos')) || 0;
    sendOrderDirectly(productName, maxComp);
  });
});

// Animação do contador
function animateCounter() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Quanto menor, mais rápido
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const count = +entry.target.innerText;
        const increment = target / speed;
        
        if (count < target) {
          entry.target.innerText = Math.ceil(count + increment);
          setTimeout(() => {
            const event = new Event('count');
            entry.target.dispatchEvent(event);
          }, 1);
        } else {
          entry.target.innerText = target.toLocaleString('pt-BR');
        }
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counter.innerText = '0';
    counter.addEventListener('count', () => {
      if (+counter.innerText < +counter.getAttribute('data-target')) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(() => {
            const event = new Event('count');
            counter.dispatchEvent(event);
          }, 1);
        } else {
          counter.innerText = target.toLocaleString('pt-BR');
        }
      }
    });
    observer.observe(counter);
  });
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  animateCounter();
});
