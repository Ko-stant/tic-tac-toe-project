#!/bin/bash

# ID=2 sh scripts/users/changepw.sh

curl "http://tic-tac-toe.wdibos.com/change-passwor/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "passwords": {
      "old": "'"${OLD}"'",
      "new": "'"${NEW}"'"
    }
  }'

echo
