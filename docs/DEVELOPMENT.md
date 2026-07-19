# 아이 놀이 유형 검사 — 개발 정리

째깍악어(TicToc Croc) "우리 아이 놀이 성향 테스트" 웹앱의 구조·로직·의사결정을 정리한 문서.

---

## 1. 개요

- **목적:** 부모가 아이에 대해 9문항에 답하면 **8가지 놀이 유형** 중 하나로 판정하고, 유형에 맞는 프로그램을 추천 + 카카오톡으로 공유하는 바이럴 테스트.
- **기술 스택:** Vite + React 18 (라우터 없이 단일 상태머신), 순수 CSS(파일별), Pretendard 폰트(CDN).
- **디자인 근거:** 저장소의 `04_놀이성향테스트_디자인시안보드 (2).html`(화면 시안)과 `character_explain.png`·`스크린샷 …2.15.04.png`(8유형 정의)를 기준으로 재현.

### 시안과 의도적으로 다른 점
| 항목 | 시안 보드 | 실제 구현 |
|---|---|---|
| 질문 수 | 10개 (Q7~Q10 부모 상황 3지선다 포함) | **9개, 전부 아이 대상 A/B 2지선다** |
| 유형 수 | 4종(2공개·2비공개) | **8종 (AXF~BYP)** |
> 실제 질문지(사용자 제공)를 기준으로 삼았기 때문. 부모 상황 문항·추천 부스트 로직은 미구현.

---

## 2. 화면 흐름

```
Intro → Profile(이름·나이) → Question ×9 → Loading → Result
```

- 상태 관리: `src/App.jsx`의 `step` 상태머신 (`intro | question | loading | result` + `profile`). 라우터 없음.
- 전역 데이터: `profile{ name, age }`, `answers{ q1..q9 }`, `result{ code, type, products }`.

| 화면 | 파일 | 핵심 |
|---|---|---|
| 인트로 | `src/screens/Intro.jsx` | 비로그인 진입, "테스트 시작하기" |
| 프로필 | `src/screens/Profile.jsx` | 이름 입력 + 나이 **휠 피커**. 둘 다 채워야 다음 |
| 문항 | `src/screens/Question.jsx` | 1문항 1화면, **탭 시 자동 전환**, 진행바, "이전" |
| 로딩 | `src/screens/Loading.jsx` | 2.5초 연출, `prefers-reduced-motion` 시 즉시 스킵 |
| 결과 | `src/screens/Result.jsx` | 유형 카드 + 반짝 활동 + 추천 프로그램 + 공유 |

---

## 3. 유형 체계 (핵심 로직)

3개의 이분 축, 각 축 3문항 → **다수결(2/3)** 로 축 글자 결정 → 세 글자를 이어 유형 코드.

| 축 | 문항 | 값 |
|---|---|---|
| 에너지 | Q1~Q3 | **A** 활동적 / **B** 차분 |
| 몰입 | Q4~Q6 | **X** 탐구·실제 / **Y** 상상·서사 |
| 방식 | Q7~Q9 | **P** 계획·완성 / **F** 자유 |

→ 2×2×2 = **8유형**

| 코드 | 이름·동물 | 유형명 | 원정대 |
|---|---|---|---|
| AXF | 찰방·수달 🦦 | 활동적인 자유 탐구가 | 과학 |
| AXP | 토리·다람쥐 🐿️ | 활동적인 실험 완성가 | 과학 |
| AYF | 골디·골든리트리버 🐕 | 활동적인 이야기 모험가 | 농장 |
| AYP | 코코·코끼리 🐘 | 활동적인 서사 완주자 | 역사 |
| BXF | 뽀롱·고슴도치 🦔 | 차분한 탐구 발명가 | 숲 |
| BXP | 등이·거북이 🐢 | 차분한 분석 연구가 | 역사 |
| BYF | 몽실·토끼 🐰 | 차분한 상상 예술가 | 숲 |
| BYP | 밤이·부엉이 🦉 | 차분한 서사 기록가 | 농장 |

- 정의 원본: `src/data/types.js` (설명·해시태그·반짝 활동·원정대 컬러 포함)
- 판정: **`src/lib/scoring.js`** (`scoreAnswers`, `buildResult`)
- 추천: `src/data/products.js` — 원정대별 더미 상품. PB(자체) 최소 1개 하이라이트, 클릭 시 `url` 새 탭. **현재 url은 `'#'` 플레이스홀더.**

---

## 4. 파일 구조

