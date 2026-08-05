// GA4(Google Analytics) 연동 — 측정 ID는 .env 의 VITE_GA_ID (예: G-XXXXXXXXXX)
// ID가 없으면 모든 함수가 no-op 이라 개발 중에도 안전.

const GA_ID = import.meta.env.VITE_GA_ID

// gtag.js 로드 + 초기화 (한 번만)
export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_ID) return
  if (window.gtag) return

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // SPA라 화면 전환마다 page_view를 직접 보냄 → 자동 전송은 끔
  window.gtag('config', GA_ID, { send_page_view: false })
}

// 커스텀 이벤트 전송
export function track(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return
  window.gtag('event', name, params)
}

// 스크린 전환 시 수동 page_view
export function pageView(screen) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return
  window.gtag('event', 'page_view', {
    screen,
    page_title: `놀이성향테스트 · ${screen}`,
    page_location: window.location.href,
  })
}

// 나이 → 개인정보 최소화용 버킷 (이름은 절대 전송하지 않음)
export function ageGroup(age) {
  const a = Number(age)
  if (!a) return 'unknown'
  if (a <= 4) return '3-4'
  if (a <= 6) return '5-6'
  if (a <= 8) return '7-8'
  if (a <= 10) return '9-10'
  return '11-13'
}

// 상품 식별자 — url 마지막 경로(program 번호)를 id로 사용
export function productId(url) {
  if (!url) return 'unknown'
  return url.split('/').filter(Boolean).pop() || 'unknown'
}
