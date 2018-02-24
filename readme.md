Demo of how ZoneJS can be used for change detection to implement a minimal angular-like framework.
The dom compiler scans `index.html` during bootstrap to scan for components
and directives, which are then compiled and initialised to respond to the changes.

The bootstrapping happens in `boostrap` in `main.ts` after which it listens for changes to apply them.


## Install


```
npm install
```

## Run

```
npm start
```

