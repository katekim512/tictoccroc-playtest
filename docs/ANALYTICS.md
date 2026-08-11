# 애널리틱스(GA4) — 수집 데이터 & 활용 계획

놀이 성향 테스트의 **유입 → 시작 → 완료 → 결과 → 상품 클릭/저장/공유 → 재유입**을 측정한다.
이 문서는 **무엇을 수집하는지**와 **어떻게 활용할지**를 한눈에 정리한 기준 문서다.

- 측정 도구: **GA4** (gtag 직접 연동, 측정 ID `VITE_GA_ID`)
- 구현: [`src/lib/analytics.js`](../src/lib/analytics.js) `track(name, params)` / `pageView(screen)` — ID 없으면 no-op
- 발화 지점: `App.jsx`(화면 전환·시작·프로필), `Question.jsx`(문항), `Result.jsx`(결과·상품·저장·공유)

---

## 1. 측정 목적 (무엇을 알고 싶은가)
- 어디서 얼마나 들어오나? (유입 채널·캠페인)
- 시작한 사람 중 몇 %가 끝까지 하나? 어느 문항에서 이탈하나?
- 어떤 유형/원정대/나이가 많이 나오나?
- 결과에서 **상품을 얼마나 클릭**하나? (째깍 PICK vs 일반, 슬롯별)
- 얼마나 **저장·공유**하고, 공유가 **재유입/전환**으로 이어지나?

## 2. 수집 이벤트 (현재 구현) & 활용

| 이벤트 | 발생 시점 | 파라미터 | 활용 |
|---|---|---|---|
| `page_view` | 화면 전환마다(SPA) | `screen` | 화면별 도달·이탈, 퍼널 기본 |
| `test_start` | 인트로 시작 버튼 | — | 시작 수(시작률 분모) |
| `profile_submit` | 이름·나이 입력 완료 | `age_group`, `age` | 참여자 나이 분포 |
| `question_answer` | 문항 선택마다 | `q_id`, `q_index`, `axis`, `choice` | **문항별 이탈**, 선택 쏠림 |
| `result_view` | 결과 표시 | `type_code`, `expedition`, `energy`, `immersion`, `style`, `age_group`, `age` | **완료 수**, 유형/원정대/나이 분포 |
| `product_impression` | 결과 상품 노출 | `product_id`, `expedition`, `slot`, `is_pb` | CTR 분모(노출) |
| `product_click` | 상품 카드 클릭 ★ | `product_id`, `product_name`, `expedition`, `slot`, `is_pb`, `link_url` | **상품 CTR**, 슬롯·PB 효율, 전환 시작 |
| `image_save` | 결과 이미지 저장 | `type_code` | 저장율(콘텐츠 매력도) |
| `share_click` | 링크 공유 | `type_code`, `channel` | 공유율(바이럴 의도) |
| `restart_click` | 다시 하기 | — | 재도전율 |

> 개인정보 보호: **아이 이름은 절대 전송하지 않는다.** 나이는 `age_group` 버킷과 `age`(숫자)만.

## 3. 파라미터 = 맞춤 측정기준 등록 목록
> GA4 관리 → 데이터 표시 → 맞춤 정의 → **맞춤 측정기준** → 범위 **이벤트**. 등록 **시점 이후**부터 수집(소급 X).

| 측정기준 이름 | 이벤트 매개변수 | 설명 |
|---|---|---|
| 유형 코드 | `type_code` | AXF~BYP |
| 원정대 | `expedition` | 과학/농장/역사/숲 |
| 나이대 | `age_group` | 3-4/5-6/7-8/9-10/11-13 |
| 나이 | `age` | 1~13 (정확한 나이) |
| 에너지축 | `energy` | A/B |
| 몰입축 | `immersion` | X/Y |
| 방식축 | `style` | P/F |
| 화면 | `screen` | intro/profile/question/loading/result |
| 문항 순번 | `q_index` | 1~9 |
| 문항 축 | `axis` | energy/immersion/style |
| 선택값 | `choice` | A/B/X/Y/P/F |
| 상품 슬롯 | `slot` | 1/2/3 |
| PB 여부 | `is_pb` | 째깍 PICK true/false |
| 상품 ID | `product_id` | 추천 상품 식별자 |
| 공유 채널 | `channel` | link/kakao |
| (선택) 상품명 | `product_name` | 클릭 상품명 |

## 4. 핵심 지표(KPI) & 계산식

