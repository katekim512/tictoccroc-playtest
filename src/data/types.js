// 캐릭터 이미지 (pic/ 폴더)
import imgAXF from '../../pic/찰방이_수달.png'
import imgAXP from '../../pic/토리_다람쥐.png'
import imgAYF from '../../pic/골디_골드리트리버.png'
import imgAYP from '../../pic/코코_코끼리.png'
import imgBXF from '../../pic/뾰롱_고슴도치.png'
import imgBXP from '../../pic/등이_거북이.png'
import imgBYF from '../../pic/몽실_토끼.png'
import imgBYP from '../../pic/밤이_부엉이.png'

// 8가지 놀이 유형 — character_explain 기준
// 코드 = 에너지(A/B) + 몰입(X/Y) + 방식(P/F)
// expedition: 과학 / 농장 / 역사 / 숲  → products.js 추천 키와 연결
// emoji는 폴백용, image가 실제 캐릭터 사진

// 원정대별 대표 컬러 (결과 히어로 배경 — 단색)
export const EXPEDITION_THEME = {
  과학: { bg: '#DDF5EE' },
  농장: { bg: '#FFF2D8' },
  역사: { bg: '#E6A3A0' },
  숲: { bg: '#E7F4D8' },
}

export const types = {
  AXF: {
    code: 'AXF',
    name: '찰방',
    animal: '수달',
    emoji: '🦦',
    image: imgAXF,
    typeName: '일단 손부터 나가는 애',
    expedition: '과학',
    desc: '"이거 뭔데? 만져봐야지!" 물·흙·정체불명 웅덩이 전부 관심 대상\n계획보다 일단 해보는 게 국룰인 호기심 대장',
    hashtags: ['#만짐민정음', '#호기심_풀충전', '#일단_해보기'],
    sparks: ['💧 물·모래 놀이', '🔬 만지는 실험', '🏃 신체 탐험', '🐛 관찰·채집'],
  },
  AXP: {
    code: 'AXP',
    name: '토리',
    animal: '다람쥐',
    emoji: '🐿️',
    image: imgAXP,
    typeName: '갓생 사는 완성형',
    expedition: '과학',
    desc: '시작한 건 무조건 끝을 봄\n도토리도 종류별로 각 잡아 정리하는 야무진 요정\n"대충"이라는 단어를 모르는 완성러',
    hashtags: ['#부지런_그잡채', '#차곡차곡_수집러', '#끝까지_완성'],
    sparks: ['🔬 단계별 실험', '🗂️ 분류·수집', '🧪 관찰 기록', '🧩 만들기 완성'],
  },
  AYF: {
    code: 'AYF',
    name: '골디',
    animal: '골든리트리버',
    emoji: '🐕',
    image: imgAYF,
    typeName: '인싸력 만렙 모험러',
    expedition: '농장',
    desc: '첫 만남 3초 만에 베프 등록\n"그래서 다음엔?" 하며 이야기 만들고, 친구 손잡고 어디든 신나게 떠나는 햇살 텐션',
    hashtags: ['#모두의_친구', '#어디든_고고', '#햇살_그자체'],
    sparks: ['🎭 역할 놀이', '🐑 동물 교감', '🤝 협동 놀이', '🚌 나들이·탐방'],
  },
  AYP: {
    code: 'AYP',
    name: '코코',
    animal: '코끼리',
    emoji: '🐘',
    image: imgAYP,
    typeName: '서사 끝까지 완주러',
    expedition: '역사',
    desc: '한번 들은 얘기는 저장 완료\n시작한 모험은 끝까지 완주하는 든든한 대들보\n친구들 사이 "걔한테 물어봐" 담당',
    hashtags: ['#기억력_치트키', '#무리의_리더', '#끝까지_완주'],
    sparks: ['📜 이야기 탐험', '🏛️ 역사 체험', '🎬 스토리 완주', '👑 리더 놀이'],
  },
  BXF: {
    code: 'BXF',
    name: '뽀롱',
    animal: '고슴도치',
    emoji: '🦔',
    image: imgBXF,
    typeName: '마이웨이 발명가',
    expedition: '숲',
    desc: '조용한데 머릿속은 물음표 파티\n남들 지나친 걸 혼자 뚝딱 새로 만들어냄\n"어떻게 했어?" 물으면 씩 웃는 마이페이스 발명가',
    hashtags: ['#조용한_관찰러', '#가시속_호기심', '#마이페이스'],
    sparks: ['🌿 숲속 관찰', '🔧 뚝딱 발명', '🍄 자연 탐구', '🧠 혼자 몰입'],
  },
  BXP: {
    code: 'BXP',
    name: '등이',
    animal: '거북이',
    emoji: '🐢',
    image: imgBXP,
    typeName: '느긋함이 무기',
    expedition: '역사',
    desc: '서두르는 법이 없는 느긋한 현자\n깊게 파고 순서대로 차근차근, 한번 정한 건 끝까지 해내는 끈기 만렙',
    hashtags: ['#느긋신중_라이프', '#백년의_지혜', '#끈기_만렙'],
    sparks: ['🧭 차근차근 분석', '📚 깊이 읽기', '🕰️ 시간 탐구', '🧩 논리 퍼즐'],
  },
  BYF: {
    code: 'BYF',
    name: '몽실',
    animal: '토끼',
    emoji: '🐰',
    image: imgBYF,
    typeName: '상상력 오버클럭',
    expedition: '숲',
    desc: '겉은 조용, 속은 딴 세상 펼쳐지는 몽상가\n정답보다 상상이 취향\n구름 보면 토끼도 성도 보이는 감성 부자',
    hashtags: ['#몽실몽실_상상', '#자유로운_감성', '#솜사탕_마음'],
    sparks: ['🎨 자유 그리기', '☁️ 상상 놀이', '🌸 감성 자연', '🎵 음악·표현'],
  },
  BYP: {
    code: 'BYP',
    name: '밤이',
    animal: '부엉이',
    emoji: '🦉',
    image: imgBYP,
    typeName: '팩트 저장 기록가',
    expedition: '농장',
    desc: '다들 잘 때 조용히 세상 관찰하는 밤의 요정\n들은 얘기 하나도 안 흘리고 저장했다가 결정적일 때 툭 꺼내는 디테일 장인',
    hashtags: ['#밤의_기록러', '#이야기_지킴이', '#지혜로운_눈'],
    sparks: ['📖 이야기 듣기', '✍️ 기록·일기', '🌾 자연 관찰', '🔭 조용한 탐색'],
  },
}

export function getType(code) {
  return types[code] || null
}
