FROM node:20-alpine3.20

WORKDIR /app

# Actualizamos paquetes del sistema y npm
RUN apk update && apk upgrade && \
    npm install -g npm@latest && \
    npm cache clean --force

# Copiamos solo los archivos de la carpeta app
COPY package*.json ./

# Instalamos y limpiamos caché inmediatamente en la misma capa
RUN npm ci --omit=dev && \
    npm cache clean --force

COPY . .

USER node
EXPOSE 3000
CMD ["node", "index.js"]