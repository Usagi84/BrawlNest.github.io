// Charger les événements au démarrage
window.onload = function() {
  loadEvents();
};

function loadEvents() {
  const eventList = document.getElementById("event-list");
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Supprimer les expirés
  const now = Date.now();
  events = events.filter(ev => now < ev.expiresAt);

  if (events.length === 0) {
    eventList.innerHTML = "Aucun événement pour le moment.";
    localStorage.setItem("events", JSON.stringify(events));
    return;
  }

  eventList.innerHTML = "";
  events.forEach(ev => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${ev.title}</strong><br>${ev.desc}<br>⏳ Fin à ${new Date(ev.expiresAt).toLocaleTimeString()}`;
    eventList.appendChild(div);
  });

  localStorage.setItem("events", JSON.stringify(events));
}

// Gestion du formulaire admin
document.getElementById("admin-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const code = document.getElementById("code").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const duration = parseInt(document.getElementById("duration").value);
  const msg = document.getElementById("admin-msg");

  if (code !== "2005") {
    msg.textContent = "❌ Code admin incorrect !";
    msg.style.color = "red";
    return;
  }

  if (!title || !desc || !duration) {
    msg.textContent = "⚠️ Remplis tous les champs !";
    msg.style.color = "yellow";
    return;
  }

  const expiresAt = Date.now() + duration * 60000;
  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.push({ title, desc, expiresAt });
  localStorage.setItem("events", JSON.stringify(events));

  msg.textContent = "✅ Événement créé avec succès !";
  msg.style.color = "lightgreen";

  loadEvents();
  this.reset();
});
