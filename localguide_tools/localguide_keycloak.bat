chcp 1252
cd "C:\Program Files\keycloak-24.0.2\bin"
kc.bat --verbose start-dev --debug 5050 --http-port 9009  --proxy-headers xforwarded --http-enabled true