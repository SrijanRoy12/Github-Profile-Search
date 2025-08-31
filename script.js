function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) => {
    if (!res.ok) throw new Error("User not found");
    return res.json();
  });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((res) => {
    if (!res.ok) throw new Error("Repos not found");
    return res.json();
  });
}

document.querySelector("#searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.querySelector(".usernameinp").value.trim();

  if (username.length === 0) return;

  getProfileData(username).then(data => {
    document.querySelector("#profileCard").classList.remove("hidden");
    document.querySelector("#avatar").src = data.avatar_url;
    document.querySelector("#name").textContent = data.name || "No Name";
    document.querySelector("#username").textContent = `@${data.login}`;
    document.querySelector("#bio").textContent = data.bio || "No bio available.";
    document.querySelector("#repos").textContent = data.public_repos;
    document.querySelector("#followers").textContent = data.followers;
    document.querySelector("#following").textContent = data.following;
    document.querySelector("#location").textContent = data.location || "N/A";
    document.querySelector("#company").textContent = data.company || "N/A";
    document.querySelector("#blog").textContent = data.blog || "N/A";
  }).catch(err => {
    alert(err.message);
  });

  getRepos(username).then(repos => {
    const repoList = document.querySelector("#repoContainer");
    repoList.innerHTML = "";
    repos.forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${repo.html_url}" class="text-pink-700 hover:underline" target="_blank">${repo.name}</a> - <span class="text-sm text-gray-600">${repo.description || "No description"}</span>`;
      repoList.appendChild(li);
    });
    document.querySelector("#reposList").classList.remove("hidden");
  });
});