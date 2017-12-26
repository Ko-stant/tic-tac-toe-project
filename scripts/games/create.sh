#!/bin/sh

# sh scripts/json/sign-in.sh

curl "http://tic-tac-toe.wdibos.com/games" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \

echo
