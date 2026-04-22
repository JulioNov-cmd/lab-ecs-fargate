# Usamos una versión de Node con Alpine actualizado
FROM node:20-alpine3.20

WORKDIR /app

# Actualizamos paquetes del sistema y npm, luego LIMPIAMOS el caché
RUN apk update && apk upgrade && \
    npm install -g npm@latest && \
    npm cache clean --force

COPY package*.json ./

# Instalamos dependencias y volvemos a limpiar el caché en la misma capa
RUN npm install --omit=dev && \
    npm cache clean --force

COPY . .

# Seguridad: No correr como root (Hardening real)
USER node

EXPOSE 3000

CMD ["node", "index.js"]