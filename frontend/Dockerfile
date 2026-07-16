
FROM node:22

WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN corepack enable
RUN pnpm config set dangerouslyAllowAllBuilds true
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]