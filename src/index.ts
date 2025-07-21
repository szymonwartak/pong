import { Game } from './game';

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game('gameCanvas');
    game.start();

    // Add game instructions
    const container = document.querySelector('.game-container');
    if (container) {
        const instructions = document.createElement('div');
        instructions.style.color = '#fff';
        instructions.style.marginTop = '20px';
        instructions.innerHTML = `
            <h3>Controls:</h3>
            <p>Player 1: W (up) / S (down)</p>
            <p>Player 2: ↑ (up) / ↓ (down)</p>
        `;
        container.appendChild(instructions);
    }
});