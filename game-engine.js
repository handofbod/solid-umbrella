const ROOM_COUNT = 11;

const rooms = {
  beach: {
    name: "Shingle Beach",
    description: "Rain needles the shore. A wrecked rowing boat lies among the black stones, while high above you the dead eye of Saltwick lighthouse watches the sea. Somewhere beyond the reef, a ship sounds its horn.",
    exits: { north: "cliffPath" },
    details: {
      boat: "The boat has been split from bow to stern. A long boat hook is still clipped beneath one thwart.",
      lighthouse: "The tower is dark. In this weather, that makes it a weapon.",
      sea: "White water claws at the reef. A distant green light appears, vanishes, then appears again—an approaching ship."
    },
    items: ["boat hook"]
  },
  cliffPath: {
    name: "Cliff Path",
    description: "A narrow path climbs between wet gorse and the cliff edge. The lighthouse yard waits to the north; west, a low opening breathes spray from beneath the headland.",
    exits: { south: "beach", north: "yard", west: "grotto" },
    details: { gorse: "Thorny, drenched, and determined to keep hold of your coat.", cliff: "The drop is impressive and immediately regrettable." },
    items: []
  },
  grotto: {
    name: "Tide Grotto",
    description: "The sea has bitten a shallow chamber into the cliff. Each wave fills a dark tide pool, where something brass glints just beyond arm's reach.",
    exits: { east: "cliffPath" },
    details: {
      pool: "The water is shoulder-deep, violent, and very cold. The brass object on its floor has a key-shaped silhouette.",
      key: "A heavy brass key rests beneath the surging water. Your arm will not reach it."
    },
    items: []
  },
  yard: {
    name: "Lighthouse Yard",
    description: "A stone wall shelters the lighthouse yard. The tower door stands open to the north. An iron engine-house door is set into the eastern wall, its lock green with age.",
    exits: { south: "cliffPath", north: "hall", east: "engineRoom" },
    lockedExits: { east: "The engine-house door is locked." },
    details: { door: "The eastern door bears a large brass lock. It looks older than the rust surrounding it.", tower: "The lighthouse is built from pale granite, streaked black by a century of storms." },
    items: []
  },
  hall: {
    name: "Keeper's Hall",
    description: "Oilskins hang like drowned men in the round stone hall. The galley lies west and the chart room east. A spiral stair coils upward into absolute darkness.",
    exits: { south: "yard", west: "galley", east: "chartRoom", up: "lowerStair" },
    darkExit: "With no light in the tower, climbing those broken stairs would be suicide.",
    details: { oilskins: "Three coats. Only two names remain legible: Vale and Rook.", stairs: "Several steps are missing. You will need the tower lights before attempting them." },
    items: []
  },
  galley: {
    name: "Cold Galley",
    description: "Tin cups swing from hooks above a cold stove. Rain ticks into a bucket beneath the window, almost keeping time with the clock that stopped at 9:12. Someone left a heel of bread on the table and never came back for it.",
    exits: { east: "hall", north: "bunkRoom" },
    details: {
      cupboards: "Most are bare. The last contains a sealed can of paraffin, marked ENGINE RESERVE.",
      stove: "Cold ashes and the skeleton of somebody's last breakfast."
    },
    items: ["paraffin can"]
  },
  bunkRoom: {
    name: "Keeper's Quarters",
    description: "Two narrow bunks face a washstand. One is made with military precision; the other is a nest of blankets and old newspapers. A third mattress has been dragged aside, exposing a floorboard scratched with fresh crescent marks.",
    exits: { south: "galley" },
    details: {
      floorboard: "The loose board lifts easily. Beneath it is a dry box containing a replacement fuse.",
      bunks: "Vale's bunk is neatly made. Beneath Rook's pillow is a photograph of three keepers squinting into summer sun. Someone has folded the corner over the youngest face."
    },
    items: ["ceramic fuse"]
  },
  chartRoom: {
    name: "Chart Room",
    description: "Charts paper the curved walls, their coastlines pricked with generations of pencil marks. A storm log lies open on the desk beside a small cabinet whose swollen wooden door will not budge.",
    exits: { west: "hall" },
    details: {
      log: "The last page is in Vale's cramped hand: ‘14 October. Rook took the launch for the doctor before the glass worsened. Winter crystal cleaned and put away from the damp. Old Saltwick line still holds at three-one-seven. Crossley failed twice after dusk; Elias swears the spare is safe beneath his berth. Fog coming.’ There are no later entries.",
      charts: "Every safe course around Saltwick reef is marked in red. The approaching ship is not on one of them.",
      cabinet: "The damp wood has swollen tight around the frame. A tool could pry it open without shattering the contents."
    },
    items: []
  },
  engineRoom: {
    name: "Engine House",
    description: "A brass-and-iron generator fills the cramped room, surrounded by pipes that vanish into the tower wall. A crowded workbench sits beneath a row of tools painted as silhouettes on the whitewashed brick.",
    exits: { west: "yard" },
    details: {
      generator: "An old Crossley generator, cold enough to bead with condensation. A fuel gauge and a small porcelain socket interrupt the control board; below them, the starting lever is polished by years of use.",
      gauge: "Empty. The engine takes paraffin.",
      socket: "The contacts inside are clean, but whatever sat between them is gone.",
      workbench: "Chisels, files and oily rags cover the bench. One broad flat-head screwdriver has been left apart from the rest, its blade recently scored."
    },
    items: ["screwdriver"]
  },
  lowerStair: {
    name: "Spiral Stair",
    description: "Electric bulbs now glow behind wire cages, revealing the long corkscrew of stairs. Wind moans through arrow-slit windows as the tower sways almost imperceptibly.",
    exits: { down: "hall", up: "lanternRoom" },
    details: { windows: "Through the rain-streaked glass, you see the ship's green lamp much closer than before." },
    items: []
  },
  lanternRoom: {
    name: "Lantern Room",
    description: "The great Fresnel lens stands beneath the glass dome, dark but intact. Its central mount is {mountState}, and the bearing wheel is set to {bearing}°. A brass ignition lever waits beside it.",
    exits: { down: "lowerStair" },
    details: {
      lens: "The lens can be aligned by setting its bearing wheel. A diamond-shaped mount at its heart is missing a prism.",
      wheel: "Numbers circle the wheel from 0 to 359. The pointer currently shows {bearing}°.",
      lever: "The IGNITION lever is connected to the powered arc lamp."
    },
    items: []
  }
};

