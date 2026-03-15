'use strict';

/* ── Constants ── */
const STORAGE_KEY = 'packright_data';

const CATEGORIES = [
  { id: 'clothes',     label: '👕 Clothes' },
  { id: 'toiletries',  label: '🧴 Toiletries' },
  { id: 'electronics', label: '🔌 Electronics' },
  { id: 'documents',   label: '📄 Documents' },
  { id: 'health',      label: '💊 Health' },
  { id: 'misc',        label: '📦 Misc' },
];

const TEMPLATES = {
  blank: [],

  beach: [
    { cat: 'clothes',     name: 'Swimsuit' },
    { cat: 'clothes',     name: 'T-shirts (×5)' },
    { cat: 'clothes',     name: 'Shorts (×3)' },
    { cat: 'clothes',     name: 'Flip flops' },
    { cat: 'clothes',     name: 'Sunglasses' },
    { cat: 'clothes',     name: 'Sun hat' },
    { cat: 'clothes',     name: 'Light jacket' },
    { cat: 'toiletries',  name: 'Sunscreen SPF 50+' },
    { cat: 'toiletries',  name: 'After-sun lotion' },
    { cat: 'toiletries',  name: 'Toothbrush & toothpaste' },
    { cat: 'toiletries',  name: 'Shampoo & conditioner' },
    { cat: 'toiletries',  name: 'Deodorant' },
    { cat: 'toiletries',  name: 'Razor' },
    { cat: 'electronics', name: 'Phone charger' },
    { cat: 'electronics', name: 'Power bank' },
    { cat: 'electronics', name: 'Headphones' },
    { cat: 'electronics', name: 'Camera' },
    { cat: 'documents',   name: 'Passport' },
    { cat: 'documents',   name: 'Travel insurance' },
    { cat: 'documents',   name: 'Hotel booking' },
    { cat: 'documents',   name: 'Flight tickets' },
    { cat: 'health',      name: 'Painkillers' },
    { cat: 'health',      name: 'Antihistamine' },
    { cat: 'health',      name: 'Plasters' },
    { cat: 'misc',        name: 'Beach towel' },
    { cat: 'misc',        name: 'Reusable water bottle' },
    { cat: 'misc',        name: 'Book / e-reader' },
  ],

  business: [
    { cat: 'clothes',     name: 'Dress shirts (×3)' },
    { cat: 'clothes',     name: 'Trousers (×2)' },
    { cat: 'clothes',     name: 'Suit jacket' },
    { cat: 'clothes',     name: 'Tie / accessories' },
    { cat: 'clothes',     name: 'Formal shoes' },
    { cat: 'clothes',     name: 'Casual outfit' },
    { cat: 'clothes',     name: 'Socks & underwear' },
    { cat: 'toiletries',  name: 'Toothbrush & toothpaste' },
    { cat: 'toiletries',  name: 'Deodorant' },
    { cat: 'toiletries',  name: 'Shampoo' },
    { cat: 'toiletries',  name: 'Razor / shaving kit' },
    { cat: 'electronics', name: 'Laptop & charger' },
    { cat: 'electronics', name: 'Phone charger' },
    { cat: 'electronics', name: 'Universal adapter' },
    { cat: 'electronics', name: 'Earbuds' },
    { cat: 'electronics', name: 'USB hub' },
    { cat: 'documents',   name: 'Passport / ID' },
    { cat: 'documents',   name: 'Business cards' },
    { cat: 'documents',   name: 'Meeting notes / agenda' },
    { cat: 'documents',   name: 'Hotel booking' },
    { cat: 'documents',   name: 'Flight tickets' },
    { cat: 'health',      name: 'Painkillers' },
    { cat: 'misc',        name: 'Notebook & pen' },
    { cat: 'misc',        name: 'Reusable bag' },
  ],

  winter: [
    { cat: 'clothes',     name: 'Thermal base layer (×2)' },
    { cat: 'clothes',     name: 'Ski jacket' },
    { cat: 'clothes',     name: 'Ski trousers' },
    { cat: 'clothes',     name: 'Warm fleece' },
    { cat: 'clothes',     name: 'Woollen socks (×5)' },
    { cat: 'clothes',     name: 'Ski gloves' },
    { cat: 'clothes',     name: 'Warm hat & balaclava' },
    { cat: 'clothes',     name: 'Goggles' },
    { cat: 'clothes',     name: 'Casual apres-ski clothes' },
    { cat: 'clothes',     name: 'Waterproof boots' },
    { cat: 'toiletries',  name: 'Lip balm with SPF' },
    { cat: 'toiletries',  name: 'Sunscreen SPF 30+' },
    { cat: 'toiletries',  name: 'Moisturiser' },
    { cat: 'toiletries',  name: 'Toothbrush & toothpaste' },
    { cat: 'toiletries',  name: 'Deodorant' },
    { cat: 'electronics', name: 'Phone charger' },
    { cat: 'electronics', name: 'Power bank' },
    { cat: 'electronics', name: 'Camera' },
    { cat: 'documents',   name: 'Passport' },
    { cat: 'documents',   name: 'Travel insurance' },
    { cat: 'documents',   name: 'Ski pass / booking' },
    { cat: 'health',      name: 'Painkillers / ibuprofen' },
    { cat: 'health',      name: 'Plasters & bandages' },
    { cat: 'misc',        name: 'Ski hire confirmation' },
    { cat: 'misc',        name: 'Reusable water bottle' },
  ],

  camping: [
    { cat: 'clothes',     name: 'Hiking boots' },
    { cat: 'clothes',     name: 'Waterproof jacket' },
    { cat: 'clothes',     name: 'Quick-dry trousers (×2)' },
    { cat: 'clothes',     name: 'T-shirts (×3)' },
    { cat: 'clothes',     name: 'Warm fleece / jumper' },
    { cat: 'clothes',     name: 'Woollen socks (×4)' },
    { cat: 'clothes',     name: 'Underwear (×4)' },
    { cat: 'clothes',     name: 'Sun hat' },
    { cat: 'toiletries',  name: 'Biodegradable soap' },
    { cat: 'toiletries',  name: 'Sunscreen' },
    { cat: 'toiletries',  name: 'Insect repellent' },
    { cat: 'toiletries',  name: 'Toothbrush & toothpaste' },
    { cat: 'toiletries',  name: 'Toilet paper' },
    { cat: 'toiletries',  name: 'Hand sanitiser' },
    { cat: 'electronics', name: 'Head torch + spare batteries' },
    { cat: 'electronics', name: 'Phone charger / solar charger' },
    { cat: 'documents',   name: 'Campsite booking' },
    { cat: 'documents',   name: 'Trail maps / GPS' },
    { cat: 'documents',   name: 'ID' },
    { cat: 'health',      name: 'First aid kit' },
    { cat: 'health',      name: 'Painkillers' },
    { cat: 'health',      name: 'Antihistamine' },
    { cat: 'health',      name: 'Blister plasters' },
    { cat: 'misc',        name: 'Tent' },
    { cat: 'misc',        name: 'Sleeping bag' },
    { cat: 'misc',        name: 'Sleeping mat' },
    { cat: 'misc',        name: 'Camping stove & fuel' },
    { cat: 'misc',        name: 'Matches / lighter' },
    { cat: 'misc',        name: 'Reusable water bottle' },
    { cat: 'misc',        name: 'Multi-tool / penknife' },
  ],

  weekend: [
    { cat: 'clothes',     name: 'Casual outfits (×2)' },
    { cat: 'clothes',     name: 'Smart outfit' },
    { cat: 'clothes',     name: 'Comfortable shoes' },
    { cat: 'clothes',     name: 'Socks & underwear (×3)' },
    { cat: 'clothes',     name: 'Pyjamas' },
    { cat: 'toiletries',  name: 'Toothbrush & toothpaste' },
    { cat: 'toiletries',  name: 'Shampoo & conditioner' },
    { cat: 'toiletries',  name: 'Deodorant' },
    { cat: 'toiletries',  name: 'Skincare basics' },
    { cat: 'electronics', name: 'Phone charger' },
    { cat: 'electronics', name: 'Earbuds / headphones' },
    { cat: 'documents',   name: 'ID' },
    { cat: 'documents',   name: 'Hotel / Airbnb booking' },
    { cat: 'health',      name: 'Painkillers' },
    { cat: 'misc',        name: 'Reusable bag' },
    { cat: 'misc',        name: 'Book / e-reader' },
  ],
};

