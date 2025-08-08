# 배포 가이드

## Vercel 배포 방법

### 1. GitHub 저장소 생성 및 푸시

1. GitHub에서 새로운 저장소를 생성합니다.
2. 로컬 저장소를 GitHub에 푸시합니다:

```bash
git remote add origin https://github.com/yourusername/travle.git
git branch -M main
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com)에 접속하여 GitHub 계정으로 로그인합니다.
2. "New Project" 버튼을 클릭합니다.
3. GitHub 저장소에서 `travle` 프로젝트를 선택합니다.
4. 프로젝트 설정에서 다음 환경 변수를 추가합니다:

#### 환경 변수 설정

**필수 환경 변수:**
- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 문자열
- `NEXTAUTH_URL`: 배포된 도메인 URL (예: https://your-app.vercel.app)
- `NEXTAUTH_SECRET`: 랜덤한 시크릿 키 (openssl rand -base64 32로 생성 가능)

**선택적 환경 변수:**
- `GOOGLE_CLIENT_ID`: Google OAuth 클라이언트 ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth 클라이언트 시크릿
- `GITHUB_ID`: GitHub OAuth 앱 ID
- `GITHUB_SECRET`: GitHub OAuth 앱 시크릿

### 3. 데이터베이스 설정

#### 옵션 1: Vercel Postgres (권장)

1. Vercel 대시보드에서 "Storage" 탭으로 이동
2. "Create Database" 클릭
3. PostgreSQL 데이터베이스 생성
4. 자동으로 `DATABASE_URL` 환경 변수가 설정됩니다

#### 옵션 2: 외부 PostgreSQL 서비스

- [Supabase](https://supabase.com)
- [Neon](https://neon.tech)
- [Railway](https://railway.app)

### 4. 데이터베이스 마이그레이션

배포 후 Vercel 대시보드에서 다음 명령어를 실행합니다:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. 배포 완료

배포가 완료되면 제공된 URL에서 웹사이트를 확인할 수 있습니다.

## 로컬 개발 환경 설정

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/travle"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 2. 데이터베이스 설정

```bash
# PostgreSQL 설치 (macOS)
brew install postgresql
brew services start postgresql

# 데이터베이스 생성
createdb travle

# Prisma 마이그레이션
npx prisma migrate dev
npx prisma generate
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 문제 해결

### 일반적인 문제들

1. **데이터베이스 연결 오류**
   - `DATABASE_URL` 환경 변수가 올바르게 설정되었는지 확인
   - 데이터베이스가 실행 중인지 확인

2. **빌드 오류**
   - 모든 의존성이 설치되었는지 확인: `npm install`
   - TypeScript 오류가 있는지 확인: `npm run lint`

3. **인증 오류**
   - `NEXTAUTH_SECRET`이 설정되었는지 확인
   - OAuth 제공자 설정이 올바른지 확인

### 지원

문제가 발생하면 다음을 확인해주세요:
- [Vercel 문서](https://vercel.com/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [Prisma 문서](https://www.prisma.io/docs)