const itemData = {
  "boat hook": { aliases: ["hook", "boat hook", "boathook", "pole"], description: "A long ash pole with a blunt iron hook." },
  "brass key": { aliases: ["key", "brass key"], description: "Heavy, salt-stained, and made for an old lock." },
  "paraffin can": { aliases: ["paraffin", "fuel", "fuel can", "can", "paraffin can"], description: "A sealed can of engine paraffin." },
  "ceramic fuse": { aliases: ["fuse", "ceramic fuse", "replacement fuse"], description: "An intact ceramic generator fuse." },
  screwdriver: { aliases: ["screwdriver", "tool"], description: "A broad, sturdy flat-head screwdriver." },
  prism: { aliases: ["prism", "glass", "crystal", "lens prism"], description: "A diamond of precision-cut glass, made for the lighthouse lens." }
};

const discoveries = {
  beach: { boat: "boat hook" },
  galley: { cupboards: "paraffin can" },
  bunkRoom: { floorboard: "ceramic fuse" },
  engineRoom: { workbench: "screwdriver" }
};

const directionAliases = {
  n: "north", north: "north", s: "south", south: "south", e: "east", east: "east", w: "west", west: "west",
  u: "up", up: "up", upstairs: "up", d: "down", down: "down", downstairs: "down", in: "north", inside: "north", out: "south", outside: "south"
};

