#!/bin/sh

# setup variables
# use timestamp for version
version=`date '+%s'`
basename='tech-calendar'
arch=amd64
dirname="$basename"_"$version"_"$arch"
domain=104.207.131.83

# run the build
npm run prod

# put files in proper directory for DEB file generation
mkdir -p $dirname/opt/$basename $dirname/etc/nginx/sites-enabled
cp -pr --parents app bootstrap config database public resources routes storage vendor artisan server.php $dirname/opt/$basename

# nginx file
cat << EOF > $dirname/etc/nginx/sites-enabled/$basename.conf
server {
    listen 80;
    listen [::]:80;
    server_name $domain;
    root /opt/$basename/public;
 
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
 
    index index.php;
 
    charset utf-8;
 
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
 
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
 
    error_page 404 /index.php;
 
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
 
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
EOF

# .env
cat <<EOF > $dirname/opt/$basename/.env
APP_NAME=TECH_CALENDAR
APP_ENV=local
APP_KEY=base64:gZTLOCKX5M4rn4JfzftH97g+j+rhR2cRswAsRvoE0Ck=
APP_DEBUG=true
APP_URL=http://$domain

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tech_db
DB_USERNAME=tech_user
DB_PASSWORD=YsCxNQMSCPeM7BYJ9dnhqMR6

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
EOF

# make DEBIAN
mkdir $dirname/DEBIAN

# control file
cat << EOF > $dirname/DEBIAN/control
Package: $basename
Version: $version
Architecture: $arch
Maintainer: Dimitris Papalekas <papalekasdimitrios@gmail.com>
Description: Tech Calendar
Depends: php-fpm, php-mbstring, php-xml, php-gd, php-zip, php-curl, zip, unzip, wget, curl, php-mysql
EOF

# preinstall script
cat << EOF > $dirname/DEBIAN/preinst
#!/bin/sh
systemctl stop nginx php7.4-fpm
EOF

# postinstall script
cat <<EOF > $dirname/DEBIAN/postinst
#!/bin/sh
cd /opt/$basename
php artisan migrate --force
chown -R www-data:www-data /opt/$basename
systemcl start nginx php7.4-fpm
EOF

# set up correct permissions
chmod 755 $dirname/DEBIAN
chmod 755 $dirname/DEBIAN/preinst
chmod 755 $dirname/DEBIAN/postinst

# make the deb file
dpkg-deb --build --root-owner-group $dirname

# cleanup
rm -rf $dirname
