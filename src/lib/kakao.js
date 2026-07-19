import { josa } from './josa'

// 카카오 JavaScript 키 — .env 의 VITE_KAKAO_JS_KEY 로 주입 (클라이언트 공개용 키)
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY

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

// 테스트를 시작할 수 있는 링크 (배포되면 실제 도메인, 로컬이면 localhost)
export function getShareUrl() {
  return window.location.origin + import.meta.env.BASE_URL
}

// 결과 자랑 + 테스트 초대 카드 공유
// 성공하면 true, 카카오 미설정으로 폴백(링크 복사)하면 false
export function shareResult({ name, type }) {
  const url = getShareUrl()
  const subject = josa(name, '은/는') // "서준은" / "코코는"

  initKakao()
  const Kakao = window.Kakao

  if (!Kakao || !Kakao.isInitialized()) {
    // 카카오 키 미설정 시 폴백: 링크 복사
    copyLink(url)
    return false
  }

  Kakao.Share.sendDefault({
    objectType: 'text',
    text:
      `${subject} ${type.name} ${type.animal}! · ${type.typeName} 🐊\n\n` +
      `우리 아이 놀이 성향은?\n1분 테스트로 확인해보세요!`,
    link: { mobileWebUrl: url, webUrl: url },
    buttonTitle: '나도 테스트 하러가기',
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
