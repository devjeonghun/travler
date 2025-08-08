# Travle - 여행 계획 공유 및 준비물 체크 웹사이트

Travle은 친구들과 함께 여행 계획을 세우고, 준비물을 체크하며, 완벽한 여행을 준비할 수 있는 웹사이트입니다.

## 주요 기능

- 🗺️ **여행 계획 생성**: 목적지, 일정, 설명을 포함한 여행 계획 생성
- 👥 **팀 협업**: 친구들과 함께 여행 계획을 세우고 공유
- ✅ **준비물 체크리스트**: 필요한 준비물을 체크리스트로 관리
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- 🔐 **사용자 인증**: 안전한 로그인 및 회원가입 시스템

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Lucide React Icons

## 시작하기

### 1. 환경 설정

먼저 프로젝트를 클론하고 의존성을 설치합니다:

```bash
git clone <repository-url>
cd travle
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수들을 설정합니다:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/travle"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (선택사항)
# GOOGLE_CLIENT_ID=""
# GOOGLE_CLIENT_SECRET=""
# GITHUB_ID=""
# GITHUB_SECRET=""
```

### 3. 데이터베이스 설정

PostgreSQL 데이터베이스를 설정하고 Prisma 마이그레이션을 실행합니다:

```bash
# 데이터베이스 마이그레이션
npx prisma migrate dev

# Prisma 클라이언트 생성
npx prisma generate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

이제 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

```
travle/
├── src/
│   ├── app/
│   │   ├── api/                    # API 엔드포인트
│   │   │   ├── auth/               # 인증 관련 API
│   │   │   ├── trips/              # 여행 관련 API
│   │   │   └── checklist-items/    # 체크리스트 아이템 API
│   │   ├── auth/                   # 인증 페이지
│   │   ├── trips/                  # 여행 관련 페이지
│   │   └── page.tsx                # 홈페이지
│   └── lib/                        # 유틸리티 함수들
│       ├── auth.ts                 # NextAuth 설정
│       └── prisma.ts               # Prisma 클라이언트
├── prisma/
│   └── schema.prisma               # 데이터베이스 스키마
└── public/                         # 정적 파일들
```

## 주요 페이지

- **홈페이지** (`/`): 서비스 소개 및 메인 랜딩 페이지
- **여행 생성** (`/trips/create`): 새로운 여행 계획 생성
- **여행 상세** (`/trips/[id]`): 개별 여행 상세 정보 및 체크리스트
- **로그인** (`/auth/signin`): 사용자 로그인
- **회원가입** (`/auth/signup`): 새로운 사용자 등록

## API 엔드포인트

- `POST /api/trips` - 새로운 여행 생성
- `GET /api/trips` - 공개 여행 목록 조회
- `GET /api/trips/[id]` - 개별 여행 조회
- `POST /api/trips/[id]/checklists` - 체크리스트 생성
- `PATCH /api/checklist-items/[id]` - 체크리스트 아이템 업데이트

## 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 계정을 만들고 GitHub 저장소를 연결합니다.
2. 환경 변수를 Vercel 대시보드에서 설정합니다.
3. PostgreSQL 데이터베이스를 설정합니다 (Vercel Postgres 또는 외부 서비스 사용).
4. 배포를 완료합니다.

### 수동 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 기여하기

1. 이 저장소를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.
