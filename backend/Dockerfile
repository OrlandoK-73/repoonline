FROM node:latest

WORKDIR /usr/src/app

# Instalar MySQL client
RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./
COPY .env* ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY src/ ./src/

# Asegurarnos de que la carpeta public existe y tiene contenido
RUN mkdir -p ./src/public
COPY src/public/ ./src/public/

# Copiar y configurar script de espera
COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh && \
    sed -i 's/\r$//' wait-for-db.sh

# Compilar TypeScript
RUN npm run build

EXPOSE 3000

CMD ["./wait-for-db.sh"]