const verbAliases = {
  l: "look", look: "look", inspect: "examine", examine: "examine", x: "examine", search: "examine",
  go: "go", walk: "go", move: "go", travel: "go", climb: "go", enter: "go",
  take: "take", get: "take", grab: "take", collect: "take", pick: "take",
  drop: "drop", leave: "drop", inventory: "inventory", inv: "inventory", i: "inventory",
  use: "use", unlock: "unlock", open: "open", pry: "use", lever: "pull", pull: "pull", start: "start", run: "start",
  fuel: "fuel", fill: "fuel", install: "install", insert: "install", fit: "install", put: "install",
  read: "read", set: "set", align: "set", turn: "set", light: "light", ignite: "light",
  help: "help", hint: "hint", hints: "hint", restart: "restart", reset: "restart", wait: "wait"
};

function clean(text) {
  return text.toLowerCase().trim().replace(/[!?.,]/g, "").replace(/\s+/g, " ");
}

function stripFillers(text) {
  return text.replace(/\b(the|a|an|at|to|toward|towards|around|my|with|using|into|in|on)\b/g, " ").replace(/\s+/g, " ").trim();
}

export class Game {
  constructor(savedState = null) {
    this.state = savedState ? this.sanitiseState(savedState) : this.initialState();
  }

  initialState() {
    return {
      room: "beach", inventory: [], visited: ["beach"], turns: 0, won: false,
      roomItems: Object.fromEntries(Object.entries(rooms).map(([id, room]) => [id, [...room.items]])),
      revealedItems: [],
      flags: { keyRetrieved: false, engineUnlocked: false, cabinetOpen: false, generatorFuelled: false, fuseInstalled: false, power: false, prismInstalled: false },
      bearing: 0
    };
  }

  sanitiseState(state) {
    const fresh = this.initialState();
    if (!state || !rooms[state.room]) return fresh;
    return {
      ...fresh, ...state,
      inventory: Array.isArray(state.inventory) ? state.inventory.filter((x) => itemData[x]) : [],
      visited: Array.isArray(state.visited) ? state.visited.filter((x) => rooms[x]) : [state.room],
      revealedItems: Array.isArray(state.revealedItems) ? state.revealedItems.filter((x) => itemData[x]) : [],
      roomItems: Object.fromEntries(Object.keys(rooms).map((id) => [
        id,
        Array.isArray(state.roomItems?.[id]) ? state.roomItems[id].filter((x) => itemData[x]) : fresh.roomItems[id]
      ])),
      flags: { ...fresh.flags, ...(state.flags || {}) }
    };
  }

  room() { return rooms[this.state.room]; }
  itemsHere() { return this.state.roomItems[this.state.room]; }

  roomDescription() {
    let description = this.room().description;
    const { flags } = this.state;
    if (this.state.room === "grotto" && flags.keyRetrieved) {
      description = "The sea has bitten a shallow chamber into the cliff. Each wave fills the dark tide pool and withdraws with a throat-deep sigh.";
    }
    if (this.state.room === "hall" && flags.power) {
      description = "Oilskins hang like drowned men in the round stone hall. The galley lies west and the chart room east. Wire-caged bulbs now pick out the spiral stair climbing through the tower.";
    }
    if (this.state.room === "chartRoom" && flags.cabinetOpen) {
      description = description.replace("whose swollen wooden door will not budge", "whose splintered door now hangs open");
    }
    if (this.state.room === "engineRoom" && flags.power) {
      description = description.replace("fills the cramped room", "fills the cramped room with a steady iron heartbeat");
    }
    return description
      .replace("{bearing}", this.state.bearing)
      .replace("{mountState}", this.state.flags.prismInstalled ? "fitted with its glass prism" : "empty");
  }

  describeRoom() {
    const room = this.room();
    const visible = this.itemsHere().filter((item) => this.state.revealedItems.includes(item));
    const itemLine = visible.length ? ` You can see ${this.list(visible.map((item) => this.withIndefiniteArticle(item)))} here.` : "";
    return { type: "location", title: room.name, text: this.roomDescription() + itemLine, exits: Object.keys(room.exits) };
  }

