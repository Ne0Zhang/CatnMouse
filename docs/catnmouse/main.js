title = "Cat-n-Mouse";

description = `
`;

characters = [
`
 l  l  
llllll
lyllyl
lLllLl
 llll
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
	WIDTH: 90,
	HEIGHT: 135,
	ENEMIES: 11
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "shape"
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
let BORDER = 2;
let MAX_X = G.WIDTH - BORDER;
let MIN_X = BORDER;

//======== GAME  CODES ========//

function update() {
	if (!ticks) {
		console.log(BORDER + "/" + MAX_X + "/" + MIN_X);
		waveCount = 0;

		enemies = times(G.ENEMIES - 4, () => {
			const posX = (rndi(0, G.ENEMIES) * 8) + 5;
			const posY = -5;
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
		for (let i = 0; i < G.ENEMIES - 4; i++) {
			const posX = (rndi(0, G.ENEMIES) * 8) + 5;
			const posY = 0;
			enemies.push({
				pos: vec(posX, posY),
				speed: 0.5 + (waveCount * 0.02)
			});
		}
		waveCount++;
		addScore(1);
		play("powerUp");
		player.speed = player.speed + (waveCount * 0.02);
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
	if (input.isJustPressed || player.pos.x < MIN_X|| player.pos.x > MAX_X) 
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
	}

}
