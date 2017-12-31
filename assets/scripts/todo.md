### TODO

sign in should create a new game

Create game should trigger API call to create new game as well updating the browser window like it does now.

Need to create UI elements to display users

set up api calls to patch game board instead of pushing direct to ui this will probably need the API file to be required in the UI file and have some api.function calls to update game over. this is still up in the air as best direction to go and may be completely incorrect in approach, but still need a way to manage updating UI and API. My current dataset is not quite the data needed. though I can probably use the dataset as
{
"cells": {
  "index": ${cellIndex},
  "value": *determined by turn count*
  }
}

If implemented from UI and then updated API, this can use the turn counter in UI. Otherwise functions would need to move to events file and then use from there to push data out. which might be a good approach as well..
