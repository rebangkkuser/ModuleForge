const container = document.getElementById('module-container');
const yamlSource = 'https://raw.githubusercontent.com/rebangkkuser/ModuleForge/refs/heads/main/data/data.yaml';

async function loadModules() {
    try {
        const response = await fetch(yamlSource);
        const yamlText = await response.text();
        const modules = jsyaml.load(yamlText);

        renderModules(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
    }
}

function renderModules(modules) {
    if (!modules || !Array.isArray(modules)) return;

    container.innerHTML = modules.map(mod => `
        <div class="module-card">
            <div class="card-header">
                <img src="${mod.icon}" alt="${mod.name}" onerror="this.src='https://placehold.co/80?text=No+Icon'">
                <h3>${mod.name}</h3>
            </div>
            <div class="links">
                <a class="btn primary" href="${mod.downloadLinkMirror1}" target="_blank">Official Mirror</a>
                <a class="btn secondary" href="${mod.downloadLinkMirror2}" target="_blank">GitHub Mirror</a>
            </div>
        </div>
    `).join('');
}

loadModules();

