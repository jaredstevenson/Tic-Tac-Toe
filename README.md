# Tic-Tac-Toe
Play Tic-Tac-Toe against the computer
[demo](https://jaredstevenson.github.io/Tic-Tac-Toe/)




algorithm for the computer moving

- base case: if the game is over return the score 1, 0 or -1
- calc available moves
- for each move recusively call the function until the game is over
- make a list of scores for each move
- figure out the best score and return it if computers Turn
- find the lowest score if opponents turn


## publish to github
- switch to gh-pages branch `git checkout gh-pages`
- merge changes from master `git merge master`
- build bundle `webpack`
- make a commit
  - `git add .`
  - `git commit -m ""`
- push to github ` git push origin gh-pages`
- switch back to master branch `git checkout master`
