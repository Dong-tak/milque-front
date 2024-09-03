# Step 1: Build Stage
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 애플리케이션 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# Step 2: Production Stage
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일 복사
COPY --from=builder /app ./

# Production dependencies 설치
RUN npm ci --only=production

# 3000 포트 오픈
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]