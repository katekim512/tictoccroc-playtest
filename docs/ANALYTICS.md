# 애널리틱스(GA4) 측정 플랜

놀이 성향 테스트의 **유입 → 시작 → 완료 → 결과 → 상품 클릭 → 공유(재유입)** 를 측정하기 위한 계획과 구현 정리.

---

## 1. 측정으로 답할 질문
- 어디서 얼마나 들어오나? (유입 채널·캠페인)
- 시작한 사람 중 몇 %가 끝까지 하나? (완료율·문항 이탈)
- 어떤 유형/원정대가 많이 나오나?
- 결과에서 **상품을 얼마나 클릭**하나? (째깍 PICK vs 일반, 슬롯별)
- 얼마나 **공유**하고, 공유가 **재유입**으로 이어지나?

## 2. 핵심 퍼널 & KPI
```
유입(세션) → test_start → (q1…q9) → result_view → product_click → share_click
```
| KPI | 정의 |
|---|---|
| 시작률 | `test_start / 인트로 page_view` |
| 완료율 | `result_view / test_start` |
| 문항 이탈 | q1~q9별 `question_answer` 잔존율 |
| 상품 CTR | `product_click / product_impression` |
| PB CTR | `is_pb=true` 세그먼트 CTR |
| 공유율 | `share_click / result_view` |
| 바이럴 재유입 | `utm_medium=share` 세션 수 |

## 3. 수집 이벤트 (GA4 스키마)
> SPA라 화면 전환 시 `page_view`를 **수동 전송**한다. (`send_page_view: false`)

| 이벤트 | 시점 | 주요 파라미터 | 구현 위치 |
|---|---|---|---|
| `page_view` | 스크린 전환마다 | `screen`, `page_location` | `App.jsx` (step 변경) |
| `test_start` | 인트로 시작 버튼 | — | `App.jsx` onStart |
| `profile_submit` | 이름·나이 입력 완료 | `age_group` | `App.jsx` onNext |
| `question_answer` | 문항 선택마다 | `q_id`, `q_index`, `axis`, `choice` | `Question.jsx` |
| `result_view` | 결과 표시 | `type_code`, `expedition`, `energy/immersion/style`, `age_group` | `Result.jsx` |
| `product_impression` | 결과 상품 노출 | `product_id`, `expedition`, `slot`, `is_pb` | `Result.jsx` |
| `product_click` | 상품 카드 클릭 ★ | `product_id`, `product_name`, `expedition`, `slot`, `is_pb`, `link_url` | `Result.jsx` |
| `share_click` | 카카오 공유 | `type_code`, `channel` | `Result.jsx` |
| `restart_click` | 다시 하기 | — | `App.jsx` |

- 구현: [`src/lib/analytics.js`](../src/lib/analytics.js) 의 `track(name, params)` / `pageView(screen)`.
- 측정 ID(`VITE_GA_ID`)가 없으면 전부 no-op → 개발 중 안전.

## 4. 분석 축 (GA4 맞춤 측정기준으로 등록)
GA4 > 관리 > **맞춤 정의 > 맞춤 측정기준**에 아래 이벤트 파라미터를 등록해야 리포트에서 쪼개볼 수 있다(등록 후 데이터부터 반영).

`screen · type_code · expedition · energy · immersion · style · age_group · product_id · slot · is_pb · q_id · axis · choice`

→ "나이대별 인기 유형", "원정대별 상품 CTR", "PB vs 일반", "문항별 이탈" 등 교차 분석.

## 5. 유입·어트리뷰션 (2단계)
- **유입**: GA4가 source/medium/campaign 자동 수집. 광고·배너 링크엔 UTM 부착.
- **공유 링크**: 카카오 공유 URL에 `?utm_source=kakao&utm_medium=share&utm_campaign=play_test&type={코드}` → 재유입 측정 + 어떤 결과가 공유를 유발했는지.
- **상품 아웃바운드**: `parent.tictoccroc.com/...` 링크에 `?utm_source=play_test&utm_medium=result_reco&content={product_id}&slot={n}` → 목적지 사이트가 테스트 기여를 귀속.
- **크로스도메인**(선택): 테스트(Vercel)와 상품(parent.tictoccroc.com)은 **도메인이 다르다**. 두 사이트를 한 사용자 여정(테스트→구매)으로 이으려면, 같은 GA4 속성에서 **관리 > 데이터 스트림 > 태그 설정 구성 > 도메인 구성**에 두 도메인을 등록한다. 상품 사이트 GA 접근이 없으면 UTM만으로 진행.

## 6. 만들 리포트 (GA4 탐색)
- **깔때기(퍼널) 탐색**: 인트로→test_start→(문항)→result_view→product_click 이탈 지점.
- **세그먼트/자유형식**: 유형별·나이대별 상품 CTR, PB vs 일반, 슬롯 1/2/3 CTR.
- **획득 리포트**: 채널별 완료율·공유율, share 재유입 규모.

## 7. 설정 단계 (GA4 콘솔)
1. [analytics.google.com](https://analytics.google.com) → 관리 → 계정/속성 만들기(시간대 한국, KRW).
2. **데이터 스트림 > 웹** → 배포 URL 입력 → **측정 ID `G-XXXXXXXXXX`** 획득.
3. `.env` 에 `VITE_GA_ID=G-XXXXXXXXXX` 입력 (Vercel은 환경변수에도 추가 후 재배포).
4. 맞춤 측정기준 등록(§4).
5. (2단계) UTM 부착·크로스도메인·탐색 리포트 구성.

## 8. 개인정보 주의 ⚠️
- **아이 이름은 절대 GA로 전송하지 않는다**(PII). 코드에서 이름은 이벤트 파라미터에 포함되지 않음.
- 나이는 `age_group` 버킷(3-4/5-6/7-8/9-10/11-13)으로만 전송.
- 동의 배너(Consent)는 현재 미적용 — 국내 서비스 정식 운영 시 검토 필요.

## 9. 구현 상태
- [x] 1단계: GA4 로더 + page_view·test_start·profile_submit·question_answer·result_view·product_impression·product_click·share_click·restart_click
- [ ] 2단계: UTM(공유/상품 링크), 맞춤 측정기준 등록, 탐색 리포트
- [ ] 3단계: 크로스도메인, 바이럴 계수, 동의 배너
