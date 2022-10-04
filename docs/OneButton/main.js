title = "One Button";

description = `
`;

characters = [
`
llllll
llllll
llllll
llllll
llllll
llllll
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
	ENEMY_SPEED: 1.0
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

//======== GAME FUNCTION ========//


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


//======== GAME  CODES ========//

function update() {
	if (!ticks) {
		waveCount = 0;

		enemies = times(3, () => {
			const posX = 10 * (rndi(0, 5) * 2 + 1);
			const posY = 0;
			return {
				pos: vec(posX, posY),
				speed: 2
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
			const posX = 10 * (rndi(0, 5) * 2 + 1);
			const posY = 0;
			enemies.push({
				pos: vec(posX, posY),
				speed: 2
			});
		}
		waveCount++;
	}

	remove(enemies, (e) => {
		e.pos.y += e.speed;
		color("black");
		char("a", e.pos);

		return (e.pos.y > G.HEIGHT);
	})
	// enemies.forEach((e) => {
	// 	e.pos.y += e.speed;
	// 	if (e.pos.y > G.HEIGHT) {
	// 		e.pos.x = 
	// 		e.pos.y = 0;
	// 	}
	// 	color("black");
	// 	char("a", e.pos);
	// });

	if (input.isJustPressed) player.direction = !player.direction;

	if (player.direction)  player.pos.x += player.speed;
	if (!player.direction) player.pos.x -= player.speed;

	player.pos.clamp(10, G.WIDTH - 10, 0, G.HEIGHT);
	color("black");
	char("b", player.pos);

	const isCollidingWithPlayer = char("b", player.pos).isColliding.char.a;
	if (isCollidingWithPlayer) {
		end();
		play("powerUp");
	}
}
