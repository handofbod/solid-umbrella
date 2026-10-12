# The Last Signal

A compact browser-based text adventure inspired by the conversational freedom of classic games like *Zork*.

You are stranded below Saltwick lighthouse during a violent storm. The beacon is dark, a ship is approaching the reef, and the absent keepers have left behind everything needed to repair it—if you can follow their trail.

## Play

Open `index.html` through any static web server:

```sh
npm run serve
```

Then visit <http://localhost:8080>. The game is dependency-free and suitable for GitHub Pages.

Type natural commands such as:

- `look` or `examine boat`
- `go north`, `walk west`, or simply `n`
- `take hook`, `use hook on pool`, or `unlock door with key`
- `inventory`, `hint`, or `help`

Progress is saved automatically in the browser.

## Test

```sh
npm test
```

The tests exercise parser synonyms, puzzle gating, saved-state validation, and the complete winning route.
