FROM node:20-alpine3.20

WORKDIR /app

# Actualizamos paquetes del sistema
RUN apk update && apk upgrade && \
    npm install -g npm@latest && \
    npm cache clean --force

# Copiamos AMBOS archivos. El lockfile es la ley aquí.
COPY package*.json ./

# 'npm ci' es más rápido y exacto para pipelines
RUN npm ci --omit=dev && \
    npm cache clean --force

COPY . .

USER node
EXPOSE 3000
CMD ["node", "index.js"]