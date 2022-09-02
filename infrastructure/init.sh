#!/bin/sh

if test -z "$1"
then
    echo 'Please provide a hostname or IP address to connect to!'
    exit 1
fi

scp infrastructure/init-helper.sh root@$1:/root/
ssh root@$1 'cd /root; bash init-helper.sh ; rm init-helper.sh'
