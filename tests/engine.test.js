import test from "node:test";
import assert from "node:assert/strict";
import { Game } from "../game-engine.js";

function run(game, commands) {
  return commands.flatMap((command) => game.command(command));
}

test("direction abbreviations and common synonyms work", () => {
  const game = new Game();
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
  assert.match(game.describeRoom().text, /a screwdriver/);
  game.state.room = "bunkRoom";
  assert.match(game.describeRoom().text, /a ceramic fuse/);
  game.state.room = "lanternRoom";
  game.command("set lens to 317");
  assert.match(game.describeRoom().text, /set to 317°/);
  assert.doesNotMatch(game.describeRoom().text, /set to zero/);
});

test("boat hook retrieves the inaccessible key", () => {
  const game = new Game();
  run(game, ["take hook", "north", "west", "use boat hook on the pool"]);
  assert.ok(game.state.inventory.includes("brass key"));
  assert.equal(game.state.flags.keyRetrieved, true);
});

test("complete adventure can be solved with natural commands", () => {
  const game = new Game();
  const results = run(game, [
    "grab the hook", "n", "w", "use hook on key", "e", "n", "unlock door with key", "e",
    "take screwdriver", "w", "n", "w", "take fuel can", "n", "take fuse", "s", "e", "s", "e",
    "fuel generator", "install fuse", "start generator", "w", "n", "e", "pry cabinet with screwdriver",
    "take prism", "read log", "w", "up", "up", "put prism in lens", "align lens to 317", "pull lever"
  ]);
  assert.equal(game.state.won, true);
  assert.ok(results.some((result) => result.type === "ending"));
  assert.equal(game.state.visited.length, 11);
});

test("beacon cannot ignite before every requirement is met", () => {
  const game = new Game();
  game.state.room = "lanternRoom";
  const result = game.command("light beacon")[0];
  assert.match(result.text, /power/);
  assert.match(result.text, /prism/);
  assert.equal(game.state.won, false);
});

test("invalid saved data falls back safely", () => {
  const game = new Game({ room: "nowhere", inventory: ["dragon"] });
  assert.equal(game.state.room, "beach");
  assert.deepEqual(game.state.inventory, []);
});