/* ── State ── */
let state = {
  trips: [],       // [{ id, name, items: [{ id, name, cat, checked }] }]
  activeTrip: null // id
};

/* ── Persistence ── */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch (_) { /* ignore */ }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ── Helpers ── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getActiveTrip() {
  return state.trips.find(t => t.id === state.activeTrip) || null;
}

function categoryLabel(catId) {
  return (CATEGORIES.find(c => c.id === catId) || { label: catId }).label;
}

/* ── DOM refs ── */
const $ = id => document.getElementById(id);
const tripBar       = $('trip-bar');
const tripSelect    = $('trip-select');
const emptyState    = $('empty-state');
const tripView      = $('trip-view');
const progressBar   = $('progress-bar');
const progressLabel = $('progress-label');
const progressPct   = $('progress-percent');
const categoriesCtn = $('categories-container');
const newItemInput  = $('new-item-input');
const newItemCat    = $('new-item-category');
const modalOverlay  = $('modal-overlay');
const modalTitle    = $('modal-title');
const tripNameInput = $('trip-name-input');
const templateSel   = $('template-select');
const templateLabel = $('template-label');

/* ── Render ── */
function renderTripSelect() {
  tripSelect.innerHTML = state.trips
    .map(t => `<option value="${t.id}"${t.id === state.activeTrip ? ' selected' : ''}>${t.name}</option>`)
    .join('');
}

function renderCategorySelect() {
  newItemCat.innerHTML = CATEGORIES
    .map(c => `<option value="${c.id}">${c.label}</option>`)
    .join('');
}

function renderProgress(trip) {
  const total   = trip.items.length;
  const checked = trip.items.filter(i => i.checked).length;
  const pct     = total === 0 ? 0 : Math.round((checked / total) * 100);
  progressLabel.textContent = `${checked} of ${total} item${total !== 1 ? 's' : ''} packed`;
  progressPct.textContent   = `${pct}%`;
  progressBar.style.width   = `${pct}%`;
}

function renderCategories(trip) {
  const byCat = {};
  CATEGORIES.forEach(c => { byCat[c.id] = []; });
  trip.items.forEach(item => {
    if (!byCat[item.cat]) byCat[item.cat] = [];
    byCat[item.cat].push(item);
  });

  // Also gather items in unknown categories
  trip.items.forEach(item => {
    if (!byCat[item.cat]) byCat[item.cat] = [item];
  });

  categoriesCtn.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const items = byCat[cat.id] || [];
    if (items.length === 0) return;

    const checked = items.filter(i => i.checked).length;
    const card    = document.createElement('div');
    card.className = 'category-card';
    card.dataset.cat = cat.id;

    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
      <span class="category-title">
        ${cat.label}
        <span class="category-count">${checked}/${items.length}</span>
      </span>
      <span class="category-toggle">▾</span>`;

    const list = document.createElement('ul');
    list.className = 'category-items';

    items.forEach(item => {
      const li  = document.createElement('li');
      li.className = `item-row${item.checked ? ' checked' : ''}`;
      li.dataset.id = item.id;

      const box = document.createElement('div');
      box.className = `item-checkbox${item.checked ? ' checked' : ''}`;
      box.dataset.id = item.id;

      const label = document.createElement('span');
      label.className = `item-label${item.checked ? ' checked' : ''}`;
      label.textContent = item.name;

      const del = document.createElement('button');
      del.className = 'item-delete';
      del.textContent = '✕';
      del.title = 'Remove item';
      del.dataset.id = item.id;

      li.append(box, label, del);
      list.appendChild(li);
    });

    // Toggle collapse
    header.addEventListener('click', () => {
      const toggle = header.querySelector('.category-toggle');
      toggle.classList.toggle('collapsed');
      list.classList.toggle('collapsed');
    });

    card.append(header, list);
    categoriesCtn.appendChild(card);
  });
}

function renderAll() {
  const hasTrips = state.trips.length > 0;
  tripBar.classList.toggle('hidden', !hasTrips);
  emptyState.classList.toggle('hidden', hasTrips);
  tripView.classList.toggle('hidden', !hasTrips);

  if (!hasTrips) return;

  renderTripSelect();
  const trip = getActiveTrip();
  if (!trip) return;

  renderProgress(trip);
  renderCategories(trip);
}

/* ── Modal ── */
let modalMode = 'new'; // 'new' | 'rename'

function openModal(mode) {
  modalMode = mode;
  modalTitle.textContent = mode === 'new' ? 'New Trip' : 'Rename Trip';
  templateLabel.classList.toggle('hidden', mode === 'rename');
  templateSel.classList.toggle('hidden', mode === 'rename');
  $('modal-confirm').textContent = mode === 'new' ? 'Create' : 'Save';
  tripNameInput.value = mode === 'rename' ? (getActiveTrip()?.name || '') : '';
  modalOverlay.classList.remove('hidden');
  setTimeout(() => tripNameInput.focus(), 50);
}

function closeModal() {
  modalOverlay.classList.add('hidden');
}

/* ── Actions ── */
function createTrip(name, templateKey) {
  const items = (TEMPLATES[templateKey] || []).map(t => ({
    id: uid(), name: t.name, cat: t.cat, checked: false
  }));
  const trip = { id: uid(), name, items };
  state.trips.push(trip);
  state.activeTrip = trip.id;
  saveState();
  renderAll();
}

function renameTrip(name) {
  const trip = getActiveTrip();
  if (trip) { trip.name = name; saveState(); renderAll(); }
}

function deleteActiveTrip() {
  state.trips = state.trips.filter(t => t.id !== state.activeTrip);
  state.activeTrip = state.trips.length ? state.trips[0].id : null;
  saveState();
  renderAll();
}

function addItem(name, cat) {
  const trip = getActiveTrip();
  if (!trip) return;
  trip.items.push({ id: uid(), name, cat, checked: false });
  saveState();
  renderAll();
}

function toggleItem(itemId) {
  const trip = getActiveTrip();
  if (!trip) return;
  const item = trip.items.find(i => i.id === itemId);
  if (item) { item.checked = !item.checked; saveState(); renderAll(); }
}

function deleteItem(itemId) {
  const trip = getActiveTrip();
  if (!trip) return;
  trip.items = trip.items.filter(i => i.id !== itemId);
  saveState();
  renderAll();
}

function setAllChecked(value) {
  const trip = getActiveTrip();
  if (!trip) return;
  trip.items.forEach(i => { i.checked = value; });
  saveState();
  renderAll();
}

/* ── Event listeners ── */
// New trip
$('btn-new-trip').addEventListener('click', () => openModal('new'));
$('btn-start').addEventListener('click', () => openModal('new'));

// Modal confirm
$('modal-confirm').addEventListener('click', () => {
  const name = tripNameInput.value.trim();
  if (!name) { tripNameInput.focus(); return; }
  if (modalMode === 'new') {
    createTrip(name, templateSel.value);
  } else {
    renameTrip(name);
  }
  closeModal();
});

// Modal cancel / overlay click
$('modal-cancel').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// Enter key in modal input
tripNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') $('modal-confirm').click();
});

// Rename trip
$('btn-rename-trip').addEventListener('click', () => openModal('rename'));

// Delete trip
$('btn-delete-trip').addEventListener('click', () => {
  const trip = getActiveTrip();
  if (!trip) return;
  if (confirm(`Delete "${trip.name}"? This cannot be undone.`)) {
    deleteActiveTrip();
  }
});

// Switch active trip
tripSelect.addEventListener('change', () => {
  state.activeTrip = tripSelect.value;
  saveState();
  renderAll();
});

// Add item
$('btn-add-item').addEventListener('click', () => {
  const name = newItemInput.value.trim();
  if (!name) { newItemInput.focus(); return; }
  addItem(name, newItemCat.value);
  newItemInput.value = '';
  newItemInput.focus();
});

newItemInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') $('btn-add-item').click();
});

// Check/uncheck all
$('btn-check-all').addEventListener('click',   () => setAllChecked(true));
$('btn-uncheck-all').addEventListener('click', () => setAllChecked(false));

// Delegate: item checkbox & delete
categoriesCtn.addEventListener('click', e => {
  const box = e.target.closest('.item-checkbox');
  const del = e.target.closest('.item-delete');
  const lbl = e.target.closest('.item-label');

  if (box) { toggleItem(box.dataset.id); return; }
  if (del) { deleteItem(del.dataset.id); return; }
  if (lbl) {
    const row = lbl.closest('.item-row');
    if (row) toggleItem(row.dataset.id);
  }
});

/* ── Init ── */
loadState();
renderCategorySelect();

// Ensure active trip is valid
if (state.activeTrip && !state.trips.find(t => t.id === state.activeTrip)) {
  state.activeTrip = state.trips.length ? state.trips[0].id : null;
}

renderAll();