  command(rawInput) {
    const original = rawInput.trim();
    if (!original) return [{ type: "error", text: "The storm waits for a decision." }];
    const input = clean(original);
    const words = input.split(" ");
    let first = words[0];

    if (directionAliases[first]) return this.takeTurn(() => this.move(directionAliases[first]));
    let verb = verbAliases[first];
    if (!verb && input.startsWith("pick up ")) verb = "take";
    if (!verb) return this.takeTurn(() => [{ type: "error", text: `I don't understand “${original}”. Try a simpler verb, or type HELP.` }]);

    let target = stripFillers(words.slice(1).join(" "));
    if (input.startsWith("pick up ")) target = stripFillers(input.slice(8));
    if (verb === "go") {
      const direction = Object.entries(directionAliases).find(([alias]) => target.split(" ").includes(alias));
      if (direction) target = direction[1];
    }

    const free = ["look", "inventory", "help", "hint", "restart"];
    const act = () => this.execute(verb, target, input);
    return free.includes(verb) ? act() : this.takeTurn(act);
  }

  takeTurn(action) {
    if (this.state.won) return [{ type: "response", text: "The beacon is already burning. The ship is safe." }];
    this.state.turns += 1;
    return action();
  }

  execute(verb, target, input) {
    if (verb === "look") return [this.describeRoom()];
    if (verb === "inventory") return [{ type: "response", text: this.state.inventory.length ? `You are carrying ${this.list(this.state.inventory)}.` : "You are carrying nothing." }];
    if (verb === "help") return [{ type: "system", text: "Use ordinary commands: LOOK, EXAMINE something, TAKE something, USE one thing ON another, READ, OPEN, or GO NORTH. Short forms like N, S, E, W, U, D, X, and I work too. Type HINT only when you want a direct nudge." }];
    if (verb === "hint") return [{ type: "system", text: this.hint() }];
    if (verb === "restart") return [{ type: "restart", text: "Restart requested." }];
    if (verb === "go") return this.move(directionAliases[target] || target);
    if (verb === "examine" || verb === "read") return this.examine(target || (verb === "read" ? "log" : "room"));
    if (verb === "take") return this.take(target);
    if (verb === "drop") return this.drop(target);
    if (["use", "unlock", "open"].includes(verb)) return this.use(target, input);
    if (verb === "fuel") return this.fuel(target);
    if (verb === "install") return this.install(target, input);
    if (verb === "start") return this.start(target);
    if (verb === "set") return this.setBearing(input);
    if (verb === "pull" || verb === "light") return this.ignite(target);
    if (verb === "wait") return [{ type: "response", text: "You listen. The ship's horn sounds again, nearer now. Waiting will not help it." }];
    return [{ type: "error", text: "That will not help here." }];
  }

  move(direction) {
    const room = this.room();
    if (!directionAliases[direction] && !["north", "south", "east", "west", "up", "down"].includes(direction)) {
      return [{ type: "error", text: "Which direction? Try north, south, east, west, up, or down." }];
    }
    direction = directionAliases[direction] || direction;
    if (this.state.room === "yard" && direction === "east" && !this.state.flags.engineUnlocked) return [{ type: "error", text: room.lockedExits.east }];
    if (this.state.room === "hall" && direction === "up" && !this.state.flags.power) return [{ type: "error", text: room.darkExit }];
    const destination = room.exits[direction];
    if (!destination) return [{ type: "error", text: `You cannot go ${direction} from here.` }];
    this.state.room = destination;
    if (!this.state.visited.includes(destination)) this.state.visited.push(destination);
    return [this.describeRoom()];
  }

