<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>

<script>
const container = document.getElementById('module-container');
const yamlSource = 'https://raw.githubusercontent.com/rebangkkuser/ModuleForge/refs/heads/main/data/data.yaml';

async function loadModules() {
    try {
        const response = await fetch(yamlSource, { cache: 'no-cache' });
        
        if (!response.ok) {
            throw new Error('Falha ao baixar o YAML');
        }

        const yamlText = await response.text();
        const modules = jsyaml.load(yamlText);

        if (!modules || !Array.isArray(modules)) {
            container.innerHTML = '<p>Erro: O YAML não é uma lista de módulos.</p>';
            return;
        }

        if (modules.length === 0) {
            container.innerHTML = '<p>Nenhum módulo encontrado.</p>';
            return;
        }

        let html = '';
        for (let mod of modules) {
            const icon = mod.icon || 'https://cdn-icons-png.flaticon.com/512/2586/2586488.png';
            const mirror2 = (mod.downloadLinkMirror2 && mod.downloadLinkMirror2 !== 'N/A') 
                ? `<a class="btn secondary" href="${mod.downloadLinkMirror2}" target="_blank">Mirror</a>` 
                : '';

            html += `
                <div class="module-card">
                    <div class="card-header">
                        <img src="\( {icon}" alt=" \){mod.name || 'Module'}">
                        <h3>${mod.name || 'Sem nome'}</h3>
                    </div>
                    <div class="links">
                        <a class="btn primary" href="${mod.downloadLinkMirror1}" target="_blank">Download</a>
                        ${mirror2}
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
        console.error(error);
    }
}

loadModules();
</script>
