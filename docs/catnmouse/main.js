title = "Cat-n-Mouse";

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
  LL  
 lLLl
RLLLLR
RLLLLR
 LLLL
 LLLL
`,`
    RR
 lLlRR
 LLLL 
 lLLL
RRLLL
RR  RR
`,`
RR
RRlLl
 LLLL
 LLLl
 LLLRR
RR  RR
`
];

const G = {
	WIDTH: 58,
	HEIGHT: 87,
	MIN_X: 2,
	MAX_X: 56,
	ENEMIES: 7
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

		enemies = times(G.ENEMIES - 3, () => {
			const posX = (rndi(0, G.ENEMIES) * 8) + 5;
			const posY = 0;
			return {
				pos: vec(posX, posY),
				speed: 0.5
			}
		});
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.85),
			speed: 0.6,
			direction: true
		};
	}

	// Update/Spawn the Enemies
	if (enemies.length === 0) {
		for (let i = 0; i < 3; i++) {
			const posX = (rndi(0, G.ENEMIES) * 8) + 5;
			const posY = 0;
			enemies.push({
				pos: vec(posX, posY),
				speed: 0.5 + (waveCount * 0.02)
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
	if (input.isJustPressed || player.pos.x < G.MIN_X + 2 || player.pos.x > G.MAX_X - 2) 
		player.direction = !player.direction;
	if (player.direction)  {
		player.pos.x += player.speed; // Go Right
	}
	if (!player.direction) {
		player.pos.x -= player.speed; 
	}// Go to the Left

	color("black");
	char("b", player.pos);

	// player.pos.clamp(G.MIN_X + 2, G.MAX_X - 2, 0, G.HEIGHT);
	
	const isCollidingWithPlayer = char("b", player.pos).isColliding.char.a;
	if (isCollidingWithPlayer) {
		end();
		play("powerUp");
	}

}
