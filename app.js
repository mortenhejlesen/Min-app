'use strict';

/* ════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════ */

const STORAGE_KEY = 'packright_v2';

const MEMBER_COLORS = [
  '#e74c3c','#e67e22','#3498db','#2ecc71',
  '#9b59b6','#1abc9c','#e91e63','#f39c12',
];

const CATEGORIES = [
  { id: 'clothes',     label: '👕 Clothes' },
  { id: 'toiletries',  label: '🧴 Toiletries' },
  { id: 'electronics', label: '🔌 Electronics' },
  { id: 'documents',   label: '📄 Documents' },
  { id: 'health',      label: '💊 Health' },
  { id: 'kids',        label: '🧸 Kids' },
  { id: 'misc',        label: '📦 Misc' },
];

// ── Smart suggestions master list ──
const SUGGESTIONS = [
  'T-shirts','Shirts','Trousers','Jeans','Shorts','Dress','Skirt',
  'Underwear','Socks','Pyjamas','Swimsuit','Bikini','Swim trunks',
  'Jacket','Coat','Raincoat','Hoodie','Fleece','Jumper','Cardigan',
  'Trainers','Formal shoes','Sandals','Flip flops','Boots','Heels',
  'Belt','Tie','Scarf','Hat','Sunglasses','Gloves',
  'Sports kit','Gym clothes','Running shoes','Ski jacket','Ski trousers',
  'Ski gloves','Thermal base layer','Waterproof jacket','Waterproof boots','Goggles',
  'Toothbrush','Toothpaste','Floss','Mouthwash','Shampoo','Conditioner',
  'Body wash','Soap','Deodorant','Moisturiser','Face wash',
  'Sunscreen','After-sun lotion','Lip balm','Razor','Shaving cream',
  'Makeup','Perfume','Cologne','Hair brush','Hair ties','Dry shampoo',
  'Cotton pads','Tweezers','Toilet paper','Wet wipes','Hand sanitiser',
  'Insect repellent','Bite relief cream',
  'Phone charger','Laptop','Laptop charger','Tablet','Power bank',
  'Universal adapter','USB hub','Headphones','Earbuds','Camera',
  'Memory card','Tripod','E-reader','Portable speaker',
  'Passport','ID card','Driving licence','Flight tickets','Train tickets',
  'Hotel booking','Travel insurance','EHIC card','Vaccination records',
  'Currency / cash','Travel credit card','Emergency contacts',
  'Painkillers','Ibuprofen','Paracetamol','Antihistamine','Plasters',
  'First aid kit','Prescription medication','Vitamins','Eye drops',
  'Contact lenses','Contact solution','Glasses','Inhaler','EpiPen',
  'Nappies','Baby wipes','Nappy cream','Baby food','Formula',
  'Baby bottles','Sippy cup','Dummy','Baby monitor','Travel cot',
  'Baby carrier','Stroller','Favourite toy','Comfort blanket','Stuffed animal',
  'Colouring book','Crayons','Activity book','Night light','White noise machine',
  'Reusable water bottle','Snacks','Book','Playing cards','Travel games',
  'Notebook','Pen','Umbrella','Reusable bag','Packing cubes',
  'Padlock','Luggage scales','Neck pillow','Eye mask','Ear plugs',
  'Beach towel','Microfibre towel','Multi-tool','Torch',
];

