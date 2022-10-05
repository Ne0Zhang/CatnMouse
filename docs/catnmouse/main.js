title = "Cat and Mouse";

description = `
`;

characters = [
`
 L  L  
LLLLLL
LyLLyL
LlLLlL
 LLLL
  ll
`,`
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
`,`
rrrrrr
rrrrrr
rrrrrr
rrrrrr
rrrrrr
rrrrrr
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 150,
	MIN_X: 10,
	MAX_X: 90,
	ENEMY_SPEED: 1.0
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "simple"
};

//======== GAME FUNCTION ========//
function rndPos () {
	return;
}

//======== GAME OBJECTS ========//
/**
 * @typedef {{
 * pos: Vector,
 * speed: number,
 * direction: boolean
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let enemies;

/**
 * @type { number }
 */
 let waveCount;

 let arrayPos;

//======== GAME  CODES ========//

function update() {
	if (!ticks) {
		waveCount = 0;
		arrayPos = [];

		enemies = times(3, () => {
			const posX = G.MIN_X * (rndi(0, 5) * 2 + 1);
			const posY = 0;
			return {
				pos: vec(posX, posY),
				speed: 1
			}
		});
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.85),
			speed: 1.5,
			direction: true
		};
	}

	// Update/Spawn the Enemies
	if (enemies.length === 0) {
		for (let i = 0; i < 3; i++) {
			const posX = G.MIN_X * (rndi(0, 5) * 2 + 1);
			const posY = 0;
			enemies.push({
				pos: vec(posX, posY),
				speed: 1 + (waveCount * 0.1)
			});
		}
		waveCount++;
	// Check the WaveCount
		// console.log(waveCount);
	}

	// Remove Enemy when it goes out of screen
	remove(enemies, (e) => {
		e.pos.y += e.speed;
		color("black");
		char("a", e.pos);

		return (e.pos.y > G.HEIGHT);
	})

	// If input or player reach the border, change direction
	if (input.isJustPressed || player.pos.x < G.MIN_X || player.pos.x > G.MAX_X) 
		player.direction = !player.direction;
	if (player.direction)  player.pos.x += player.speed; // Go to the Right
	if (!player.direction) player.pos.x -= player.speed; // Go to the Left

	player.pos.clamp(G.MIN_X - 1, G.MAX_X + 1, 0, G.HEIGHT);
	color("black");
	char("b", player.pos);

	// If Player collides with an enemy, Game Over
	const isCollidingWithPlayer = char("b", player.pos).isColliding.char.a;
	if (isCollidingWithPlayer) {
		end();
		play("powerUp");
	}

}
