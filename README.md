# Quiz Match Solver

A script which automatically solves a match game on a specific quiz website.

## How to use

Use at your own risk!

1. Add all pair contained in your set of cards. The strings have to match perfectly. If you have some sort of typo, check the console for logs.
Example:
```js
const pairs = {
    "Joe": "Biden",
    "John": "Kennedy",
    "Abraham": "Lincln",
}
```
Which might yield the following logs:
```
> ['Lincoln']
> Uncaught Error: Unknown cards found
```
2. Navigate to the page with the "Start game" button.
3. Copy the entire script provided into the console and hit enter.
4. If the script glitches out increase the `between_clicks` constant.
