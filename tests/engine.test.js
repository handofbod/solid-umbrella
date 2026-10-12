import test from "node:test";
import assert from "node:assert/strict";
import { Game } from "../game-engine.js";

function run(game, commands) {
  return commands.flatMap((command) => game.command(command));
}

test("direction abbreviations and common synonyms work", () => {
  const game = new Game();
  assert.doesNotMatch(game.describeRoom().text, /boat hook/);
  game.command("examine boat");
  assert.match(game.describeRoom().text, /a boat hook/);
  game.command("n");
  assert.equal(game.state.room, "cliffPath");
  game.command("walk west");
  assert.equal(game.state.room, "grotto");
  assert.match(game.command("x pool")[0].text, /key-shaped/i);
});

test("room descriptions use natural articles and live puzzle state", () => {
  const game = new Game();
  game.state.room = "engineRoom";
  assert.doesNotMatch(game.describeRoom().text, /screwdriver/);
  game.command("examine workbench");
  assert.match(game.describeRoom().text, /a screwdriver/);
  game.state.room = "storageShed";
  game.command("examine shelves");
  assert.match(game.describeRoom().text, /a ceramic fuse/);
  game.state.room = "lanternRoom";
  game.command("set lens to 317");
  assert.match(game.describeRoom().text, /set to 317°/);
  assert.doesNotMatch(game.describeRoom().text, /set to zero/);
});

test("returning to a room changes its atmosphere without changing puzzle state", () => {
  const game = new Game();
  run(game, ["north", "north", "north", "west"]);
  assert.doesNotMatch(game.describeRoom().text, /dark smear/);
  game.command("east");
  game.command("west");
  assert.match(game.describeRoom().text, /dark smear/);
  assert.equal(game.state.visitCounts.galley, 2);
  assert.equal(game.state.flags.power, false);
  game.command("look");
  assert.equal(game.state.visitCounts.galley, 2);
});

test("boat hook retrieves the inaccessible key", () => {
  const game = new Game();
  run(game, ["examine boat", "take hook", "north", "west", "use boat hook on the pool"]);
  assert.ok(game.state.inventory.includes("brass key"));
  assert.equal(game.state.flags.keyRetrieved, true);
});

test("boat hook lowers the shed ladder before the fuse can be taken", () => {
  const game = new Game();
  game.state.room = "storageShed";
  game.state.inventory.push("boat hook");
  game.command("examine shelves");
  assert.match(game.command("take fuse")[0].text, /two feet above/);
  assert.equal(game.state.inventory.includes("ceramic fuse"), false);
  assert.match(game.command("pull ladder with hook")[0].text, /ladder unfolds/);
  assert.equal(game.state.flags.ladderLowered, true);
  game.command("take fuse");
  assert.equal(game.state.inventory.includes("ceramic fuse"), true);
});

test("older saves relocate the untaken fuse without duplicating it", () => {
  const game = new Game({
    room: "bunkRoom",
    visited: ["beach", "bunkRoom"],
    inventory: [],
    roomItems: { bunkRoom: ["ceramic fuse"] },
    flags: {}
  });
  assert.equal(game.state.roomItems.bunkRoom.includes("ceramic fuse"), false);
  assert.equal(game.state.roomItems.storageShed.filter((item) => item === "ceramic fuse").length, 1);
});

test("complete adventure can be solved with natural commands", () => {
  const game = new Game();
  const results = run(game, [
    "examine boat", "grab the hook", "n", "w", "use hook on key", "e", "n", "unlock door with key", "e",
    "examine workbench", "take screwdriver", "w", "w", "n", "examine shelves", "use hook on ladder", "take fuse", "s", "e", "n", "w", "examine cupboards", "take fuel can", "n", "examine floorboard", "s", "e", "s", "e",
    "fuel generator", "install fuse", "start generator", "w", "n", "e", "pry cabinet with screwdriver",
    "take prism", "read log", "w", "up", "up", "put prism in lens", "align lens to 317", "pull lever"
  ]);
  assert.equal(game.state.won, true);
  assert.ok(results.some((result) => result.type === "ending"));
  assert.equal(game.state.visited.length, 13);
});

test("beacon cannot ignite before every requirement is met", () => {
  const game = new Game();
  game.state.room = "lanternRoom";
  const result = game.command("light beacon")[0];
  assert.match(result.text, /No current/i);
  assert.equal(game.state.won, false);
});

test("invalid saved data falls back safely", () => {
  const game = new Game({ room: "nowhere", inventory: ["dragon"] });
  assert.equal(game.state.room, "beach");
  assert.deepEqual(game.state.inventory, []);
});
