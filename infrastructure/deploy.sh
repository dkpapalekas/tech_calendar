#!/bin/sh

if test -z "$1"
then
    echo 'Please provide a hostname or IP address to connect to!'
    exit 1
fi

scp *deb root@$1:/root/
ssh root@$1 'cd /root; dpkg -i *deb; rm *deb'
rm *deb