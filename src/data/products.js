// 원정대(과학/농장/역사/숲)별 추천 프로그램 — 째깍악어 실제 상품
// meta: 권역, url: 상세/신청 페이지, thumbImg: 상품 썸네일(thumbnail/ 폴더)
// 상품명에 '단독'이 포함되면 결과 화면에서 '째깍 PICK' 라벨 + 노란 하이라이트로 표시

// 썸네일 이미지 (thumbnail/ 폴더)
import thumbSci1 from '../../thumbnail/종로_국립어린이과학관.png'
import thumbSci2 from '../../thumbnail/노원_서울시립과학관.png'
import thumbSci3 from '../../thumbnail/서울상상나라.png'
import thumbFarm1 from '../../thumbnail/서대문_농업박물관.png'
import thumbFarm2 from '../../thumbnail/서대문_자연사박물관.png'
import thumbFarm3 from '../../thumbnail/서울어린이대공원.png'
import thumbHist1 from '../../thumbnail/국립중앙박물관_4인소수정예.png'
import thumbHist2 from '../../thumbnail/국립중앙박물관_한국사도슨트.jpg'
import thumbHist3 from '../../thumbnail/국립중앙박물관_부모분리도슨트.png'
import thumbForest1 from '../../thumbnail/서울숲.png'
import thumbForest2 from '../../thumbnail/올림픽공원.png'
import thumbForest3 from '../../thumbnail/선유도공원.png'

export const productsByExpedition = {
  과학: [
    {
      thumbImg: thumbSci1,
      title: '[종로 국립어린이과학관] 공룡부터 로봇까지, 만지는 과학체험 ★단독',
      meta: '서울 중부',
      price: '50,000원',
      url: 'https://parent.tictoccroc.com/island/11/program/799',
    },
    {
      thumbImg: thumbSci2,
      title: '[노원 서울시립과학관] 6세이상 추천·초등 과학 원리 완벽 정복 ★단독',
      meta: '서울 북부',
      price: '50,000원',
      url: 'https://parent.tictoccroc.com/island/11/program/860',
    },
    {
      thumbImg: thumbSci3,
      title: '[서울상상나라] 4-6세 추천·과학·예술·문화 체험을 한 번에 ★단독',
      meta: '서울 북부',
      price: '45,000원',
      url: 'https://parent.tictoccroc.com/island/11/program/706',
    },
  ],
  농장: [
    {
      thumbImg: thumbFarm1,
      title: '[서울 서대문 농업박물관] 역사나래 어린이역사체험 도슨트',
      meta: '서울 서부',
      price: '40,000원',
      url: 'https://parent.tictoccroc.com/island/25/program/1043',
    },
    {
      thumbImg: thumbFarm2,
      title: '[서울 서대문자연사박물관] 역사나래 한국사 박물관수업',
      meta: '서울 서부',
      price: '32,000원',
      url: 'https://parent.tictoccroc.com/island/25/program/1038',
    },
    {
      thumbImg: thumbFarm3,
      title: '[서울어린이대공원] 여름 숲체험',
      meta: '서울 북부',
      price: '35,000원',
      url: 'https://parent.tictoccroc.com/island/13/program/686',
    },
  ],
  역사: [
    {
      thumbImg: thumbHist1,
      title: '[국립중앙박물관] 초등 4인 소수정예 역사원정대 – 조선시대',
      meta: '서울 중부',
      price: '32,500원',
      url: 'https://parent.tictoccroc.com/island/20/program/851',
    },
    {
      thumbImg: thumbHist2,
      title: '[얼리버드] 국립중앙박물관 초등 한국사 도슨트 4회 완성 – 선사시대',
      meta: '서울 중부',
      price: '29,900원',
      url: 'https://parent.tictoccroc.com/island/14/program/838',
    },
    {
      thumbImg: thumbHist3,
      title: '[국립중앙박물관] 부모분리 한국사 도슨트 1강 (선사~삼국)',
      meta: '서울 중부',
      price: '33,900원',
      url: 'https://parent.tictoccroc.com/island/14/program/728',
    },
  ],
  숲: [
    {
      thumbImg: thumbForest1,
      title: '[서울숲] 여름 숲체험 (매주 금 밤숲)',
      meta: '서울 북부',
      price: '35,000원',
      url: 'https://parent.tictoccroc.com/island/13/program/687',
    },
    {
      thumbImg: thumbForest2,
      title: '[올림픽공원] 여름 숲체험 (매주 금 밤숲)',
      meta: '서울 남부',
      price: '35,000원',
      url: 'https://parent.tictoccroc.com/island/13/program/688',
    },
    {
      thumbImg: thumbForest3,
      title: '[선유도공원] 여름 숲체험 (주간)',
      meta: '서울 서부',
      price: '35,000원',
      url: 'https://parent.tictoccroc.com/island/13/program/691',
    },
  ],
}

export function getProducts(expedition) {
  return productsByExpedition[expedition] || []
}
