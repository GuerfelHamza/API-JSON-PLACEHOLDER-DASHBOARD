// main.js
async function loadData() {
  try {
    const [postsRes, usersRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ]);

    if (!postsRes.ok || !usersRes.ok) {
      throw new Error("Erreur de récupération des données");
    }

    const posts = await postsRes.json();
    const users = await usersRes.json();

    const left = document.getElementById("left");
    const right = document.getElementById("right");

    // Helper pour échapper le HTML (sécurité si tu utilises innerHTML)
    function escapeHtml(text) {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return String(text).replace(/[&<>"']/g, (m) => map[m]);
    }

    // Rendu des posts dans la colonne droite
    function renderPosts(postsArray) {
      right.innerHTML = "";
      if (!postsArray.length) {
        right.textContent = "Cet utilisateur n'a aucun post.";
        return;
      }

      postsArray.forEach((p) => {
        const card = document.createElement("div");
        card.className = "post-card";

        const title = document.createElement("h4");
        title.textContent = p.title;

        const body = document.createElement("p");
        body.textContent = p.body;

        card.append(title, body);
        right.appendChild(card);
      });
    }

    // Création liste utilisateurs à gauche
    users.forEach((user) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "user-btn";
      // on met du HTML minimal mais échappé
      btn.innerHTML = `<strong>${escapeHtml(
        user.name
      )}</strong><small>${escapeHtml(user.email)}</small>`;

      btn.addEventListener("click", () => {
        // toggle active
        document
          .querySelectorAll("#left .user-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // filtre posts du user cliqué
        const userPosts = posts.filter((p) => p.userId === user.id);
        renderPosts(userPosts);
      });

      left.appendChild(btn);
    });

    // Sélectionne et affiche le premier user automatiquement (pratique)
    const firstBtn = left.querySelector(".user-btn");
    if (firstBtn) firstBtn.click();
  } catch (err) {
    console.error(err);
    const right = document.getElementById("right");
    if (right)
      right.textContent =
        "Erreur lors du chargement des données. Regarde la console.";
  }
}

document.addEventListener("DOMContentLoaded", loadData);
