title = "One Button";

description = `
`;

characters = [];

const G = {
	WIDTH: 100,
	HEIGHT: 150
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

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


//======== GAME  CODES ========//

function update() {
	if (!ticks) {
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.75),
			speed: 1,
			direction: true
		};
	}

	if (input.isJustPressed) {
		player.direction = !player.direction;
	}
	if (player.direction) {
		color("red");
		player.pos.x += player.speed;
	}
	if (!player.direction) {
		color("blue");
		player.pos.x -= player.speed;
	}

	player.pos.clamp(5, G.WIDTH - 5, 0, G.HEIGHT);

	box(player.pos, 3);
}
