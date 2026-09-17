const textbooks = [
  { title: 'Textbook 1', file: 'pdfs/textbook-1.pdf' },
  { title: 'Textbook 2', file: 'pdfs/textbook-2.pdf' },
];

const tabs = document.getElementById('tabs');
const viewer = document.getElementById('viewer');
const emptyState = document.getElementById('empty-state');
const currentBook = document.getElementById('current-book');
const openPdf = document.getElementById('open-pdf');

function selectTextbook(index) {
  const selected = textbooks[index];
  viewer.src = selected.file;
  currentBook.textContent = selected.title;
  openPdf.href = selected.file;

  [...tabs.children].forEach((tab, tabIndex) => {
    const isActive = tabIndex === index;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
}

if (!textbooks.length) {
  emptyState.hidden = false;
  viewer.hidden = true;
  openPdf.hidden = true;
} else {
  textbooks.forEach((book, index) => {
    const button = document.createElement('button');
    button.className = 'tab';
    button.type = 'button';
    button.role = 'tab';
    button.id = `tab-${index}`;
    button.setAttribute('aria-controls', 'viewer-panel');
    button.textContent = book.title;
    button.addEventListener('click', () => selectTextbook(index));
    tabs.appendChild(button);
  });

  selectTextbook(0);
}
