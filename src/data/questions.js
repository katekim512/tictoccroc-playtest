// 9 문항 · 3개 축(각 3문항) · A/B 2지선다
// axis: 'energy' → A(활동적) / B(차분)
//       'immersion' → X(탐구·실제) / Y(상상·서사)
//       'style' → P(계획·완성) / F(자유)
// value 는 해당 축의 글자. 다수결(2/3)로 축 글자를 결정한다.

export const AXIS_META = {
  energy: { eyebrow: '🐊 아이의 에너지' },
  immersion: { eyebrow: '🐊 아이의 몰입 스타일' },
  style: { eyebrow: '🐊 노는 방식' },
}

export const questions = [
  {
    id: 'q1',
    axis: 'energy',
    title: '처음 가보는 키즈카페에 도착하면?',
    options: [
      { icon: '🏃', label: '신발 벗자마자\n뛰어들어가요', value: 'A' },
      { icon: '👀', label: '입구에서 한 바퀴\n둘러보고 골라요', value: 'B' },
    ],
  },
  {
    id: 'q2',
    axis: 'energy',
    title: '아이가 제일 신나 하는 놀이는?',
    options: [
      { icon: '🤸', label: '술래잡기, 미끄럼틀\n몸으로 노는 게 최고!', value: 'A' },
      { icon: '🧩', label: '블록 조립, 그리기\n앉아서 하는 놀이가 좋아요', value: 'B' },
    ],
  },
  {
    id: 'q3',
    axis: 'energy',
    title: '하루 종일 놀고 온 날 저녁엔?',
    options: [
      { icon: '⚡', label: '그래도 에너지가\n남아돌아요', value: 'A' },
      { icon: '🌙', label: '조용한 놀이로\n하루를 마무리해요', value: 'B' },
    ],
  },
  {
    id: 'q4',
    axis: 'immersion',
    title: '새 장난감을 받으면?',
    options: [
      { icon: '🔍', label: '어떻게 움직이는지\n뜯어보고 눌러봐요', value: 'X' },
      { icon: '📖', label: '장난감으로 이야기를\n지어내며 놀아요', value: 'Y' },
    ],
  },
  {
    id: 'q5',
    axis: 'immersion',
    title: '아이가 자주 하는 질문은?',
    options: [
      { icon: '❓', label: '"왜? 어떻게\n그렇게 돼?"', value: 'X' },
      { icon: '💬', label: '"그래서 그 다음엔\n어떻게 됐어?"', value: 'Y' },
    ],
  },
  {
    id: 'q6',
    axis: 'immersion',
    title: '그림을 그릴 때 아이는?',
    options: [
      { icon: '✏️', label: '실제랑 똑같이\n그리려고 애써요', value: 'X' },
      { icon: '🎨', label: '상상 속 세계를\n자유롭게 그려요', value: 'Y' },
    ],
  },
  {
    id: 'q7',
    axis: 'style',
    title: '블록으로 만들기를 할 때?',
    options: [
      { icon: '📋', label: '설명서 순서대로\n끝까지 완성해요', value: 'P' },
      { icon: '🎪', label: '설명서는 제쳐두고\n내 마음대로 만들어요', value: 'F' },
    ],
  },
  {
    id: 'q8',
    axis: 'style',
    title: '놀이가 계획이랑 달라지면?',
    options: [
      { icon: '🎯', label: '원래 하려던 대로\n하고 싶어 해요', value: 'P' },
      { icon: '💡', label: '"그럼 이렇게 하자!"\n금방 새 놀이를 만들어요', value: 'F' },
    ],
  },
  {
    id: 'q9',
    axis: 'style',
    title: '정리 시간이 되면?',
    options: [
      { icon: '📦', label: '자리 맞춰 차곡차곡\n정리하는 것도 놀이예요', value: 'P' },
      { icon: '🎈', label: '"노는 게 아직\n안 끝났는데요?"', value: 'F' },
    ],
  },
]