// ── Templates ──
const TEMPLATES = {
  blank: [],

  beach: [
    {cat:'clothes',    name:'Swimsuit'},{cat:'clothes',    name:'T-shirts (×5)'},
    {cat:'clothes',    name:'Shorts (×3)'},{cat:'clothes',    name:'Flip flops'},
    {cat:'clothes',    name:'Sunglasses'},{cat:'clothes',    name:'Sun hat'},
    {cat:'clothes',    name:'Light jacket'},
    {cat:'toiletries', name:'Sunscreen SPF 50+'},{cat:'toiletries', name:'After-sun lotion'},
    {cat:'toiletries', name:'Toothbrush & toothpaste'},{cat:'toiletries', name:'Shampoo & conditioner'},
    {cat:'toiletries', name:'Deodorant'},{cat:'toiletries', name:'Insect repellent'},
    {cat:'electronics',name:'Phone charger'},{cat:'electronics',name:'Power bank'},
    {cat:'electronics',name:'Camera'},{cat:'electronics',name:'Headphones'},
    {cat:'documents',  name:'Passport'},{cat:'documents',  name:'Travel insurance'},
    {cat:'documents',  name:'Hotel booking'},{cat:'documents',  name:'Flight tickets'},
    {cat:'health',     name:'Painkillers'},{cat:'health',     name:'Antihistamine'},
    {cat:'misc',       name:'Beach towel'},{cat:'misc',       name:'Reusable water bottle'},
    {cat:'misc',       name:'Book / e-reader'},
  ],

  business: [
    {cat:'clothes',    name:'Dress shirts (×3)'},{cat:'clothes',    name:'Trousers (×2)'},
    {cat:'clothes',    name:'Suit jacket'},{cat:'clothes',    name:'Tie / accessories'},
    {cat:'clothes',    name:'Formal shoes'},{cat:'clothes',    name:'Casual outfit'},
    {cat:'clothes',    name:'Socks & underwear'},
    {cat:'toiletries', name:'Toothbrush & toothpaste'},{cat:'toiletries', name:'Deodorant'},
    {cat:'toiletries', name:'Razor / shaving kit'},{cat:'toiletries', name:'Shampoo'},
    {cat:'electronics',name:'Laptop & charger'},{cat:'electronics',name:'Phone charger'},
    {cat:'electronics',name:'Universal adapter'},{cat:'electronics',name:'Earbuds'},
    {cat:'documents',  name:'Passport / ID'},{cat:'documents',  name:'Business cards'},
    {cat:'documents',  name:'Meeting agenda'},{cat:'documents',  name:'Hotel booking'},
    {cat:'documents',  name:'Flight tickets'},
    {cat:'health',     name:'Painkillers'},
    {cat:'misc',       name:'Notebook & pen'},{cat:'misc',       name:'Reusable bag'},
  ],

  winter: [
    {cat:'clothes',    name:'Thermal base layer (×2)'},{cat:'clothes',    name:'Ski jacket'},
    {cat:'clothes',    name:'Ski trousers'},{cat:'clothes',    name:'Warm fleece'},
    {cat:'clothes',    name:'Woollen socks (×5)'},{cat:'clothes',    name:'Ski gloves'},
    {cat:'clothes',    name:'Warm hat'},{cat:'clothes',    name:'Goggles'},
    {cat:'clothes',    name:'Après-ski clothes'},{cat:'clothes',    name:'Waterproof boots'},
    {cat:'toiletries', name:'Lip balm with SPF'},{cat:'toiletries', name:'Sunscreen SPF 30+'},
    {cat:'toiletries', name:'Moisturiser'},{cat:'toiletries', name:'Toothbrush & toothpaste'},
    {cat:'toiletries', name:'Deodorant'},
    {cat:'electronics',name:'Phone charger'},{cat:'electronics',name:'Power bank'},
    {cat:'documents',  name:'Passport'},{cat:'documents',  name:'Travel insurance'},
    {cat:'documents',  name:'Ski pass / booking'},
    {cat:'health',     name:'Painkillers'},{cat:'health',     name:'Plasters & bandages'},
    {cat:'misc',       name:'Ski hire confirmation'},{cat:'misc',       name:'Reusable water bottle'},
  ],

  camping: [
    {cat:'clothes',    name:'Hiking boots'},{cat:'clothes',    name:'Waterproof jacket'},
    {cat:'clothes',    name:'Quick-dry trousers (×2)'},{cat:'clothes',    name:'T-shirts (×3)'},
    {cat:'clothes',    name:'Warm fleece / jumper'},{cat:'clothes',    name:'Woollen socks (×4)'},
    {cat:'clothes',    name:'Sun hat'},
    {cat:'toiletries', name:'Biodegradable soap'},{cat:'toiletries', name:'Sunscreen'},
    {cat:'toiletries', name:'Insect repellent'},{cat:'toiletries', name:'Toothbrush & toothpaste'},
    {cat:'toiletries', name:'Hand sanitiser'},{cat:'toiletries', name:'Toilet paper'},
    {cat:'electronics',name:'Head torch + batteries'},{cat:'electronics',name:'Phone / solar charger'},
    {cat:'documents',  name:'Campsite booking'},{cat:'documents',  name:'Trail maps'},
    {cat:'health',     name:'First aid kit'},{cat:'health',     name:'Painkillers'},
    {cat:'health',     name:'Blister plasters'},
    {cat:'misc',       name:'Tent'},{cat:'misc',       name:'Sleeping bag'},
    {cat:'misc',       name:'Sleeping mat'},{cat:'misc',       name:'Camping stove & fuel'},
    {cat:'misc',       name:'Matches / lighter'},{cat:'misc',       name:'Multi-tool'},
    {cat:'misc',       name:'Reusable water bottle'},
  ],

  weekend: [
    {cat:'clothes',    name:'Casual outfits (×2)'},{cat:'clothes',    name:'Smart outfit'},
    {cat:'clothes',    name:'Comfortable shoes'},{cat:'clothes',    name:'Socks & underwear (×3)'},
    {cat:'clothes',    name:'Pyjamas'},
    {cat:'toiletries', name:'Toothbrush & toothpaste'},{cat:'toiletries', name:'Shampoo & conditioner'},
    {cat:'toiletries', name:'Deodorant'},{cat:'toiletries', name:'Skincare basics'},
    {cat:'electronics',name:'Phone charger'},{cat:'electronics',name:'Earbuds'},
    {cat:'documents',  name:'ID'},{cat:'documents',  name:'Hotel / Airbnb booking'},
    {cat:'health',     name:'Painkillers'},
    {cat:'misc',       name:'Reusable bag'},{cat:'misc',       name:'Book / e-reader'},
  ],

  baby: [
    {cat:'kids',       name:'Nappies'},{cat:'kids',       name:'Baby wipes'},
    {cat:'kids',       name:'Nappy cream'},{cat:'kids',       name:'Baby food / pouches'},
    {cat:'kids',       name:'Formula'},{cat:'kids',       name:'Baby bottles'},
    {cat:'kids',       name:'Sippy cup'},{cat:'kids',       name:'Dummy / pacifier'},
    {cat:'kids',       name:'Baby monitor'},{cat:'kids',       name:'Travel cot'},
    {cat:'kids',       name:'Baby carrier / sling'},{cat:'kids',       name:'Stroller'},
    {cat:'kids',       name:'Comfort blanket'},{cat:'kids',       name:'Favourite toy'},
    {cat:'kids',       name:'Night light'},{cat:'kids',       name:'White noise machine'},
    {cat:'clothes',    name:'Baby bodysuits'},{cat:'clothes',    name:'Baby sleep suits'},
    {cat:'clothes',    name:'Warm layers for baby'},{cat:'clothes',    name:'Baby sun hat'},
    {cat:'toiletries', name:'Baby bath wash'},{cat:'toiletries', name:'Baby sunscreen'},
    {cat:'toiletries', name:'Baby nail scissors'},
    {cat:'health',     name:'Baby paracetamol (Calpol)'},{cat:'health',     name:'Baby thermometer'},
    {cat:'health',     name:'Teething gel / rings'},
    {cat:'misc',       name:'Changing mat'},{cat:'misc',       name:'Muslin cloths'},
    {cat:'misc',       name:'Bags for dirty clothes'},
  ],

  toddler: [
    {cat:'kids',       name:'Nappies / pull-ups'},{cat:'kids',       name:'Baby wipes'},
    {cat:'kids',       name:'Potty (if training)'},{cat:'kids',       name:'Snacks and drinks'},
    {cat:'kids',       name:'Sippy cup'},{cat:'kids',       name:'Favourite toy'},
    {cat:'kids',       name:'Comfort blanket'},{cat:'kids',       name:'Colouring book & crayons'},
    {cat:'kids',       name:'Activity book'},{cat:'kids',       name:'Night light'},
    {cat:'clothes',    name:'T-shirts (child)'},{cat:'clothes',    name:'Trousers (child)'},
    {cat:'clothes',    name:'Pyjamas (child)'},{cat:'clothes',    name:'Trainers (child)'},
    {cat:'clothes',    name:'Swimsuit (child)'},{cat:'clothes',    name:'Sun hat (child)'},
    {cat:'toiletries', name:"Children's toothbrush & toothpaste"},
    {cat:'toiletries', name:"Children's sunscreen"},
    {cat:'toiletries', name:"Children's insect repellent"},
    {cat:'health',     name:"Children's paracetamol"},
    {cat:'health',     name:"Children's antihistamine"},
    {cat:'health',     name:'Plasters'},
    {cat:'misc',       name:'Buggy / pushchair'},{cat:'misc',       name:'Travel high chair'},
  ],

  school_trip: [
    {cat:'clothes',    name:'Appropriate clothing (check list)'},{cat:'clothes',    name:'Comfortable trainers'},
    {cat:'clothes',    name:'Waterproof jacket'},{cat:'clothes',    name:'Spare socks & underwear'},
    {cat:'clothes',    name:'Pyjamas'},
    {cat:'toiletries', name:'Toothbrush & toothpaste'},{cat:'toiletries', name:'Shampoo (small bottle)'},
    {cat:'toiletries', name:'Deodorant'},
    {cat:'health',     name:'Prescription medication (labelled)'},{cat:'health',     name:'Plasters'},
    {cat:'documents',  name:'Parental consent form'},{cat:'documents',  name:'Medical info / allergy card'},
    {cat:'documents',  name:'Emergency contact numbers'},
    {cat:'misc',       name:'Packed lunch / snacks'},{cat:'misc',       name:'Water bottle (labelled)'},
    {cat:'misc',       name:'Small backpack'},{cat:'misc',       name:'Pocket money (small amount)'},
    {cat:'misc',       name:'Book / cards for downtime'},{cat:'misc',       name:'Torch (if camping)'},
  ],

  sports_camp: [
    {cat:'clothes',    name:'Sports kit (×3)'},{cat:'clothes',    name:'Trainers'},
    {cat:'clothes',    name:'Shin pads'},{cat:'clothes',    name:'Swimming kit'},
    {cat:'clothes',    name:'Casual clothes (×2)'},{cat:'clothes',    name:'Pyjamas'},
    {cat:'clothes',    name:'Waterproof jacket'},{cat:'clothes',    name:'Socks & underwear'},
    {cat:'toiletries', name:'Toothbrush & toothpaste'},{cat:'toiletries', name:'Deodorant'},
    {cat:'toiletries', name:'Shampoo'},{cat:'toiletries', name:'Sunscreen'},
    {cat:'health',     name:'Prescription medication (labelled)'},
    {cat:'health',     name:'Plasters & blister plasters'},
    {cat:'health',     name:'Sports tape / support bandage'},
    {cat:'documents',  name:'Camp information pack'},{cat:'documents',  name:'Emergency contacts'},
    {cat:'documents',  name:'Medical form'},
    {cat:'misc',       name:'Water bottle (labelled)'},{cat:'misc',       name:'Reusable bag'},
    {cat:'misc',       name:'Small amount of pocket money'},{cat:'misc',       name:'Book / cards for rest time'},
  ],
};

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */

