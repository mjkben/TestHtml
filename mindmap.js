document.addEventListener('DOMContentLoaded', () => {
    // Générer le premier niveau de nœuds autour du nœud central au chargement du document
    generateNodes(0, document.querySelector('.central-node'), 100); // 100 est le rayon initial pour le niveau 1
});

function generateNodes(level, sourceNode, radius) {
    const numberOfNodes = 4; // Nombre fixe de nœuds par niveau pour simplifier
    const container = document.getElementById('menu-container');
    const angleIncrement = (2 * Math.PI) / numberOfNodes;

    // Suppression des nœuds de niveaux supérieurs existants avant de générer les nouveaux
    document.querySelectorAll(`.node.level-${level + 1}`).forEach(node => node.remove());

    if (level >= 3) return; // Limite à trois niveaux pour éviter une récursion infinie

    for (let i = 0; i < numberOfNodes; i++) {
        const angle = angleIncrement * i;
        const x = radius * Math.cos(angle) + container.offsetWidth / 2;
        const y = radius * Math.sin(angle) + container.offsetHeight / 2;

        const node = document.createElement('div');
        node.className = `node level-${level + 1}`;
        node.textContent = `L${level + 1} - N${i + 1}`;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;

        // Ajuster la taille des nœuds en fonction du niveau
        const nodeSize = level === 0 ? 40 : level === 1 ? 80 : 20; // Taille double pour le niveau suivant, moitié pour le précédent
        node.style.width = `${nodeSize}px`;
        node.style.height = `${nodeSize}px`;
        node.style.lineHeight = `${nodeSize}px`; // Pour centrer le texte verticalement

        node.onclick = () => {
            // Double le rayon pour le niveau suivant, réduit de moitié pour le niveau précédent
            const nextRadius = level === 0 ? radius * 2 : radius / 2;
            generateNodes(level + 1, node, nextRadius);
        };

        container.appendChild(node);
    }
}
