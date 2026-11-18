const equipment = {
  'nanlite-fc': 'Refletor LED bicolor para montar a luz principal do set e adaptar a temperatura de cor à cena.',
  amaran: 'Painel LED flexível RGB para criar uma fonte difusa em entrevistas, publicidade e sets com espaço limitado.',
  godox: 'Refletor LED RGB compacto para recortes, fundos e pontos de cor em cena.',
  'nanlite-fs': 'Refletor LED RGB para trabalhar com luz branca ou criar recortes e efeitos de cor.',
  century: 'Tripés Century, girafas e acessórios de grip para posicionar luzes, difusores e rebatedores.',
  aputure: 'Mini painel LED RGB para detalhes, contraluz e pontos de cor em espaços apertados.'
};

const navigation = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-toggle');

function setMenu(open) {
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

const filters = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('[data-product]')];
const filterStatus = document.querySelector('#filter-status');

filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
  const category = button.dataset.filter;
  products.forEach((product) => {
    product.hidden = category !== 'all' && product.dataset.category !== category;
  });
  const count = products.filter((product) => !product.hidden).length;
  filterStatus.textContent = count === 1 ? '1 item exibido.' : count + ' itens exibidos.';
}));

const productDialog = document.querySelector('#product-dialog');
const quoteDialog = document.querySelector('#quote-dialog');
const productTitle = document.querySelector('#product-title');
const addProduct = document.querySelector('#add-product');
const selected = new Set();
const quoteForm = document.querySelector('#quote-form');
const selection = document.querySelector('#quote-selection');
const selectedItems = document.querySelector('#selected-items');

[productDialog, quoteDialog].forEach((dialog) => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});

products.forEach((product) => product.querySelector('button').addEventListener('click', () => {
  const name = product.querySelector('h3').textContent;
  productTitle.textContent = name;
  document.querySelector('#product-image').src = product.querySelector('img').src;
  document.querySelector('#product-category').textContent = product.querySelector('.product-type').textContent;
  document.querySelector('#product-description').textContent = equipment[product.dataset.product];
  addProduct.firstChild.textContent = selected.has(name) ? 'Ver orçamento ' : 'Incluir no orçamento ';
  productDialog.showModal();
}));

function renderSelection() {
  selection.hidden = selected.size === 0;
  selectedItems.replaceChildren();
  selected.forEach((name) => {
    const item = document.createElement('li');
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '×';
    remove.setAttribute('aria-label', 'Remover ' + name);
    remove.addEventListener('click', () => {
      selected.delete(name);
      renderSelection();
      (selectedItems.querySelector('button') || quoteForm.elements.nome).focus({preventScroll:true});
    });
    item.append(name, remove);
    selectedItems.append(item);
  });
}

addProduct.addEventListener('click', () => {
  selected.add(productTitle.textContent);
  renderSelection();
  productDialog.close();
  document.querySelector('#contato').scrollIntoView();
  quoteForm.elements.nome.focus({preventScroll:true});
});

const quotePreview = document.querySelector('#quote-preview');
const copyStatus = document.querySelector('#copy-status');

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const name = data.get('nome').trim();
  const dates = data.get('data').trim();
  const project = data.get('projeto').trim();
  if (!name || !project) {
    const field = quoteForm.elements[name ? 'projeto' : 'nome'];
    field.value = '';
    field.reportValidity();
    return;
  }
  const lines = ['Oi, ACTION! Aqui é ' + name + '. Gostaria de pedir um orçamento.'];
  if (dates) lines.push('Data ou período: ' + dates);
  if (selected.size) lines.push('Equipamentos: ' + [...selected].join(', '));
  lines.push('Sobre o projeto: ' + project);
  quotePreview.value = lines.join('\n\n');
  copyStatus.textContent = '';
  quoteDialog.showModal();
});

document.querySelector('#copy-quote').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(quotePreview.value);
    copyStatus.textContent = 'Mensagem copiada.';
  } catch {
    quotePreview.select();
    copyStatus.textContent = 'Texto selecionado. Use a opção de copiar do seu dispositivo.';
  }
});