let state = {
  trips: [],
  activeTrip: null,
  activeMember: 'all',
  personalTemplates: [],
  kidMode: false,
};

let dragSrcId  = null;
let editItemId = null;
let activeModal = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...state, ...JSON.parse(raw) };
  } catch (_) {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */

const $ = id => document.getElementById(id);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function getActiveTrip() {
  return state.trips.find(t => t.id === state.activeTrip) || null;
}

function getMember(trip, memberId) {
  return (trip.members || []).find(m => m.id === memberId);
}

function visibleItems(trip) {
  if (state.activeMember === 'all') return trip.items;
  return trip.items.filter(i => i.assignedTo === 'all' || i.assignedTo === state.activeMember);
}

function escapeHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ════════════════════════════════════════
   ENCODE / DECODE  (sharing)
════════════════════════════════════════ */

function encodeTrip(trip) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(trip))));
}

function decodeTrip(code) {
  return JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
}

/* ════════════════════════════════════════
   RENDER
════════════════════════════════════════ */

function renderKidMode() {
  document.body.classList.toggle('kid-mode', state.kidMode);
  $('btn-kid-mode').classList.toggle('active', state.kidMode);
  $('kid-stars').classList.toggle('hidden', !state.kidMode);
  $('progress-bar').parentElement.classList.toggle('hidden', state.kidMode);
}

