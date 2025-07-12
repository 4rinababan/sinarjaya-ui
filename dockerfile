# Tahap 1: Build React
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Tahap 2: Serve pakai Nginx
FROM nginx:stable-alpine

# Hapus default html Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build ke Nginx folder
COPY --from=builder /app/build /usr/share/nginx/html

# Tambahkan routing untuk SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
