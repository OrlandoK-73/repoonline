#!/bin/bash

# Variables para debug
echo "Verificando variables de entorno:"
echo "DB_HOST: $DB_HOST"
echo "DB_USERNAME: $DB_USERNAME"
echo "DB_DATABASE: $DB_DATABASE"

# Bucle de espera usando mysql
while ! mysql -h "$DB_HOST" -u "$DB_USERNAME" -p"$DB_PASSWORD" -e "SELECT 1" >/dev/null 2>&1; do
    echo "Esperando a que MySQL se inicie..."
    sleep 5
done

echo "MySQL está listo!"
echo "Iniciando la aplicación..."
exec npm start