function renderSuggestions() {
  $('suggestions-list').innerHTML = SUGGESTIONS.map(s => `<option value="${s}"></option>`).join('');
}

function renderCategorySelect() {
  const opts = CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
  $('new-item-category').innerHTML = opts;
}

function renderAssigneeSelect(trip, selId = 'new-item-assignee', currentVal = 'all') {
  const el = $(selId);
  el.innerHTML = `<option value="all">👥 Everyone</option>` +
    (trip.members || []).map(m =>
      `<option value="${m.id}"${m.id === currentVal ? ' selected' : ''}>${m.isKid ? '🧒' : '👤'} ${m.name}</option>`
    ).join('');
}

function renderCommentAuthorSelect(trip) {
  $('comment-author').innerHTML = `<option value="">Anonymous</option>` +
    (trip.members || []).map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

function renderTripSelect() {
  $('trip-select').innerHTML = state.trips.map(t =>
    `<option value="${t.id}"${t.id === state.activeTrip ? ' selected' : ''}>${t.name}</option>`
  ).join('');
}

function renderMemberFilter(trip) {
  const members = trip.members || [];
  let html = `<button class="member-pill${state.activeMember === 'all' ? ' active' : ''}" data-member="all">👥 All</button>`;
  members.forEach(m => {
    html += `<button class="member-pill${state.activeMember === m.id ? ' active' : ''}"
      data-member="${m.id}" style="--member-color:${m.color}">
      ${m.isKid ? '🧒' : '👤'} ${m.name}</button>`;
  });
  html += `<button class="member-pill member-add" id="btn-add-member">+ Add member</button>`;
  $('member-filter-row').innerHTML = html;
}

function renderMemberSummary(trip) {
  const members = trip.members || [];
  const el = $('member-summary');
  if (members.length === 0) { el.classList.add('hidden'); return; }
  el.classList.remove('hidden');
  el.innerHTML = members.map(m => {
    const myItems  = trip.items.filter(i => i.assignedTo === m.id || i.assignedTo === 'all');
    const checked  = myItems.filter(i => i.checked).length;
    const pct      = myItems.length === 0 ? 0 : Math.round((checked / myItems.length) * 100);
    const done     = myItems.length > 0 && checked === myItems.length;
    return `<div class="member-card${done ? ' done' : ''}" style="--member-color:${m.color}">
      <div class="member-card-name">${m.isKid ? '🧒' : '👤'} ${m.name}</div>
      <div class="member-card-progress">
        <div class="member-progress-bar">
          <div class="member-progress-fill" style="width:${pct}%;background:${m.color}"></div>
        </div>
        <span class="member-card-pct">${pct}%</span>
      </div>
      ${done ? '<div class="member-done-badge">✓ All packed!</div>' : ''}
    </div>`;
  }).join('');
}

function renderProgress(trip) {
  if (!trip) return;
  const items   = visibleItems(trip);
  const total   = items.length;
  const checked = items.filter(i => i.checked).length;
  const pct     = total === 0 ? 0 : Math.round((checked / total) * 100);

  $('progress-label').textContent = `${checked} of ${total} item${total !== 1 ? 's' : ''} packed`;
  $('progress-percent').textContent = `${pct}%`;
  $('progress-bar').style.width = `${pct}%`;

  if (state.kidMode) {
    const n = 10;
    const filled = Math.round((pct / 100) * n);
    const msg = pct === 100 ? ' 🥳 All done!' : pct >= 75 ? ' 💪 Almost there!' : pct >= 50 ? ' ⭐ Good going!' : pct > 0 ? ' 😊 Great start!' : '';
    $('kid-stars').innerHTML = '⭐'.repeat(filled) + '☆'.repeat(n - filled) + msg;
  }
}

function renderCategories(trip) {
  const items = visibleItems(trip);
  const byCat = {};
  CATEGORIES.forEach(c => { byCat[c.id] = []; });
  items.forEach(item => {
    if (byCat[item.cat]) byCat[item.cat].push(item);
    else { byCat['misc'].push(item); }
  });

  const ctn = $('categories-container');
  ctn.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const catItems = byCat[cat.id] || [];
    if (catItems.length === 0) return;

    const checkedCount = catItems.filter(i => i.checked).length;
    const card = document.createElement('div');
    card.className = 'category-card';

    card.innerHTML = `
      <div class="category-header">
        <span class="category-title">${cat.label}
          <span class="category-count">${checkedCount}/${catItems.length}</span>
        </span>
        <span class="category-toggle">▾</span>
      </div>
      <ul class="category-items"></ul>`;

    const list   = card.querySelector('.category-items');
    const header = card.querySelector('.category-header');
    const toggle = card.querySelector('.category-toggle');

    catItems.forEach(item => list.appendChild(buildItemRow(item, trip)));

    header.addEventListener('click', () => {
      toggle.classList.toggle('collapsed');
      list.classList.toggle('collapsed');
    });

    ctn.appendChild(card);
  });
}

function buildItemRow(item, trip) {
  const li = document.createElement('li');
  li.className = `item-row${item.checked ? ' checked' : ''}`;
  li.dataset.id = item.id;
  li.draggable = true;

  const member   = item.assignedTo !== 'all' ? getMember(trip, item.assignedTo) : null;
  const qtySpan  = (item.qty && item.qty > 1) ? `<span class="item-qty">×${item.qty}</span>` : '';
  const badge    = member ? `<span class="member-badge" style="background:${member.color}" title="${member.name}">${member.name[0].toUpperCase()}</span>` : '';
  const noteIcon = item.note ? `<span class="note-icon" title="${escapeHtml(item.note)}">📝</span>` : '';

  li.innerHTML = `
    <span class="drag-handle">⠿</span>
    <div class="item-checkbox${item.checked ? ' checked' : ''}" data-id="${item.id}"></div>
    <span class="item-label${item.checked ? ' checked' : ''}">${escapeHtml(item.name)}${qtySpan}</span>
    ${badge}${noteIcon}
    <button class="item-edit"   data-id="${item.id}" title="Edit">✏️</button>
    <button class="item-delete" data-id="${item.id}" title="Remove">✕</button>`;

  li.addEventListener('dragstart', handleDragStart);
  li.addEventListener('dragover',  handleDragOver);
  li.addEventListener('drop',      handleDrop);
  li.addEventListener('dragend',   handleDragEnd);

  return li;
}

function renderComments(trip) {
  const comments = trip.comments || [];
  const list     = $('comments-list');

  if (comments.length === 0) {
    list.innerHTML = '<li class="no-comments">No notes yet — add one below.</li>';
    return;
  }

  list.innerHTML = comments.map(c => {
    const author = c.authorId ? getMember(trip, c.authorId) : null;
    const name   = author ? author.name : (c.authorName || 'Anonymous');
    const color  = author ? author.color : '#999';
    const date   = new Date(c.timestamp).toLocaleDateString('en-GB', {
      day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'
    });
    return `<li class="comment-item" data-comment-id="${c.id}">
      <div class="comment-avatar" style="background:${color}">${name[0].toUpperCase()}</div>
      <div class="comment-body">
        <div class="comment-meta">
          <strong>${escapeHtml(name)}</strong>
          <span class="comment-date">${date}</span>
          <button class="comment-delete" data-comment-id="${c.id}">✕</button>
        </div>
        <div class="comment-text">${escapeHtml(c.text)}</div>
      </div>
    </li>`;
  }).join('');
}

function renderAll() {
  const hasTrips = state.trips.length > 0;
  $('trip-bar').classList.toggle('hidden', !hasTrips);
  $('empty-state').classList.toggle('hidden', hasTrips);
  $('trip-view').classList.toggle('hidden', !hasTrips);
  if (!hasTrips) return;

  renderTripSelect();
  renderKidMode();

  const trip = getActiveTrip();
  if (!trip) return;

  renderMemberFilter(trip);
  renderMemberSummary(trip);
  renderProgress(trip);
  renderCategories(trip);
  renderComments(trip);
  renderAssigneeSelect(trip);
  renderCommentAuthorSelect(trip);
}

