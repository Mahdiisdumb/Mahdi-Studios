// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Grab DOM elements
const repoGrid = document.getElementById('repo-grid');
const avatarImg = document.getElementById('gh-avatar');

// Fetch GitHub avatar
fetch('https://api.github.com/users/Mahdiisdumb')
    .then(res => res.json())
    .then(user => avatarImg.src = user.avatar_url)
    .catch(() => {});

// Fetch repos
fetch('https://api.github.com/users/Mahdiisdumb/repos')
    .then(res => res.json())
    .then(repos => {
        const filtered = repos
            .filter(r => !r.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        if (filtered.length === 0) {
            repoGrid.innerHTML = '<p style="color: var(--muted)">No public repositories found.</p>';
            return;
        }

        filtered.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'card';

            // Random tilt for chaos
            const tilt = Math.floor(Math.random() * 15 - 7); // -7 to 7 degrees
            card.style.transform = `rotate(${tilt}deg)`;

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description provided.'}</p>
                <p style="font-size: 0.85rem; color: var(--muted);">
                    ${repo.language || 'Mixed'} • Updated ${new Date(repo.updated_at).toLocaleDateString()}
                </p>
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="cta" style="margin-top: 0.5rem; display: inline-block;">
                    View on GitHub
                </a>
            `;

            // Hover wobble effect
            card.addEventListener('mouseover', () => {
                const randomRotate = Math.floor(Math.random() * 20 - 10);
                card.style.transform = `rotate(${randomRotate}deg) scale(1.05)`;
            });
            card.addEventListener('mouseout', () => {
                card.style.transform = `rotate(${tilt}deg) scale(1)`;
            });

            repoGrid.appendChild(card);
        });
    })
    .catch(() => {
        repoGrid.innerHTML = '<p style="color: var(--muted)">Failed to load GitHub repositories.</p>';
    });

// Jittery avatar
avatarImg.style.transition = 'transform 0.5s';
setInterval(() => {
    const x = Math.floor(Math.random() * 6 - 3);
    const y = Math.floor(Math.random() * 6 - 3);
    avatarImg.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
}, 800);
