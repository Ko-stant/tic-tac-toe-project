#!/bin/bash

# sh scripts/games/over-get.sh

curl "http://tic-tac-toe.wdibos.com/games/?over=${OVER}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo
