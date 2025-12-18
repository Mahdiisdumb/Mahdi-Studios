        document.getElementById('year').textContent = new Date().getFullYear();

        const repoGrid = document.getElementById('repo-grid');
        const avatarImg = document.getElementById('gh-avatar');

        fetch('https://api.github.com/users/Mahdiisdumb')
        .then(res => res.json())
        .then(user => {
        avatarImg.src = user.avatar_url;
        })
        .catch(() => {});



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

        for (const repo of filtered) {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <p style="font-size: 0.85rem; color: var(--muted);">
        ${repo.language || 'Mixed'} · Updated ${new Date(repo.updated_at).toLocaleDateString()}
        </p>
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="cta" style="margin-top: 0.5rem; display: inline-block;">
        View on GitHub
        </a>
        `;

        repoGrid.appendChild(card);
        }
        })
        .catch(() => {
        repoGrid.innerHTML = '<p style="color: var(--muted)">Failed to load GitHub repositories.</p>';
        });