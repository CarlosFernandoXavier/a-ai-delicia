// Variáveis globais
let currentProduct = '';
let maxComplementos = 3; // Valor padrão

// Elementos do modal
const modal = document.getElementById('complementosModal');
const closeModal = document.querySelector('.close-modal');
const confirmBtn = document.getElementById('confirmarPedido');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Função para abrir o modal
function openModal(productName, maxComp = 3) {
  currentProduct = productName;
  maxComplementos = maxComp;
  
  // Atualizar o título do modal com o número correto de complementos
  const modalTitle = document.querySelector('.modal-content h3');
  modalTitle.textContent = `Escolha até ${maxComplementos} complementos:`;
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Impede rolagem da página
  
  // Resetar seleções anteriores
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    checkbox.disabled = false;
  });
  
  // Atualizar contador
  updateCounter();
}

// Função para fechar o modal
function closeModalFunc() {
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restaura rolagem da página
}

// Função para atualizar contador de complementos selecionados
function updateCounter() {
  const selected = document.querySelectorAll('input[type="checkbox"]:checked').length;
  const maxText = document.querySelector('.max-complementos');
  
  if (selected >= maxComplementos) {
    // Desabilita checkboxes não selecionados
    checkboxes.forEach(checkbox => {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    });
    maxText.style.color = '#dc3545'; // Vermelho quando atinge o máximo
  } else {
    // Habilita todos os checkboxes
    checkboxes.forEach(checkbox => {
      checkbox.disabled = false;
    });
    maxText.style.color = '#6c757d'; // Cinza padrão
  }
  
  maxText.textContent = `Selecionados: ${selected} de ${maxComplementos} complementos`;
}

// Função para enviar pedido pelo WhatsApp
function sendOrder() {
  const selected = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selected.push(checkbox.value);
    }
  });
  
  let message = `Olá! Gostaria de pedir um ${currentProduct}`;
  
  if (selected.length > 0) {
    if (selected.length === 1) {
      message += ` com ${selected[0]}`;
    } else {
      const last = selected.pop();
      message += ` com ${selected.join(', ')} e ${last}`;
    }
  }
  
  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/5551999999999?text=${encodedMessage}`, '_blank');
  closeModalFunc();
}

// Event Listeners
closeModal.addEventListener('click', closeModalFunc);
confirmBtn.addEventListener('click', sendOrder);

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Limitar número de checkboxes selecionados
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateCounter);
});

// Atualizar botões de pedido para abrir o modal
document.querySelectorAll('.btn-pedir').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = btn.getAttribute('data-product');
    const maxComp = parseInt(btn.getAttribute('data-max-complementos')) || 3;
    openModal(productName, maxComp);
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
