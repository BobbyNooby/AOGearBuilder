FROM node:22-alpine AS base

# Install pnpm and Bun
RUN npm install -g pnpm
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/api/package.json packages/api/
COPY packages/shared/package.json packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source and build shared package
COPY packages/shared/ packages/shared/
COPY packages/api/ packages/api/
RUN pnpm --filter shared build

WORKDIR /app/packages/api
EXPOSE 4000

CMD ["bun", "src/index.ts"]
