# ci-demo 容器镜像：多阶段构建
# 阶段一：构建 dist（与本地构建契约一致：npm ci -> npm run build）
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 阶段二：精简运行时（只保留产物与静态服务器）
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY server.mjs .
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "server.mjs"]