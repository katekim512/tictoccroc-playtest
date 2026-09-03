import { josa } from './josa'

// 카카오 JavaScript 키 — .env 의 VITE_KAKAO_JS_KEY 로 주입 (클라이언트 공개용 키)
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY
const SHARE_ORIGIN = 'https://tictoccroc-playtest.vercel.app'

// SDK 로드 + 초기화 (한 번만)
export function initKakao() {
  if (typeof window === 'undefined') return
  const Kakao = window.Kakao
  if (!Kakao || !KAKAO_JS_KEY) return
  if (!Kakao.isInitialized()) {
    Kakao.init(KAKAO_JS_KEY)
  }
}

export function isKakaoConfigured() {
  return Boolean(typeof window !== 'undefined' && window.Kakao && KAKAO_JS_KEY)
}

// 공유용 링크 — UTM 꼬리표를 붙여 GA4가 유입(재방문)을 집계할 수 있게 함
// 예: https://도메인/?utm_source=kakao&utm_medium=share&utm_campaign=play_test&type=AXF
export function getShareUrl(params = {}) {
  const base = SHARE_ORIGIN + import.meta.env.BASE_URL
  const usp = new URLSearchParams({
    utm_source: 'kakao',
    utm_medium: 'share',
    utm_campaign: 'play_test',
    ...params,
  })
  return `${base}?${usp.toString()}`
}

// 결과 자랑 + 테스트 초대 카드 공유
// 성공하면 true, 카카오 미설정으로 폴백(링크 복사)하면 false
export function shareResult({ name, type }) {
  // 어떤 결과가 공유를 유발했는지 보려고 유형 코드도 링크에 실음
  const url = getShareUrl({ type: type.code, name })
  const subject = josa(name, '이는/는') // "서준이는" / "코코는"

  initKakao()
  const Kakao = window.Kakao

  if (!Kakao || !Kakao.isInitialized()) {
    // 카카오 키 미설정 시 폴백: 링크 복사
    copyLink(url)
    return false
  }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${subject} ${type.name}!`,
      description: '여기를 눌러 링크를 확인하세요',
      imageUrl: new URL(type.image, SHARE_ORIGIN).href,
      link: { mobileWebUrl: url, webUrl: url },
    },
    buttons: [
      {
        title: '여기를 눌러 링크를 확인하세요',
        link: { mobileWebUrl: url, webUrl: url },
      },
    ],
  })
  return true
}

function copyLink(url) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(
      () => window.alert(`공유 링크를 복사했어요!\n${url}`),
      () => window.prompt('아래 링크를 복사해서 공유하세요', url),
    )
  } else {
    window.prompt('아래 링크를 복사해서 공유하세요', url)
  }
}