  examine(target) {
    if (!target || ["room", "around", "here"].includes(target)) return [this.describeRoom()];
    const visibleItems = this.itemsHere().filter((candidate) => this.state.revealedItems.includes(candidate));
    const item = this.resolveItem(target, [...this.state.inventory, ...visibleItems]);
    if (item) return [{ type: "response", text: itemData[item].description }];
    const detailKey = Object.keys(this.room().details || {}).find((key) => target.includes(key) || key.includes(target));
    if (detailKey) {
      let text = this.room().details[detailKey].replace("{bearing}", this.state.bearing);
      const discovery = discoveries[this.state.room]?.[detailKey];
      if (discovery && this.itemsHere().includes(discovery) && !this.state.revealedItems.includes(discovery)) {
        this.state.revealedItems.push(discovery);
      }
      if (this.state.room === "grotto" && this.state.flags.keyRetrieved) text = "Only black water churns in the pool now.";
      if (this.state.room === "beach" && detailKey === "boat" && !this.itemsHere().includes("boat hook")) text = "The boat has been split from bow to stern. Empty clips beneath one thwart once held a long tool.";
      if (this.state.room === "chartRoom" && detailKey === "cabinet" && this.state.flags.cabinetOpen) {
        text = this.itemsHere().includes("prism") ? "The cabinet hangs open. A diamond of glass rests in its padded compartment." : "The cabinet hangs open. Its padded compartment is empty.";
      }
      if (this.state.room === "galley" && detailKey === "cupboards" && !this.itemsHere().includes("paraffin can")) text = "The cupboards hold chipped crockery, mouse droppings and an empty space where the engine reserve stood.";
      if (this.state.room === "bunkRoom" && detailKey === "floorboard" && !this.itemsHere().includes("ceramic fuse")) text = "The loose board lifts easily. The dry box beneath it is empty.";
      if (this.state.room === "engineRoom" && detailKey === "generator" && this.state.flags.power) text = "The old Crossley rocks gently on its mounts, driving current into the tower with a patient iron rhythm.";
      if (this.state.room === "engineRoom" && detailKey === "gauge" && this.state.flags.generatorFuelled) text = "The needle trembles just below FULL.";
      if (this.state.room === "engineRoom" && detailKey === "socket" && this.state.flags.fuseInstalled) text = "A fresh ceramic fuse bridges the polished contacts.";
      if (this.state.room === "engineRoom" && detailKey === "workbench" && !this.itemsHere().includes("screwdriver")) text = "Chisels, files and oily rags cover the bench. A screwdriver-shaped gap interrupts the painted silhouettes on the wall.";
      if (this.state.room === "lanternRoom" && detailKey === "lens" && this.state.flags.prismInstalled) text = "The mounted prism sits at the heart of the Fresnel lens, waiting to gather the arc into a single beam.";
      return [{ type: "response", text }];
    }
    if (target.includes("door") && this.state.room === "yard") return [{ type: "response", text: this.room().details.door }];
    return [{ type: "error", text: `You find nothing notable about ${target || "that"}.` }];
  }

  take(target) {
    const visibleItems = this.itemsHere().filter((candidate) => this.state.revealedItems.includes(candidate));
    const item = this.resolveItem(target, visibleItems);
    if (!item) {
      if (this.resolveItem(target, this.state.inventory)) return [{ type: "response", text: "You already have it." }];
      if (target.includes("key") && this.state.room === "grotto" && !this.state.flags.keyRetrieved) return [{ type: "error", text: "The key is too deep to reach by hand." }];
      if (target.includes("prism") && this.state.room === "chartRoom" && !this.state.flags.cabinetOpen) return [{ type: "error", text: "You cannot reach it while the cabinet is jammed shut." }];
      return [{ type: "error", text: "You cannot see that here." }];
    }
    this.state.roomItems[this.state.room] = this.itemsHere().filter((x) => x !== item);
    this.state.inventory.push(item);
    return [{ type: "response", text: `Taken: ${item}.` }];
  }

  drop(target) {
    const item = this.resolveItem(target, this.state.inventory);
    if (!item) return [{ type: "error", text: "You are not carrying that." }];
    this.state.inventory = this.state.inventory.filter((x) => x !== item);
    this.itemsHere().push(item);
    if (!this.state.revealedItems.includes(item)) this.state.revealedItems.push(item);
    return [{ type: "response", text: `You set down the ${item}.` }];
  }