/* ════════════════════════════════════════
   DRAG AND DROP
════════════════════════════════════════ */

function handleDragStart(e) {
  dragSrcId = this.dataset.id;
  e.dataTransfer.effectAllowed = 'move';
  this.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.item-row').forEach(r => r.classList.remove('drag-over'));
  this.classList.add('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  if (!dragSrcId || dragSrcId === this.dataset.id) return;
  const trip    = getActiveTrip();
  const srcIdx  = trip.items.findIndex(i => i.id === dragSrcId);
  const destIdx = trip.items.findIndex(i => i.id === this.dataset.id);
  if (srcIdx === -1 || destIdx === -1) return;
  const [moved] = trip.items.splice(srcIdx, 1);
  trip.items.splice(destIdx, 0, moved);
  saveState();
  renderAll();
}

function handleDragEnd() {
  document.querySelectorAll('.item-row').forEach(r => r.classList.remove('dragging', 'drag-over'));
  dragSrcId = null;
}

/* ════════════════════════════════════════
   MODAL SYSTEM
════════════════════════════════════════ */

function openModal(id) {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  $(id).classList.remove('hidden');
  $('modal-overlay').classList.remove('hidden');
  activeModal = id;
  const first = $(id).querySelector('input[type="text"]');
  if (first) setTimeout(() => first.focus(), 50);
}

function closeModal() {
  $('modal-overlay').classList.add('hidden');
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  activeModal = null;
}

/* ════════════════════════════════════════
   ACTIONS
════════════════════════════════════════ */

function createTrip(name, templateKey, personalTemplateId) {
  let src;
  if (personalTemplateId) {
    const pt = state.personalTemplates.find(t => t.id === personalTemplateId);
    src = pt ? pt.items : [];
  } else {
    src = TEMPLATES[templateKey] || [];
  }
  const items = src.map(t => ({
    id: uid(), name: t.name, cat: t.cat,
    checked: false, qty: 1, note: '', assignedTo: 'all',
  }));
  const trip = { id: uid(), name, members: [], items, comments: [] };
  state.trips.push(trip);
  state.activeTrip  = trip.id;
  state.activeMember = 'all';
  saveState();
  renderAll();
}

function renameTrip(name) {
  const trip = getActiveTrip();
  if (trip) { trip.name = name; saveState(); renderAll(); }
}

function deleteActiveTrip() {
  state.trips = state.trips.filter(t => t.id !== state.activeTrip);
  state.activeTrip   = state.trips.length ? state.trips[0].id : null;
  state.activeMember = 'all';
  saveState();
  renderAll();
}

function addMember(name, color, isKid) {
  const trip = getActiveTrip();
  if (!trip) return;
  if (!trip.members) trip.members = [];
  trip.members.push({ id: uid(), name, color, isKid });
  saveState();
  renderAll();
}

function addItem(name, cat, assignedTo, qty, note) {
  const trip = getActiveTrip();
  if (!trip) return;
  trip.items.push({ id: uid(), name, cat, checked: false, qty: qty || 1, note: note || '', assignedTo });
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

function setAllChecked(val) {
  const trip = getActiveTrip();
  if (!trip) return;
  visibleItems(trip).forEach(i => { i.checked = val; });
  saveState();
  renderAll();
}

function addComment(text, authorId) {
  const trip = getActiveTrip();
  if (!trip) return;
  if (!trip.comments) trip.comments = [];
  const author = authorId ? getMember(trip, authorId) : null;
  trip.comments.push({
    id: uid(), text,
    authorId: authorId || null,
    authorName: author ? author.name : 'Anonymous',
    timestamp: Date.now(),
  });
  saveState();
  renderComments(trip);
}

function deleteComment(commentId) {
  const trip = getActiveTrip();
  if (!trip) return;
  trip.comments = trip.comments.filter(c => c.id !== commentId);
  saveState();
  renderComments(trip);
}

function saveAsTemplate(name) {
  const trip = getActiveTrip();
  if (!trip) return;
  state.personalTemplates.push({
    id: uid(), name,
    items: trip.items.map(i => ({ name: i.name, cat: i.cat })),
  });
  saveState();
}

function importTrip(code) {
  const trip = decodeTrip(code);
  trip.id       = uid();
  trip.items    = (trip.items    || []).map(i => ({ ...i, id: uid() }));
  trip.members  = (trip.members  || []).map(m => ({ ...m, id: uid() }));
  trip.comments = (trip.comments || []).map(c => ({ ...c, id: uid() }));
  state.trips.push(trip);
  state.activeTrip   = trip.id;
  state.activeMember = 'all';
  saveState();
  renderAll();
}

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */

function showToast(msg) {
  const t = document.createElement('div');
  t.className   = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('visible')));
  setTimeout(() => { t.classList.remove('visible'); setTimeout(() => t.remove(), 300); }, 2500);
}

