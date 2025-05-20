# Use official Node.js image as the base
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build frontend
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server ./server
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

CMD ["npm", "run", "start"]