#!/bin/bash
set -e
_DB_CONTAINER_NAME="rathena_db"
_DB_USERNAME="ragnarok"

# Query running containers to find the Database container
DB_CONTAINER_ID=$(docker ps --filter "name=${_DB_CONTAINER_NAME}" -q)
if [ -z "${DB_CONTAINER_ID}" ]; then
  echo ">> The database container named '${_DB_CONTAINER_NAME}' is not running! Exiting..."
  exit 1
fi

# Prompt for username
CHAR_USERNAME=""
CHAR_PW=""
CHAR_VERIFY_PW=""
read -p 'Username: ' CHAR_USERNAME
read -s -p 'Password: ' CHAR_PW
echo "" # Newline
read -s -p 'Re-enter Password: ' CHAR_VERIFY_PW
echo "" # Newline

# Input validation
if [ -z "${CHAR_USERNAME}" ]; then
  echo ">> Username is required! Exiting..."
  exit 2
fi
if [ -z "${CHAR_PW}" ] || [ -z "${CHAR_VERIFY_PW}" ] ; then
  echo ">> Password is required! Exiting..."
  exit 3
fi
if [ "${CHAR_PW}" != "${CHAR_VERIFY_PW}" ] ; then
  echo ">> Passwords do not match! Exiting..."
  exit 4
fi

# Insert record to database
echo ">> When prompted for password, enter the password for the database user '${_DB_USERNAME}'"
docker exec -it "${DB_CONTAINER_ID}" mysql --user ragnarok --password --execute "USE ragnarok; INSERT INTO login (userid, user_pass, sex, email, group_id, character_slots) VALUES (\"${CHAR_USERNAME}\", \"${CHAR_PW}\", \"M\", \"a@a.com\", 99, 12);";

echo ">> Character successfully registered!"