/* ════════════════════════════════════════
   EVENT LISTENERS
════════════════════════════════════════ */

// ── New trip ──
function openNewTripModal() {
  const ptRow = $('personal-templates-row');
  const ptSel = $('personal-template-select');
  if (state.personalTemplates.length > 0) {
    ptSel.innerHTML = state.personalTemplates.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    ptRow.classList.remove('hidden');
  } else {
    ptRow.classList.add('hidden');
  }
  $('modal-trip-title').textContent = 'New Trip';
  $('modal-trip-confirm').textContent = 'Create';
  $('trip-name-input').value = '';
  $('template-section').classList.remove('hidden');
  $('modal-trip').dataset.mode = 'new';
  openModal('modal-trip');
}

$('btn-new-trip').addEventListener('click', openNewTripModal);
$('btn-start').addEventListener('click',    openNewTripModal);

$('modal-trip-confirm').addEventListener('click', () => {
  const name = $('trip-name-input').value.trim();
  if (!name) { $('trip-name-input').focus(); return; }
  if ($('modal-trip').dataset.mode === 'rename') {
    renameTrip(name);
  } else {
    const ptRow = $('personal-templates-row');
    const ptVal = $('personal-template-select').value;
    if (!ptRow.classList.contains('hidden') && ptVal) {
      createTrip(name, null, ptVal);
    } else {
      createTrip(name, $('template-select').value, null);
    }
  }
  closeModal();
});

$('trip-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('modal-trip-confirm').click(); });

// ── Rename / delete trip ──
$('btn-rename-trip').addEventListener('click', () => {
  const trip = getActiveTrip();
  if (!trip) return;
  $('modal-trip-title').textContent = 'Rename Trip';
  $('modal-trip-confirm').textContent = 'Save';
  $('trip-name-input').value = trip.name;
  $('template-section').classList.add('hidden');
  $('personal-templates-row').classList.add('hidden');
  $('modal-trip').dataset.mode = 'rename';
  openModal('modal-trip');
});

$('btn-delete-trip').addEventListener('click', () => {
  const trip = getActiveTrip();
  if (!trip) return;
  if (confirm(`Delete "${trip.name}"? This cannot be undone.`)) deleteActiveTrip();
});

// ── Switch trip ──
$('trip-select').addEventListener('change', () => {
  state.activeTrip   = $('trip-select').value;
  state.activeMember = 'all';
  saveState();
  renderAll();
});

// ── Kid mode ──
$('btn-kid-mode').addEventListener('click', () => {
  state.kidMode = !state.kidMode;
  saveState();
  renderKidMode();
  renderProgress(getActiveTrip());
});

// ── Add member (delegated, button rendered dynamically) ──
document.addEventListener('click', e => {
  if (e.target.closest('#btn-add-member')) {
    $('color-picker').innerHTML = MEMBER_COLORS.map((c, i) =>
      `<button class="color-swatch${i === 0 ? ' selected' : ''}" style="background:${c}" data-color="${c}" type="button"></button>`
    ).join('');
    $('member-name-input').value = '';
    $('member-is-kid').checked = false;
    openModal('modal-member');
    return;
  }
  // Member filter pill
  const pill = e.target.closest('.member-pill[data-member]');
  if (pill && pill.id !== 'btn-add-member') {
    state.activeMember = pill.dataset.member;
    saveState();
    renderAll();
  }
});

$('color-picker').addEventListener('click', e => {
  const sw = e.target.closest('.color-swatch');
  if (!sw) return;
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  sw.classList.add('selected');
});

$('modal-member-confirm').addEventListener('click', () => {
  const name = $('member-name-input').value.trim();
  if (!name) { $('member-name-input').focus(); return; }
  const sw    = document.querySelector('.color-swatch.selected');
  const color = sw ? sw.dataset.color : MEMBER_COLORS[0];
  addMember(name, color, $('member-is-kid').checked);
  closeModal();
});

$('member-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('modal-member-confirm').click(); });

// ── Share ──
$('btn-share-trip').addEventListener('click', () => {
  const trip = getActiveTrip();
  if (!trip) return;
  const code = encodeTrip(trip);
  const url  = `${location.origin}${location.pathname}?trip=${code}`;
  $('share-link-input').value = url;
  $('share-code-input').value = code;
  openModal('modal-share');
});

function copyAndFeedback(inputId, btnId, label) {
  navigator.clipboard.writeText($(inputId).value).then(() => {
    const btn = $(btnId);
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = label; }, 2000);
  });
}

$('btn-copy-link').addEventListener('click', () => copyAndFeedback('share-link-input', 'btn-copy-link', 'Copy'));
$('btn-copy-code').addEventListener('click', () => copyAndFeedback('share-code-input', 'btn-copy-code', 'Copy'));

// ── Import ──
$('btn-import').addEventListener('click', () => {
  $('import-code-input').value = '';
  $('import-error').classList.add('hidden');
  openModal('modal-import');
});

