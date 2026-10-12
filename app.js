import { Game, itemData, ROOM_COUNT } from "./game-engine.js";

const SAVE_KEY = "the-last-signal-save-v1";
const transcript = document.querySelector("#transcript");
const form = document.querySelector("#command-form");
const input = document.querySelector("#command-input");
const locationLabel = document.querySelector("#location-label");
const turnLabel = document.querySelector("#turn-label");
const inventoryList = document.querySelector("#inventory-list");
const inventoryCount = document.querySelector("#inventory-count");
const roomCount = document.querySelector("#room-count");
const roomPips = document.querySelector("#room-pips");
const objective = document.querySelector("#objective");
const endingDialog = document.querySelector("#ending-dialog");

let game = new Game(loadState());
let history = [];
let historyIndex = 0;

for (let i = 0; i < ROOM_COUNT; i += 1) roomPips.append(document.createElement("span"));

function loadState() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game.state));
}

function addEntry(result) {
  const entry = document.createElement("article");
  entry.className = `entry ${result.type}`;
  if (result.type === "location") {
    const heading = document.createElement("h2");
    heading.textContent = result.title;
    const text = document.createElement("p");
    text.className = "description";
    text.textContent = result.text;
    const exits = document.createElement("p");
    exits.className = "exits";
    exits.textContent = `Obvious ways: ${result.exits.join(" · ")}`;
    entry.append(heading, text, exits);
  } else {
    const text = document.createElement("p");
    text.textContent = result.text;
    entry.append(text);
  }
  transcript.append(entry);
  transcript.scrollTop = transcript.scrollHeight;
}

function updateSidebar() {
  const { state } = game;
  locationLabel.textContent = game.room().name;
  turnLabel.textContent = `Turn ${state.turns}`;
  inventoryCount.textContent = `${state.inventory.length} / 6`;
  roomCount.textContent = `${state.visited.length} / ${ROOM_COUNT}`;
  inventoryList.replaceChildren();
  if (!state.inventory.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Nothing but cold seawater.";
    inventoryList.append(empty);
  } else {
    state.inventory.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.title = itemData[item].description;
      inventoryList.append(li);
    });
  }
  [...roomPips.children].forEach((pip, index) => pip.classList.toggle("found", index < state.visited.length));

  if (state.flags.power) objective.textContent = "Restore the lens and aim the beacon before the ship reaches Saltwick reef.";
  if (state.flags.prismInstalled) objective.textContent = "Set the lens to the keeper's recorded bearing, then ignite the beacon.";
  if (state.won) objective.textContent = "The beacon burns. The ship has turned clear of the reef.";
}

function submitCommand(command) {
  const value = command.trim();
  if (!value) return;
  history.push(value);
  historyIndex = history.length;
  addEntry({ type: "command", text: value });
  const results = game.command(value);
  if (results.some((result) => result.type === "restart")) {
    restart();
    return;
  }
  results.forEach(addEntry);
  saveState();
  updateSidebar();
  if (results.some((result) => result.type === "ending")) {
    document.querySelector("#ending-score").textContent = `${game.state.visited.length} places discovered · ${game.state.turns} turns taken`;
    setTimeout(() => endingDialog.showModal(), 500);
  }
}

function restart() {
  game = new Game();
  localStorage.removeItem(SAVE_KEY);
  transcript.replaceChildren();
  addEntry({ type: "system", text: "Rain erases your footprints. The night begins again." });
  addEntry(game.describeRoom());
  updateSidebar();
  if (endingDialog.open) endingDialog.close();
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitCommand(input.value);
  input.value = "";
});

input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && history.length) {
    event.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex];
  }
  if (event.key === "ArrowDown" && history.length) {
    event.preventDefault();
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || "";
  }
});

document.querySelectorAll("[data-command]").forEach((button) => button.addEventListener("click", () => {
  submitCommand(button.dataset.command);
  input.focus();
}));
document.querySelector("#restart-button").addEventListener("click", () => {
  if (window.confirm("Begin the adventure again? Your current progress will be lost.")) restart();
});
document.querySelector("#ending-close").addEventListener("click", () => endingDialog.close());
document.querySelector("#ending-restart").addEventListener("click", restart);

addEntry({ type: "system", text: game.state.turns ? "Your salt-stained field notes bring you back to the storm…" : "23:17. The Saltwick beacon has gone dark. One ship is still at sea." });
addEntry(game.describeRoom());
updateSidebar();
input.focus();
