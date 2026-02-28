// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// GitHub avatar
const avatarImg = document.getElementById('gh-avatar');
fetch('https://api.github.com/users/Mahdiisdumb')
    .then(res=>res.json())
    .then(user=>avatarImg.src=user.avatar_url)
    .catch(()=>{});

// GitHub repos
const repoGrid = document.getElementById('repo-grid');
fetch('https://api.github.com/users/Mahdiisdumb/repos')
.then(res=>res.json())
.then(repos=>{
    const filtered = repos.filter(r=>!r.fork).sort((a,b)=> new Date(b.updated_at)-new Date(a.updated_at));
    if(!filtered.length){repoGrid.innerHTML='<p style="color: var(--muted)">No public repositories found.</p>'; return;}
    filtered.forEach(repo=>{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description||'No description provided.'}</p>
            <p style="font-size:0.85rem;color:var(--muted);">${repo.language||'Mixed'} • Updated ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="cta" style="margin-top:0.5rem; display:inline-block;">View on GitHub</a>
        `;
        repoGrid.appendChild(card);
    });
}).catch(()=>{repoGrid.innerHTML='<p style="color: var(--muted)">Failed to load GitHub repositories.</p>';});

// Jitter avatar
avatarImg.style.transition='transform 0.5s';
setInterval(()=>{
    const x=Math.floor(Math.random()*6-3);
    const y=Math.floor(Math.random()*6-3);
    avatarImg.style.transform=`translate(${x}px,${y}px) rotate(${x}deg)`;
},800);

// Divisions data
const divisions = {
    "Unity": {description:"Handles game dev stuff in Unity. Breaks things, makes chaos.", employees:[{name:"Mahdi",role:"Head + Founder + CEO + Chief Chaos Officer"}], volunteers:[], retired:[]},
    "Tools": {description:"Makes tools for projects, mods, spaghetti scripts.", employees:[{name:"Mahdi",role:"Head + Founder + CEO + Chief Chaos Officer"}], volunteers:[], retired:[]},
    "Web": {description:"All the web stuff, site, GitHub chaos, social media.", employees:[{name:"Mahdi",role:"Head + Founder + CEO + Chief Chaos Officer"},{name:"Luke",role:"Social Media Manager"},{name:"Chris",role:"Product Manager"},{name:"Andrew",role:"Social Media Manager"},{name:"Jamanson",role:"Accountant"},{name:"Ibraheem",role:"Secretary"}], volunteers:[{name:"Sean",role:"Volunteer"},{name:"Blake",role:"Volunteer"},{name:"Jacob",role:"Volunteer"},{name:"CJ",role:"Deprecated/Retired"},{name:"Alex",role:"Deprecated/Retired"},{name:"Jason",role:"Deprecated/Retired"}], retired:[{name:"CJ",role:"Deprecated"},{name:"Alex",role:"Deprecated"},{name:"Jason",role:"Deprecated"}]}
};

function formatPeopleList(list) {
    if(!list.length) return "<li>None</li>";
    return list.map(p => `<li>${p.name} (${p.role})</li>`).join("");
}

function showDivision(name){
    const d = divisions[name];
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-description').textContent = d.description;

    document.getElementById('modal-employees').innerHTML = "<strong>Employees:</strong><ul>" + formatPeopleList(d.employees) + "</ul>";
    document.getElementById('modal-volunteers').innerHTML = "<strong>Volunteers:</strong><ul>" + formatPeopleList(d.volunteers) + "</ul>";
    document.getElementById('modal-retired').innerHTML = "<strong>Retired:</strong><ul>" + formatPeopleList(d.retired) + "</ul>";

    document.getElementById('divisionModal').style.display = 'flex';
}

function closeModal(){document.getElementById('divisionModal').style.display='none';}

document.getElementById('divisionModal').addEventListener('click',e=>{if(e.target===document.getElementById('divisionModal'))closeModal();});