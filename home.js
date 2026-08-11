// ---- Split-flap "now issuing" board ----
const ENTRIES = [
  { flag: "🇺🇸", country: "United States", number: "+1 415 555 0182" },
  { flag: "🇬🇧", country: "United Kingdom", number: "+44 7911 121834" },
  { flag: "🇨🇦", country: "Canada",         number: "+1 647 555 0294" },
  { flag: "🇩🇪", country: "Germany",        number: "+49 176 5501278" },
  { flag: "🇳🇬", country: "Nigeria",        number: "+234 803 400 912" },
  { flag: "🇫🇷", country: "France",         number: "+33 6 12 34 56 78" },
  { flag: "🇦🇪", country: "UAE",            number: "+971 50 123 4567" },
  { flag: "🇿🇦", country: "South Africa",   number: "+27 71 234 5678" },
  { flag: "🇮🇳", country: "India",          number: "+91 98765 43210" },
  { flag: "🇦🇺", country: "Australia",      number: "+61 4 1234 5678" },
];

const ROW_COUNT = 5;
const boardEl = document.getElementById("board");

function maskNumber(num){
  // keep it looking "sample-y" rather than a real deliverable number
  return num.replace(/(\d)(\d)(\d)$/, "$1██");
}

function buildRow(entry){
  const row = document.createElement("div");
  row.className = "board-row";
  row.innerHTML = `
    <span class="board-row__country">${entry.flag} ${entry.country}</span>
    <span class="board-row__number">${maskNumber(entry.number)}</span>
    <span class="board-row__status">ACTIVE</span>
  `;
  return row;
}

function pickEntries(){
  const shuffled = [...ENTRIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, ROW_COUNT);
}

function renderInitial(){
  if(!boardEl) return;
  pickEntries().forEach(entry => boardEl.appendChild(buildRow(entry)));
}

function flipRandomRow(){
  if(!boardEl) return;
  const rows = boardEl.querySelectorAll(".board-row");
  if(!rows.length) return;
  const rowIndex = Math.floor(Math.random() * rows.length);
  const row = rows[rowIndex];
  const entry = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];

  row.classList.remove("flip");
  // force reflow so the animation can restart
  void row.offsetWidth;
  row.innerHTML = `
    <span class="board-row__country">${entry.flag} ${entry.country}</span>
    <span class="board-row__number">${maskNumber(entry.number)}</span>
    <span class="board-row__status">ACTIVE</span>
  `;
  row.classList.add("flip");
}

renderInitial();
setInterval(flipRandomRow, 2200);

// ---- Mobile nav toggle ----
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

if(burger && navLinks){
  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    navLinks.style.display = isOpen ? "flex" : "";
  });
}