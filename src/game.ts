import { Paddle, Ball } from './entities';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private player1: Paddle; // Left
    private player2: Paddle; // Right
    private player3: Paddle; // Top
    private player4: Paddle; // Bottom
    private ball: Ball;
    private player1Score: number = 0;
    private player2Score: number = 0;
    private player3Score: number = 0;
    private player4Score: number = 0;
    private keys: { [key: string]: boolean } = {};

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        // Create vertical paddles (left and right)
        this.player1 = new Paddle(50, this.canvas.height / 2 - 50, true);
        this.player2 = new Paddle(this.canvas.width - 60, this.canvas.height / 2 - 50, true);

        // Create horizontal paddles (top and bottom)
        this.player3 = new Paddle(this.canvas.width / 2 - 50, 50, false);
        this.player4 = new Paddle(this.canvas.width / 2 - 50, this.canvas.height - 60, false);

        // Create ball
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2);

        // Set up event listeners
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    private update(): void {
        // Player 1 controls (W/S keys) - Left paddle
        if (this.keys['w'] || this.keys['W']) {
            this.player1.moveUp();
        }
        if (this.keys['s'] || this.keys['S']) {
            this.player1.moveDown(this.canvas.height);
        }

        // Player 2 controls (Arrow keys) - Right paddle
        if (this.keys['ArrowUp']) {
            this.player2.moveUp();
        }
        if (this.keys['ArrowDown']) {
            this.player2.moveDown(this.canvas.height);
        }

        // Player 3 controls (A/D keys) - Top paddle
        if (this.keys['a'] || this.keys['A']) {
            this.player3.moveLeft(this.canvas.width);
        }
        if (this.keys['d'] || this.keys['D']) {
            this.player3.moveRight(this.canvas.width);
        }

        // Player 4 controls (J/L keys) - Bottom paddle
        if (this.keys['ArrowLeft']) {
            this.player4.moveLeft(this.canvas.width);
        }
        if (this.keys['ArrowRight']) {
            this.player4.moveRight(this.canvas.width);
        }

        // Update ball
        this.ball.update(this.canvas.width, this.canvas.height);

        // Check collisions with vertical paddles
        if (this.ball.checkPaddleCollision(this.player1) ||
            this.ball.checkPaddleCollision(this.player2)) {
            this.ball.reverseX();
        }

        // Check collisions with horizontal paddles
        if (this.ball.checkPaddleCollision(this.player3) ||
            this.ball.checkPaddleCollision(this.player4)) {
            this.ball.reverseY();
        }

        // Check scoring
        const ballX = this.ball.getX();
        const ballY = this.ball.getY();

        if (ballX < 0) {
            // Player 2 (right) scores
            this.player2Score++;
            this.updateScoreDisplay();
            this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
        } else if (ballX > this.canvas.width) {
            // Player 1 (left) scores
            this.player1Score++;
            this.updateScoreDisplay();
            this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
        } else if (ballY < 0) {
            // Player 4 (bottom) scores
            this.player4Score++;
            this.updateScoreDisplay();
            this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
        } else if (ballY > this.canvas.height) {
            // Player 3 (top) scores
            this.player3Score++;
            this.updateScoreDisplay();
            this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    private draw(): void {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw center lines
        this.ctx.setLineDash([5, 15]);
        this.ctx.beginPath();
        // Vertical center line
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        // Horizontal center line
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw game objects
        this.player1.draw(this.ctx);
        this.player2.draw(this.ctx);
        this.player3.draw(this.ctx);
        this.player4.draw(this.ctx);
        this.ball.draw(this.ctx);
    }

    private updateScoreDisplay(): void {
        const player1ScoreElement = document.getElementById('player1Score');
        const player2ScoreElement = document.getElementById('player2Score');
        const player3ScoreElement = document.getElementById('player3Score');
        const player4ScoreElement = document.getElementById('player4Score');

        if (player1ScoreElement) player1ScoreElement.textContent = this.player1Score.toString();
        if (player2ScoreElement) player2ScoreElement.textContent = this.player2Score.toString();
        if (player3ScoreElement) player3ScoreElement.textContent = this.player3Score.toString();
        if (player4ScoreElement) player4ScoreElement.textContent = this.player4Score.toString();
    }

    public start(): void {
        const gameLoop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }
}