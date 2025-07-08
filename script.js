const form = document.getElementById("registrationForm");
const cardsContainer = document.getElementById("cardsContainer");
const localStorageKey = "registeredUsers";

window.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  users.forEach((user) => createUserCard(user));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const user = { id: Date.now(), fullName, email, phone };
  createUserCard(user);

  // Save to localStorage
  const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  users.push(user);
  localStorage.setItem(localStorageKey, JSON.stringify(users));

  form.reset();
});

/* ===== CARD FUNCTION ===== */
const createUserCard = function (user) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4 mb-4";
  col.dataset.userId = user.id;

  col.innerHTML = `
        <div class="card form-card h-70">
          <img src="https://placecats.com/300/300" class="card-img-top" alt="Cat Image">
          <div class="card-body">
            <h5 class="card-title">${user.fullName}</h5>
            <p class="card-text">${user.email}</p>
            <p class="card-text">${user.phone}</p>
            <button class="btn btn-danger btn-sm w-100 mt-2 delete-btn">Delete</button>
          </div>
        </div>
      `;

  col.querySelector(".delete-btn").addEventListener("click", () => {
    col.remove();
    const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const updated = users.filter((u) => u.id !== user.id);
    localStorage.setItem(localStorageKey, JSON.stringify(updated));
  });

  cardsContainer.appendChild(col);
};

/* ===== TIMER ===== */
let seconds = parseInt(sessionStorage.getItem("seconds")) || 0;
const counterElement = document.getElementById("counter");

// Funzione per formattare il tempo
const formatTime = function(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) {
    return `${s}s`;
  } else {
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  }
}

counterElement.textContent = formatTime(seconds);

setInterval(() => {
  seconds++;
  counterElement.textContent = formatTime(seconds);
  sessionStorage.setItem("seconds", seconds);
}, 1000);