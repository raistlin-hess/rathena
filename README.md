# rAthena

Forked from [rathena](https://github.com/rathena/rathena)

# Starting Server

## Pre-requisites

1. [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Container commands

```shell
# For preRenewal
docker-compose up -f Compose-PreRenewal.yml --detach
# For Renewal
docker-compose up -f Compose-Renewal.yml --detach
```
