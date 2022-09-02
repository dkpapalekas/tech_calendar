#!/bin/sh
apt update
apt-get install --no-install-recommends mariadb-server mariadb-client nginx php-fpm php-mbstring php-xml php-gd php-zip php-curl zip unzip wget curl php-mysql

# create mariadb database and user
cat << EOF | mariadb
CREATE USER tech_user@localhost IDENTIFIED BY 'YsCxNQMSCPeM7BYJ9dnhqMR6';
EOF

cat << EOF | mariadb
CREATE DATABASE tech_db;
GRANT ALL ON tech_db.* TO 'tech_user'@'localhost';
EOF

rm /etc/nginx/sites-enabled/*