const container = document.getElementById('module-container');
const yamlSource = 'https://raw.githubusercontent.com/rebangkkuser/ModuleForge/refs/heads/main/data/data.yaml';

async function loadModules() {
    try {
        const response = await fetch(yamlSource);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const yamlText = await response.text();
        const modules = jsyaml.load(yamlText);

        if (modules && modules.length > 0) {
            renderModules(modules);
        } else {
            container.innerHTML = '<p>No modules found.</p>';
        }
    } catch (error) {
        container.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error(error);
    }
}

function renderModules(modules) {
    container.innerHTML = modules.map(mod => {
        const icon = mod.icon || 'https://cdn-icons-png.flaticon.com/512/2586/2586488.png';
        const mirror2Html = (mod.downloadLinkMirror2 && mod.downloadLinkMirror2 !== 'N/A') 
            ? `<a class="btn secondary" href="${mod.downloadLinkMirror2}" target="_blank">GitHub Mirror</a>` 
            : '';

        return `
            <div class="module-card">
                <div class="card-header">
                    <img src="${icon}" alt="${mod.name}">
                    <h3>${mod.name}</h3>
                </div>
                <div class="links">
                    <a class="btn primary" href="${mod.downloadLinkMirror1}" target="_blank">Download</a>
                    ${mirror2Html}
                </div>
            </div>
        `;
    }).join('');
}

loadModules();