| KPI | 계산 | 의미 |
|---|---|---|
| 시작률 | `test_start` / 인트로 `page_view` | 후킹 효과 |
| 완료율 | `result_view` / `test_start` | 테스트 길이·재미 |
| 문항 이탈 | q1~q9 `question_answer` 잔존율 | 이탈 문항 파악 |
| 상품 CTR | `product_click` / `product_impression` | 추천 매력도 |
| PB CTR | `is_pb=true` 세그먼트 CTR | 자체 상품 효율 |
| 저장율 | `image_save` / `result_view` | 결과 콘텐츠 매력 |
| 공유율 | `share_click` / `result_view` | 바이럴 의도 |
| 바이럴 재유입 | `utm_medium=share` 세션 | 실제 확산 |
| 상품 전환 기여 | 상품 사이트에서 `utm_source=play_test` | ROI |

## 5. 활용 시나리오 (분석 → 액션)
- **문항 이탈이 특정 Q에 몰림** → 그 문항 문구/선택지 개선, 순서 조정
- **완료율 낮음** → 로딩 연출·문항 수·카피 손보기
- **유형 분포 편중**(특정 유형만 과다) → 채점 밸런스/문항 재조정
- **슬롯1 CTR≫슬롯2·3** → 추천 순서·개수 최적화
- **PB CTR 낮음** → PB 카드 카피/썸네일/가격 노출 개선
- **저장·공유율 높은 유형 vs 낮은 유형** → 낮은 유형의 캐릭터/대사/카드 디자인 강화
- **나이/유형별 상품 클릭 성향** → 추천 로직 개인화(원정대 매핑 튜닝)
- **채널별 완료율·전환** → 광고/배너 카피·타겟 조정
- **공유→재유입 계수** → 공유 문구/카드 A/B로 바이럴 강화

## 6. 리포트 만드는 법 (GA4 탐색)
> 좌측 **탐색(Explore)** → 새로 만들기 → 좌측에서 측정기준/측정항목 추가 후 **행·값 칸에 드래그**. **총 사용자**=사람 수, **이벤트 수**=횟수.

- **유형 분포**: 자유형식 · 행 `type_code` · 값 `총 사용자` · 필터 `event=result_view`
- **나이 분포**: 행 `age`(또는 `age_group`) · 값 `총 사용자` · 필터 `event=result_view`
- **완료율/문항 이탈**: 유입경로(퍼널) · 단계 `test_start → question_answer(q_index별) → result_view`
- **상품 CTR / PB·슬롯**: 자유형식 · 행 `is_pb`/`slot` · 값 `이벤트 수` · `product_click` vs `product_impression`
- **유입/공유 재유입**(설정 불필요): 보고서 → 획득 → 트래픽 획득 → 소스/매체(`kakao/share`)

## 7. 유입·어트리뷰션 (UTM)
- **공유 링크**(`src/lib/kakao.js` `getShareUrl`): `utm_source=kakao&utm_medium=share&utm_campaign=play_test&type={코드}` → 재유입·공유 유발 유형 측정
- **상품 아웃바운드**(`src/screens/Result.jsx` `openProduct`): `utm_source=play_test&utm_medium=result_reco&utm_campaign=play_test&content={product_id}&slot={n}` → 상품 사이트가 테스트 기여 귀속
- **크로스도메인**(선택): 테스트(Vercel)·상품(parent.tictoccroc.com)이 **같은 GA4 속성**이면 관리 → 데이터 스트림 → 태그 설정 → 도메인 구성에 두 도메인 등록 → 구매까지 한 여정으로 측정

## 8. 개인정보
- **아이 이름 미전송**(PII). 나이는 `age_group`·`age`만.
- 국내 정식 운영 시 **동의(Consent) 배너** 검토 — 현재 미적용.

## 9. 설정 체크리스트
- [x] GA4 연동(gtag) + 이벤트 발화(§2)
- [x] 상품/공유 링크 UTM
- [ ] GA4 **맞춤 측정기준 등록**(§3) — *등록 시점부터 수집이라 우선*
- [ ] `product_click`·`share_click`·`image_save` **핵심 이벤트(전환) 표시** (관리 → 이벤트)
- [ ] Vercel 환경변수 `VITE_GA_ID` + Redeploy (배포 수집)
- [ ] 탐색 리포트(퍼널·유형분포·CTR) 저장 (§6)
- [ ] (선택) 크로스도메인, 동의 배너