$('modal-import-confirm').addEventListener('click', () => {
  try {
    importTrip($('import-code-input').value.trim());
    closeModal();
    showToast('Trip imported!');
  } catch (_) {
    $('import-error').classList.remove('hidden');
  }
});

// ── Save as template ──
$('btn-save-template').addEventListener('click', () => {
  const trip = getActiveTrip();
  if (!trip) return;
  $('template-name-input').value = trip.name;
  openModal('modal-save-template');
});

$('modal-save-template-confirm').addEventListener('click', () => {
  const name = $('template-name-input').value.trim();
  if (!name) { $('template-name-input').focus(); return; }
  saveAsTemplate(name);
  closeModal();
  showToast('Template saved!');
});

// ── Add item ──
$('btn-add-item').addEventListener('click', () => {
  const name = $('new-item-input').value.trim();
  if (!name) { $('new-item-input').focus(); return; }
  addItem(
    name,
    $('new-item-category').value,
    $('new-item-assignee').value,
    parseInt($('new-item-qty').value) || 1,
    $('new-item-note').value.trim()
  );
  $('new-item-input').value = '';
  $('new-item-qty').value   = '1';
  $('new-item-note').value  = '';
  $('new-item-input').focus();
});

$('new-item-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('btn-add-item').click(); });

// ── Check / uncheck all ──
$('btn-check-all').addEventListener('click',   () => setAllChecked(true));
$('btn-uncheck-all').addEventListener('click', () => setAllChecked(false));

// ── Category list: delegate item events ──
$('categories-container').addEventListener('click', e => {
  const cb  = e.target.closest('.item-checkbox');
  const del = e.target.closest('.item-delete');
  const ed  = e.target.closest('.item-edit');
  const lbl = e.target.closest('.item-label');
  if (cb)  { toggleItem(cb.dataset.id);  return; }
  if (del) { deleteItem(del.dataset.id); return; }
  if (ed)  { openItemEditModal(ed.dataset.id); return; }
  if (lbl) { const row = lbl.closest('.item-row'); if (row) toggleItem(row.dataset.id); }
});

// ── Item edit modal ──
function openItemEditModal(itemId) {
  editItemId     = itemId;
  const trip     = getActiveTrip();
  const item     = trip.items.find(i => i.id === itemId);
  if (!item) return;

  $('edit-item-name').value = item.name;
  $('edit-item-qty').value  = item.qty || 1;
  $('edit-item-note').value = item.note || '';
  $('edit-item-cat').innerHTML = CATEGORIES.map(c =>
    `<option value="${c.id}"${c.id === item.cat ? ' selected' : ''}>${c.label}</option>`
  ).join('');
  renderAssigneeSelect(trip, 'edit-item-assignee', item.assignedTo);
  openModal('modal-item-edit');
}

$('modal-item-edit-confirm').addEventListener('click', () => {
  const trip = getActiveTrip();
  const item = trip && editItemId ? trip.items.find(i => i.id === editItemId) : null;
  if (!item) return;
  const newName = $('edit-item-name').value.trim();
  if (newName) item.name = newName;
  item.qty        = parseInt($('edit-item-qty').value) || 1;
  item.note       = $('edit-item-note').value.trim();
  item.cat        = $('edit-item-cat').value;
  item.assignedTo = $('edit-item-assignee').value;
  saveState();
  renderAll();
  closeModal();
  editItemId = null;
});

// ── Comments ──
$('btn-add-comment').addEventListener('click', () => {
  const text = $('comment-input').value.trim();
  if (!text) return;
  addComment(text, $('comment-author').value);
  $('comment-input').value = '';
});

$('comment-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('btn-add-comment').click(); });

$('comments-list').addEventListener('click', e => {
  const del = e.target.closest('.comment-delete');
  if (del) deleteComment(del.dataset.commentId);
});

$('btn-toggle-comments').addEventListener('click', () => {
  const body      = $('comments-body');
  const collapsed = body.classList.toggle('hidden');
  $('btn-toggle-comments').textContent = collapsed ? '▸' : '▾';
});

// ── Modal: close on overlay / cancel / Escape ──
$('modal-overlay').addEventListener('click', e => { if (e.target === $('modal-overlay')) closeModal(); });
document.querySelectorAll('.modal-cancel').forEach(b => b.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && activeModal) closeModal(); });

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */

loadState();
renderSuggestions();
renderCategorySelect();

// Validate active trip
if (state.activeTrip && !state.trips.find(t => t.id === state.activeTrip)) {
  state.activeTrip = state.trips.length ? state.trips[0].id : null;
}

// Handle ?trip= URL param (import from share link)
const urlParams    = new URLSearchParams(location.search);
const sharedCode   = urlParams.get('trip');
if (sharedCode) {
  try {
    const incoming = decodeTrip(sharedCode);
    const exists   = state.trips.find(t => t.name === incoming.name);
    if (!exists && confirm(`Import shared trip "${incoming.name}"?`)) {
      importTrip(sharedCode);
    }
    history.replaceState({}, '', location.pathname);
  } catch (_) {}
}

renderAll();
