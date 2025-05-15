# ===== Base commune =====
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# ===== Environnement de développement =====
FROM base AS development
COPY . .
EXPOSE 5173
EXPOSE 24678
CMD ["npm", "run", "dev", "--", "--host"]

# ===== Build de production =====
FROM base AS build
COPY . .
RUN npm run build

# ===== Conteneur NGINX pour production =====
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
