import './Intro.css'

export default function Intro({ onStart }) {
  return (
    <div className="intro">
      <div className="intro-top">
        <div className="intro-eyebrow">🎈 1분 놀이 성향 테스트</div>
        <h2 className="intro-title">
          우리 아이는
          <br />
          어떤 놀이 악어일까요?
        </h2>
        <p className="intro-sub">
          질문 9개에 답하면
          <br />
          아이에게 딱 맞는 프로그램을 찾아드려요
        </p>
        <div className="intro-silhouettes">
          <div className="sil">🦦</div>
          <div className="sil">🐘</div>
          <div className="sil q">?</div>
          <div className="sil q">?</div>
        </div>
      </div>

      <div className="intro-bottom">
        <button className="btn intro-cta" onClick={onStart}>
          테스트 시작하기
        </button>
        <div className="intro-skip">로그인 없이 바로 할 수 있어요</div>
      </div>
    </div>
  )
}
