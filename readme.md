Demo of how ZoneJS can be used for change detection to implement a minimal angular-like set up.
The setup consists of a dom compiler that scans `index.html` during bootstrap to scan for components
and directives, and compiles and initialises them to respond to the changes.

The bootstrapping happens in `boostrap` in `main.ts` and it listens for changes to apply them.


## Install


```
npm install
```

## Run

```
npm start
```

