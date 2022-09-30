#!/bin/sh

. ./variables.sh

# enalbe caddy repo
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list

apt update
apt-get install --no-install-recommends mariadb-server mariadb-client php-fpm php-mbstring php-xml php-gd php-zip php-curl zip unzip wget curl php-mysql caddy

# create mariadb database and user
cat << EOF | mariadb
CREATE USER tech_user@localhost IDENTIFIED BY 'YsCxNQMSCPeM7BYJ9dnhqMR6';
EOF

cat << EOF | mariadb
CREATE DATABASE tech_db;
GRANT ALL ON tech_db.* TO 'tech_user'@'localhost';
EOF

# unblock port 80 because reasons
mkdir /etc/iptables
/sbin/iptables -I INPUT -p tcp -m tcp --dport 80 -j ACCEPT
/sbin/iptables-save > /etc/iptables/rules.v4

# update caddyfile
cat << EOF > /etc/caddy/Caddyfile
$domain {
   root * /opt/$basename/public
   encode gzip
   file_server
   php_fastcgi unix//run/php/php7.4-fpm.sock
}
EOF