```
src/
  data/       questions.js · types.js · products.js
  lib/        scoring.js · josa.js · kakao.js
  components/ WheelPicker.jsx (+ css)
  screens/    Intro · Profile · Question · Loading · Result (각 jsx + css)
  styles/     tokens.css · global.css
  App.jsx · main.jsx
index.html · vite.config.js · vercel.json · .env.example
docs/DEVELOPMENT.md
```

---

## 5. 주요 UX 의사결정

### 문항 네비게이션 — 탭 자동 전환 (다음 버튼 없음)
- 유형 테스트 표준(16personalities·국내 바이럴 테스트) = **1문항 1화면 + 탭하면 자동 다음**이 마찰이 가장 적음. 별도 "다음" 버튼은 두지 않음.
- 대신 되돌리기용 **은은한 "← 이전 질문"** 텍스트 버튼 제공(첫 문항은 "← 처음으로" → 프로필). 상단 **X**는 종료.
- 근거: Qualtrics / Articulate 커뮤니티의 auto-advance 베스트 프랙티스.
- (이전에 카드 하단 "이전/다음" 버튼 버전도 있었으나 표준 패턴으로 회귀.)

### 나이 입력 — 아이폰 알람식 휠 피커
- `src/components/WheelPicker.jsx`. 1~10 세로 스크롤 + `scroll-snap`으로 스냅, 가운데 밴드 강조, 위아래 페이드(mask).
- **터치**(네이티브 스크롤) + **마우스 드래그**(3px 이상 움직일 때만 드래그로 처리 → 단순 클릭은 해당 숫자로 이동) + **탭** 모두 지원.

### 이름의 한글 조사 처리
- `src/lib/josa.js` — 마지막 글자 받침 유무로 은/는, 이가/가, 이를/를 자동 선택.
- 결과 화면: "6세 서준은", "서준이가 이런 활동에서…", "서준이를 위한 맞춤 프로그램" 등.

### 접근성
- 전역 `prefers-reduced-motion` 대응(애니메이션 축소), 로딩은 즉시 스킵.
- 모바일 풀스크린 / 데스크톱 가운데 카드형 반응형, `env(safe-area-inset-*)` 노치 대응.

---

## 6. 카카오톡 공유

- 구현: `src/lib/kakao.js` + `index.html`의 Kakao JS SDK(2.7.4).
- **공유 카드 = 결과 자랑 텍스트 + 버튼**, 버튼 링크 = **테스트 시작 페이지**(친구 초대 → 바이럴).
  - 예: "서준은 찰방 수달! · 활동적인 자유 탐구가 🐊 / 1분 테스트로 확인해보세요!" + [나도 테스트 하러가기]
- 키: `.env`의 `VITE_KAKAO_JS_KEY`(클라이언트 공개 키). **미설정 시 링크 복사로 폴백** → 키 없이도 안전.
- **현재는 `objectType: 'text'`**(이미지 불필요, 즉시 동작). 유형별 이미지가 준비되면 `'feed'`(imageUrl 포함)로 승격 예정.

### 실제 동작시키기 (3단계)
1. 카카오 디벨로퍼스에서 앱 생성 → **JavaScript 키** 발급
2. `.env`에 키 넣고, 카카오 콘솔 **플랫폼 > Web 사이트 도메인**에 도메인 등록(로컬은 `http://localhost:5173`)
3. 카카오 **카카오톡 공유 활성화 ON**

---

## 7. 배포 (Vercel)

- 정적 빌드(`npm run build` → `dist/`). `vercel.json`에 SPA rewrite 설정.
- 절차: GitHub 푸시 → Vercel Import(Vite 자동 인식) → 환경변수 `VITE_KAKAO_JS_KEY` 추가 → 배포.
- 배포 후 배포 도메인을 카카오 사이트 도메인에 **추가 등록**, `index.html`의 `og:url`·`og:image` 주석 해제/교체 권장.
- **2026-07-19 기준 아직 미배포.** GitHub 원격: `github.com/katekim512/tictoccroc-playtest`.

---

## 8. 남은 일 (TODO)

- [ ] 실제 상품 데이터/URL 연동 (`src/data/products.js`의 `url`이 현재 `'#'`)
- [ ] 카카오 공유 이미지 카드(`feed`) 승격 + 유형별 OG 이미지
- [ ] 공유 카드(1:1 저장 이미지) 화면 (시안 프레임 6) — 미구현
- [ ] 부모 상황 문항 기반 추천 부스트(시안 로직) — 범위 밖으로 제외
- [ ] 이벤트 로깅(test_start / test_answer / result_view / result_share)
- [ ] 실제 배포 + 카카오 키 설정

---

## 9. 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 → dist/
```
