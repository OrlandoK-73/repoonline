# Utiliza la imagen oficial de Node.js última versión
FROM node:18 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /opt/front

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Construye el proyecto (genera los archivos listos para producción)
RUN npm run build

# Utiliza la imagen oficial de nginx para servir los archivos
FROM nginx

# Copia los archivos construidos desde la etapa "builder" al directorio de nginx
COPY --from=builder /opt/front/dist/frontend/browser /usr/share/nginx/html/frontend/browser
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Cambia la configuración de Nginx (puedes hacerlo con un archivo nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf
