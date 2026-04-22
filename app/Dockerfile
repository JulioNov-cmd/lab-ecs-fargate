FROM node:20-alpine

WORKDIR /app

# 1. Actualizamos npm globalmente para eliminar las vulnerabilidades detectadas por Trivy
RUN npm install -g npm@latest

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

# 2. Buena práctica para ECS: Ejecutar el proceso directamente para el graceful shutdown
CMD ["node", "index.js"]
