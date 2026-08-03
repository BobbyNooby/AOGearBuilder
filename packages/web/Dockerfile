FROM node:22-alpine AS base

# Install pnpm and Bun
RUN npm install -g pnpm
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/web/package.json packages/web/
COPY packages/shared/package.json packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY packages/shared/ packages/shared/
COPY packages/web/ packages/web/
RUN pnpm --filter shared build
RUN pnpm --filter web build

WORKDIR /app/packages/web
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["bun", "build/index.js"]
