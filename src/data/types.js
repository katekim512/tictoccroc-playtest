// 캐릭터 이미지 (pic2/ 폴더 — 유형코드_이름.png)
import imgAXF from '../../pic2/AXF_호기심대장 째각이.png'
import imgAXP from '../../pic2/AXP_발견왕 째깍이.png'
import imgAYF from '../../pic2/AYF_친구대장 째깍이.png'
import imgAYP from '../../pic2/AYP_탐험가 째각이.png'
import imgBXF from '../../pic2/BXF_발명가 째각이.png'
import imgBXP from '../../pic2/BXP_척척박사 째깍이.png'
import imgBYF from '../../pic2/BYF_상상가 째각이.png'
import imgBYP from '../../pic2/BYP_동물탐정 째각이.png'

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
    name: '호기심대장 째각이',
    animal: '수달',
    emoji: '🦦',
    image: imgAXF,
    typeName: '탐사 1호 · 만짐 담당',
    quote: '저 만져보면 몰라! 내가 먼저 갈게!',
    expedition: '과학',
    desc: '"이거 뭔데? 만져봐야지!"\n물·흙·정체불명 웅덩이 전부 관심 대상\n계획보다 일단 해보는 게 국룰인 호기심 대장',
    hashtags: ['#만짐민정음', '#호기심_풀충전', '#일단_해보기'],
    observation:
      '새로운 것을 발견하면 **스스로 먼저 다가가 탐색**하려는 모습을 보여요.\n이런 성향의 아이는 **자연 속 탐험**이나 **미션형 체험**에서 높은 몰입도를 보이는 경우가 많습니다.',
    activities: ['탐험 미션', '곤충 관찰', '과학 실험', '자연 탐색'],
  },
  AXP: {
    code: 'AXP',
    name: '발견왕 째깍이',
    animal: '다람쥐',
    emoji: '🐿️',
    image: imgAXP,
    typeName: '기록 대장 · 수집 담당',
    quote: '하나도 안 빠뜨렸지? 다 챙겼다!',
    expedition: '과학',
    desc: '시작한 건 무조건 끝을 봄\n발견한 건 하나도 빠짐없이 챙기는 수집가\n"대충"이라는 단어를 모르는 완성러',
    hashtags: ['#부지런_그잡채', '#차곡차곡_수집러', '#끝까지_완성'],
    observation:
      '**작은 차이를 잘 발견**하고, 마음에 드는 것은 **차곡차곡 모으거나 끝까지 완성**하려는 모습을 보여요.\n이런 성향의 아이는 **관찰하고 기록**하며 결과를 만들어가는 활동에서 집중력이 높아지는 경우가 많습니다.',
    activities: ['자연물 수집', '실험하기', '관찰 기록', '규칙 찾기'],
  },
  AYF: {
    code: 'AYF',
    name: '친구대장 째깍이',
    animal: '골든리트리버',
    emoji: '🐕',
    image: imgAYF,
    typeName: '분위기 메이커 · 앞장 담당',
    quote: '다 같이 가자! 길은 내가 안다니까?',
    expedition: '농장',
    desc: '첫 만남 3초 만에 베프 등록\n"그래서 다음엔?" 하며 이야기 만들고,\n친구 손잡고 어디든 신나게 떠나는 햇살 텐션',
    hashtags: ['#모두의_친구', '#어디든_고고', '#햇살_그자체'],
    observation:
      '친구들과 **금방 어울리고** 새로운 사람과도 **자연스럽게 관계를 만들어가는** 모습을 보여요.\n이런 성향의 아이는 **함께 협력하고** 다양한 사람·동물과 **교감하는 체험**에서 즐거움을 크게 느끼는 경우가 많습니다.',
    activities: ['역할놀이', '협동 게임', '동물 교감', '체험 미션'],
  },
  AYP: {
    code: 'AYP',
    name: '탐험가 째각이',
    animal: '코끼리',
    emoji: '🐘',
    image: imgAYP,
    typeName: '원정 대장 · 길잡이 담당',
    quote: '한번 정한 길, 끝까지 간다!',
    expedition: '역사',
    desc: '한번 들은 얘기는 저장 완료\n시작한 모험은 끝까지 완주하는 든든한 대들보\n친구들 사이 "걔한테 물어봐" 담당',
    hashtags: ['#기억력_치트키', '#무리의_리더', '#끝까지_완주'],
    observation:
      '이야기를 **오래 기억하고** 목표가 생기면 **끝까지 해내려는** 모습을 보여요.\n이런 성향의 아이는 **스토리를 따라가며 미션을 해결하는 체험**에서 높은 몰입을 보이는 경우가 많습니다.',
    activities: ['역사 탐험', '미션 수행', '리더 역할', '스토리 체험'],
  },
  BXF: {
    code: 'BXF',
    name: '발명가 째각이',
    animal: '고슴도치',
    emoji: '🦔',
    image: imgBXF,
    typeName: '발명 담당 · 정찰병',
    quote: '이거… 내가 만든 건데, 한번 볼래?',
    expedition: '숲',
    desc: '조용한데 머릿속은 물음표 파티\n남들 지나친 걸 혼자 뚝딱 새로 만들어냄\n"어떻게 했어?" 물으면 씩 웃는 마이페이스 발명가',
    hashtags: ['#조용한_관찰러', '#아이디어_발전소', '#마이페이스'],
    observation:
      '**조용히 주변을 살피며** 자신만의 방법으로 **문제를 해결**하려는 모습을 보여요.\n이런 성향의 아이는 자연을 **천천히 관찰하고 직접 탐구하는 활동**에서 강점을 보이는 경우가 많습니다.',
    activities: ['식물 관찰', '숲 탐험', '자연물 만들기', '곤충 관찰'],
  },
  BXP: {
    code: 'BXP',
    name: '척척박사 째깍이',
    animal: '거북이',
    emoji: '🐢',
    image: imgBXP,
    typeName: '작전 참모 · 끈기 담당',
    quote: '급할 거 없어. 천천히, 확실하게.',
    expedition: '역사',
    desc: '서두르는 법이 없는 느긋한 현자\n깊게 파고 순서대로 차근차근,\n한번 정한 건 끝까지 해내는 끈기 만렙',
    hashtags: ['#느긋신중_라이프', '#백년의_지혜', '#끈기_만렙'],
    observation:
      '서두르기보다 **차근차근 살펴보고**, 들은 내용을 **오래 기억하며 끝까지 해내려는** 모습을 보여요.\n이런 성향의 아이는 **이야기를 깊이 이해하고 순서를 따라가는 체험**에서 높은 집중력을 보이는 경우가 많습니다.',
    activities: ['유물 관찰', '지도 따라가기', '이야기 정리', '비교 관찰'],
  },
  BYF: {
    code: 'BYF',
    name: '상상가 째각이',
    animal: '토끼',
    emoji: '🐰',
    image: imgBYF,
    typeName: '상상 담당 · 지도 제작',
    quote: '저 구름 너머엔 뭐가 있을까?',
    expedition: '숲',
    desc: '겉은 조용, 속은 딴 세상 펼쳐지는 몽상가\n정답보다 상상이 취향\n구름 보면 토끼도 성도 보이는 감성 부자',
    hashtags: ['#몽실몽실_상상', '#자유로운_감성', '#솜사탕_마음'],
    observation:
      '주변에서 본 것을 **자신만의 상상으로 표현**하고, **자유롭게 이야기를 만들어가는** 모습을 보여요.\n이런 성향의 아이는 자연 속에서 **창의력을 발휘**하거나 **예술적으로 표현하는 활동**에서 즐거움을 느끼는 경우가 많습니다.',
    activities: ['자연 미술', '만들기', '상상놀이', '꽃·나뭇잎 관찰'],
  },
  BYP: {
    code: 'BYP',
    name: '동물탐정 째각이',
    animal: '부엉이',
    emoji: '🦉',
    image: imgBYP,
    typeName: '야간 관측 · 기록 담당',
    quote: '다들 잘 때, 내가 다 봐뒀어.',
    expedition: '농장',
    desc: '다들 잘 때 조용히 세상 관찰하는 밤의 탐정\n들은 얘기 하나도 안 흘리고 저장했다가 결정적일 때 툭 꺼내는 디테일 장인',
    hashtags: ['#밤의_기록러', '#이야기_지킴이', '#지혜로운_눈'],
    observation:
      '조용히 주변을 관찰하며 **작은 변화도 잘 기억**하고, **이야기에 귀 기울이는** 모습을 보여요.\n이런 성향의 아이는 자연과 동물을 **세심하게 관찰**하거나 **이야기를 통해 배우는 체험**에서 몰입하는 경우가 많습니다.',
    activities: ['생태 관찰', '이야기 듣기', '동물 관찰', '자연 기록'],
  },
}

export function getType(code) {
  return types[code] || null
}
