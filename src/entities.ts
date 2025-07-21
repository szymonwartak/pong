export class Paddle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number = 8;
    private isVertical: boolean;

    constructor(x: number, y: number, isVertical: boolean = true) {
        this.x = x;
        this.y = y;
        this.isVertical = isVertical;
        if (isVertical) {
            this.width = 10;
            this.height = 100;
        } else {
            this.width = 100;
            this.height = 10;
        }
    }

    moveLeft(canvasWidth: number): void {
        if (!this.isVertical) {
            this.x = Math.max(0, this.x - this.speed);
        }
    }

    moveRight(canvasWidth: number): void {
        if (!this.isVertical) {
            this.x = Math.min(canvasWidth - this.width, this.x + this.speed);
        }
    }

    moveUp(): void {
        if (this.isVertical) {
            this.y = Math.max(0, this.y - this.speed);
        }
    }

    moveDown(canvasHeight: number): void {
        if (this.isVertical) {
            this.y = Math.min(canvasHeight - this.height, this.y + this.speed);
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    getRect(): { x: number; y: number; width: number; height: number } {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

export class Ball {
    private x: number;
    private y: number;
    private radius: number = 8;
    private speedX: number = 5;
    private speedY: number = 5;
    private maxSpeed: number = 15;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(canvasWidth: number, canvasHeight: number): void {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }

    reset(x: number, y: number): void {
        this.x = x;
        this.y = y;
        // Random initial direction
        const angle = Math.random() * 2 * Math.PI;
        const speed = 5;
        this.speedX = speed * Math.cos(angle);
        this.speedY = speed * Math.sin(angle);
    }

    checkPaddleCollision(paddle: Paddle): boolean {
        const paddleRect = paddle.getRect();
        return (
            this.x - this.radius < paddleRect.x + paddleRect.width &&
            this.x + this.radius > paddleRect.x &&
            this.y + this.radius > paddleRect.y &&
            this.y - this.radius < paddleRect.y + paddleRect.height
        );
    }

    reverseX(): void {
        this.speedX = -this.speedX;
        // Increase speed slightly on each hit
        const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        const speedMultiplier = Math.min(this.maxSpeed / currentSpeed, 1.1);
        this.speedX *= speedMultiplier;
        this.speedY *= speedMultiplier;
    }

    reverseY(): void {
        this.speedY = -this.speedY;
        // Increase speed slightly on each hit
        const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        const speedMultiplier = Math.min(this.maxSpeed / currentSpeed, 1.1);
        this.speedX *= speedMultiplier;
        this.speedY *= speedMultiplier;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}