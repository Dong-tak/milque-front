# 베이스 이미지 선택
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 파일만 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 나머지 애플리케이션 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 애플리케이션 실행
CMD ["npm", "start"]