  use(target, input) {
    const has = (item) => this.state.inventory.includes(item);
    if (this.state.room === "grotto" && (target.includes("hook") || target.includes("pool") || target.includes("key"))) {
      if (!has("boat hook")) return [{ type: "error", text: "You need something long enough to reach the key." }];
      if (this.state.flags.keyRetrieved) return [{ type: "response", text: "There is nothing else worth fishing from the pool." }];
      this.state.flags.keyRetrieved = true;
      this.state.inventory.push("brass key");
      return [{ type: "response", text: "You brace against the rock and sweep the hook through the pool. On the third attempt, a heavy brass key rises from the foam. Taken: brass key." }];
    }
    if (this.state.room === "yard" && (target.includes("key") || target.includes("door") || target.includes("lock") || input.includes("unlock"))) {
      if (this.state.flags.engineUnlocked) return [{ type: "response", text: "The engine-house door is already unlocked." }];
      if (!has("brass key")) return [{ type: "error", text: "The old lock requires a key." }];
      this.state.flags.engineUnlocked = true;
      return [{ type: "response", text: "The brass key turns with surprising ease. The engine-house door swings open to the east." }];
    }
    if (this.state.room === "chartRoom" && (target.includes("cabinet") || target.includes("screwdriver") || input.includes("pry"))) {
      if (this.state.flags.cabinetOpen) return [{ type: "response", text: "The cabinet is already open." }];
      if (!has("screwdriver")) return [{ type: "error", text: "The cabinet needs a strong, narrow tool to pry it open." }];
      this.state.flags.cabinetOpen = true;
      this.itemsHere().push("prism");
      if (!this.state.revealedItems.includes("prism")) this.state.revealedItems.push("prism");
      return [{ type: "response", text: "You work the screwdriver into the swollen frame. With a crack, the cabinet opens, revealing a flawless glass prism." }];
    }
    if (this.state.room === "engineRoom" && (target.includes("paraffin") || target.includes("fuel"))) return this.fuel(target);
    if (this.state.room === "engineRoom" && target.includes("fuse")) return this.install(target, input);
    if (this.state.room === "lanternRoom" && target.includes("prism")) return this.install(target, input);
    if (this.state.room === "lanternRoom" && (target.includes("lever") || target.includes("lens") || target.includes("light"))) return this.ignite(target);
    return [{ type: "error", text: "You try, but nothing useful happens." }];
  }

  fuel() {
    if (this.state.room !== "engineRoom") return [{ type: "error", text: "There is nothing here that needs fuel." }];
    if (this.state.flags.generatorFuelled) return [{ type: "response", text: "The generator's tank is already full." }];
    if (!this.state.inventory.includes("paraffin can")) return [{ type: "error", text: "The generator needs paraffin." }];
    this.state.flags.generatorFuelled = true;
    this.state.inventory = this.state.inventory.filter((x) => x !== "paraffin can");
    return [{ type: "response", text: "You empty the paraffin into the generator's tank. The gauge rises to FULL." }];
  }

  install(target, input) {
    if (this.state.room === "engineRoom" && (target.includes("fuse") || input.includes("fuse"))) {
      if (this.state.flags.fuseInstalled) return [{ type: "response", text: "The replacement fuse is already installed." }];
      if (!this.state.inventory.includes("ceramic fuse")) return [{ type: "error", text: "You do not have a fuse." }];
      this.state.flags.fuseInstalled = true;
      this.state.inventory = this.state.inventory.filter((x) => x !== "ceramic fuse");
      return [{ type: "response", text: "The ceramic fuse seats firmly in the control board." }];
    }
    if (this.state.room === "lanternRoom" && (target.includes("prism") || input.includes("prism"))) {
      if (this.state.flags.prismInstalled) return [{ type: "response", text: "The prism is already mounted." }];
      if (!this.state.inventory.includes("prism")) return [{ type: "error", text: "The lens is missing its prism." }];
      this.state.flags.prismInstalled = true;
      this.state.inventory = this.state.inventory.filter((x) => x !== "prism");
      return [{ type: "response", text: "The prism clicks into the heart of the Fresnel lens. It catches the dim electric light and scatters rainbows across the room." }];
    }
    return [{ type: "error", text: "That does not fit anything here." }];
  }

