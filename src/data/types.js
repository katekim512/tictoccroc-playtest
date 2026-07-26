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
    typeName: '활동적인 자유 탐구가',
    expedition: '과학',
    desc: '물이든 흙이든 일단 뛰어들고 보는 장난꾸러기. "이거 뭐야?" 하며 만지고 뒤집고 굴려봐야 직성이 풀려요. 계획은 없지만 세상 모든 게 놀잇감입니다.',
    hashtags: ['#물놀이대장', '#호기심폭발', '#일단해보기'],
    sparks: ['💧 물·모래 놀이', '🔬 만지는 실험', '🏃 신체 탐험', '🐛 관찰·채집'],
  },
  AXP: {
    code: 'AXP',
    name: '토리',
    animal: '다람쥐',
    emoji: '🐿️',
    image: imgAXP,
    typeName: '활동적인 실험 완성가',
    expedition: '과학',
    desc: '잠시도 가만있지 않지만, 한번 시작한 건 끝을 봐야 하는 야무진 성격. 도토리를 종류별로 착착 모으듯, 관찰하고 정리하며 실험을 완성해요.',
    hashtags: ['#부지런왕', '#차곡차곡_수집', '#끝까지_완성'],
    sparks: ['🔬 단계별 실험', '🗂️ 분류·수집', '🧪 관찰 기록', '🧩 만들기 완성'],
  },
  AYF: {
    code: 'AYF',
    name: '골디',
    animal: '골든리트리버',
    emoji: '🐕',
    image: imgAYF,
    typeName: '활동적인 이야기 모험가',
    expedition: '농장',
    desc: '누구와도 금방 친구가 되는 햇살 같은 아이. 규칙보다 "그래서 다음엔?" 하며 이야기를 만들고, 친구 손 잡고 어디든 신나게 떠나요.',
    hashtags: ['#모두의친구', '#어디든_모험', '#햇살미소'],
    sparks: ['🎭 역할 놀이', '🐑 동물 교감', '🤝 협동 놀이', '🚌 나들이·탐방'],
  },
  AYP: {
    code: 'AYP',
    name: '코코',
    animal: '코끼리',
    emoji: '🐘',
    image: imgAYP,
    typeName: '활동적인 서사 완주자',
    expedition: '역사',
    desc: '든든한 맏이 같은 리더. 한번 들은 이야기는 절대 안 잊고, 시작한 모험은 무슨 일이 있어도 끝까지 완주해요. 친구들이 기댈 수 있는 큰 나무 같은 존재.',
    hashtags: ['#기억력_최강', '#무리의리더', '#끝까지_완주'],
    sparks: ['📜 이야기 탐험', '🏛️ 역사 체험', '🎬 스토리 완주', '👑 리더 놀이'],
  },
  BXF: {
    code: 'BXF',
    name: '뽀롱',
    animal: '고슴도치',
    emoji: '🦔',
    image: imgBXF,
    typeName: '차분한 탐구 발명가',
    expedition: '숲',
    desc: '조용히 웅크려 있지만 머릿속은 물음표로 가득. 남들이 지나치는 걸 가만히 들여다보다, 자기만의 방식으로 뚝딱 새로운 걸 만들어내는 마이페이스 발명가.',
    hashtags: ['#조용한관찰자', '#가시속_호기심', '#마이페이스'],
    sparks: ['🌿 숲속 관찰', '🔧 뚝딱 발명', '🍄 자연 탐구', '🧠 혼자 몰입'],
  },
  BXP: {
    code: 'BXP',
    name: '등이',
    animal: '거북이',
    emoji: '🐢',
    image: imgBXP,
    typeName: '차분한 분석 연구가',
    expedition: '역사',
    desc: '서두르는 법이 없는 느긋한 현자. 오래 보고 깊이 생각한 뒤, 순서대로 차근차근 풀어나가요. 한번 정한 건 끝까지 해내는 끈기의 소유자.',
    hashtags: ['#느긋신중', '#백년의지혜', '#끈기왕'],
    sparks: ['🧭 차근차근 분석', '📚 깊이 읽기', '🕰️ 시간 탐구', '🧩 논리 퍼즐'],
  },
  BYF: {
    code: 'BYF',
    name: '몽실',
    animal: '토끼',
    emoji: '🐰',
    image: imgBYF,
    typeName: '차분한 상상 예술가',
    expedition: '숲',
    desc: '조용하지만 머릿속엔 늘 딴 세상이 펼쳐지는 몽상가. 정답보다 상상을 좋아하고, 구름을 보면 토끼도 성도 보이는 자유로운 감성의 소유자.',
    hashtags: ['#몽실몽실_상상', '#자유로운감성', '#솜사탕마음'],
    sparks: ['🎨 자유 그리기', '☁️ 상상 놀이', '🌸 감성 자연', '🎵 음악·표현'],
  },
  BYP: {
    code: 'BYP',
    name: '밤이',
    animal: '부엉이',
    emoji: '🦉',
    image: imgBYP,
    typeName: '차분한 서사 기록가',
    expedition: '농장',
    desc: '모두가 잠든 밤, 조용히 세상을 지켜보는 지혜로운 관찰자. 들은 이야기를 하나도 빠짐없이 차곡차곡 기억하고, 필요할 때 살며시 들려주는 이야기 지킴이.',
    hashtags: ['#밤의_기록가', '#이야기지킴이', '#지혜로운눈'],
    sparks: ['📖 이야기 듣기', '✍️ 기록·일기', '🌾 자연 관찰', '🔭 조용한 탐색'],
  },
}

export function getType(code) {
  return types[code] || null
}
