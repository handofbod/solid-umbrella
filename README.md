# The Last Signal

A compact browser-based text adventure inspired by the conversational freedom of classic games like *Zork*.

You are stranded below Saltwick lighthouse during a violent storm. The beacon is dark, a ship is approaching the reef, and the absent keepers have left behind everything needed to repair it—if you can follow their trail.

## Play in your browser

Play the current version at:

**<https://handofbod.github.io/solid-umbrella/>**

No installation, download, or npm command is required. Progress is saved automatically in your browser.

The parser accepts everyday commands such as:

- `look` or `examine boat`
- `go north`, `walk west`, or simply `n`
- `take key`, `open door`, or `use key on lock`
- `inventory`, `hint`, or `help`

## Local or offline play

As a backup—or when developing or playing without internet access—clone or download the repository and run a small local server from its directory:

```sh
npm run serve
```

Then visit <http://localhost:8080>. No `npm install` step is needed because the game has no package dependencies. The hosted version does not require npm at all.

## Test

```sh
npm test
```

The tests exercise parser synonyms, puzzle gating, saved-state validation, and the complete winning route.