  start(target) {
    if (this.state.room !== "engineRoom" || (!target.includes("generator") && target !== "engine" && target !== "")) return [{ type: "error", text: "There is nothing here to start." }];
    if (this.state.flags.power) return [{ type: "response", text: "The generator is already chugging steadily." }];
    if (!this.state.flags.generatorFuelled && !this.state.flags.fuseInstalled) return [{ type: "error", text: "The lever moves without resistance. The fuel needle lies dead against its stop, and no current reaches the starting coil." }];
    if (!this.state.flags.generatorFuelled) return [{ type: "error", text: "The starter catches for half a turn, then the engine gives a dry metallic cough. The fuel needle has not moved." }];
    if (!this.state.flags.fuseInstalled) return [{ type: "error", text: "The engine turns, but the control board remains dark. A faint spark jumps between the empty porcelain contacts." }];
    this.state.flags.power = true;
    return [{ type: "system", text: "You heave the starting lever. The generator coughs, catches, and settles into a deep mechanical rhythm. Beyond the door, lights bloom through the tower." }];
  }

  setBearing(input) {
    if (this.state.room !== "lanternRoom") return [{ type: "error", text: "There is nothing here with a bearing to set." }];
    const match = input.match(/\b(\d{1,3})\b/);
    if (!match) return [{ type: "error", text: "Set the lens to which bearing?" }];
    const bearing = Number(match[1]);
    if (bearing > 359) return [{ type: "error", text: "Compass bearings run from 0° to 359°." }];
    this.state.bearing = bearing;
    return [{ type: "response", text: `You turn the heavy wheel until the pointer rests at ${bearing}°.` }];
  }

  ignite() {
    if (this.state.room !== "lanternRoom") return [{ type: "error", text: "There is nothing here to ignite." }];
    if (!this.state.flags.power) return [{ type: "error", text: "The lever falls with a dead brass clack. No current reaches the lamp." }];
    if (!this.state.flags.prismInstalled) return [{ type: "error", text: "The arc crackles into life, but without anything in the central mount its light breaks uselessly across the glass." }];
    if (this.state.bearing !== 317) return [{ type: "error", text: "A pale beam sweeps into the rain, illuminating only empty water and cliff. The approaching ship gives no answer." }];
    this.state.won = true;
    return [{ type: "ending", text: "You pull the ignition lever. White fire leaps into the prism, and the great lens turns night into a blade of light." }];
  }

  hint() {
    const { flags, room } = this.state;
    if (!flags.keyRetrieved) return this.state.inventory.includes("boat hook") ? "Something brass lies in the grotto pool. The boat hook should reach it." : "Examine the wrecked boat on the beach, then take what you find.";
    if (!flags.engineUnlocked) return "The brass key looks suited to the lock on the engine-house door in the yard.";
    if (!flags.generatorFuelled) return "The galley cupboards hold something the generator needs.";
    if (!flags.fuseInstalled) return "Examine the loose floorboard in the keeper's quarters, north of the galley.";
    if (!flags.power) return "With fuel and fuse installed, start the generator.";
    if (!flags.cabinetOpen) return this.state.inventory.includes("screwdriver") ? "The chart-room cabinet is swollen shut. Try the screwdriver." : "Look around the engine house for a useful tool.";
    if (!this.state.inventory.includes("prism") && !flags.prismInstalled) return "The opened chart-room cabinet contains something you need. Take it—and read the log.";
    if (room !== "lanternRoom") return "Now that the tower has power, climb to the lantern room.";
    if (!flags.prismInstalled) return "Install the prism in the lens.";
    if (this.state.bearing !== 317) return "The storm log records the winter lens bearing. Set the lens to that number.";
    return "Everything is ready. Pull the ignition lever.";
  }

  resolveItem(target, candidates) {
    const wanted = stripFillers(target);
    return candidates.find((item) => itemData[item].aliases.some((alias) => wanted === alias || wanted.includes(alias)));
  }

  list(items) {
    if (items.length < 2) return items[0] || "nothing";
    return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
  }

  withIndefiniteArticle(noun) {
    return `${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`;
  }
}

export { rooms, itemData, ROOM_COUNT };
