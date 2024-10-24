#!/bin/bash
set -e

HEALTHCHECKS_URL="https://hc-ping.com/xxxxxx"

sqlite3 /home/app/app.db ".backup /home/app/app.db.bak"
gzip /home/app/app.db.bak -f

aws s3 cp /home/app/app.db.bak.gz s3://my-bucket/app-`date +%Y-%m-%d-%H-%M-%S`.db.bak.gz
curl -fsS -m 10 --retry 5 -o /dev/null "$HEALTHCHECKS_URL"