# Paw-Pong

Click here to see the deployed game

## Description

Paw-Pong is a single-player game in which the player, as a cat, can use its paw to do a 'yarn ball sport'. The ball strikes towards the player's side and the goal of the game is to hit the ball back by moving the paw vertically. When hitting the ball successfully once, the player will get 1 point, the score will be calculated accumulatively. The game will be over when the player misses hitting the ball.

## MVP

- A 'start game' page with the name of the game, an input box which can store the player's name, and a start button to enter the game.
- An instruction page to inform the player how to play the game.
- The game area page: a canvas in which the player can control the paw on the right-hand side of the canvas up and down with a mouse. The yarn ball will strike towards the right side when the game starts. If the paw touches the ball, it will go in the reverse direction, the same as when the ball touches the edge of the canvas. In the end, it will go back to the player's side again until the player misses the ball then it will run to the outside of the canvas from the right side. The speed of the ball will accelerate throughout the game. There is a score panel to keep the score: when the player successfully hit the ball scores 1.
- Turn to the 'game-over' page which shows the highest score, the score of the current game, and a button to restart the game (click and load to the game area page).

## Backlog

- Sound effects throughout the game: background sound and when the paw hits the yarn - the option to turn on sound or not (a button).
- The option to choose a cat icon to represent the player (with different paw colours as well), 2-3 options.
- After hitting 5 balls successfully, there will be 4 different icons showing in the game area randomly. When the ball touches the icon respectively, it represents: fire - accelerate the speed of the ball one time; water - slow the speed of the ball one time; plant - minus 1 point of the score; cat food - plus 1 point of the score. (Also with sound effects)
- 3 different levels of the game with different speeds of the ball.

## Data structure

### HTML

### CSS

### main.js

- splashScreen(){}
- instructionScreen(){}
- gameAreaScreen(){}
- gameOverScreen(){}

### game.js

- game(){}
- drawCanvas(){}
- clearCanvas(){}
- updateCanvas(){}
- paw(){}
- yarn(){}
- checkCollisionsTop(){}
- checkCollisionsLeft(){}
- checkCollisionsButton(){}
- gameOver(){}
- score(){}

## States y States transitions

- splashScreen
- instructionScreen
- gameAreaScreen
- gameOverScreen

## Task

- retrieve materials(graphics)
- main: build DOM
- main: build splashScreen
- main: addEventListener
- main: build instructionScreen
- game: start loop
- game: build canvas
- game: draw canvas
- game: update canvas
- game: draw paw
- game: paw addEventListener
- game: draw yarn
- game: yarn move
- game: checkCollisions
- game: score
- game: gameOver
- main: build gameOverScreen
- main: addEventListener
- backlog

## Links
