import { Button } from '@dotss/ui'
import { types } from '../data/types'
import './Intro.css'

export default function Intro({ onStart }) {
  return (
    <div className='intro'>
      <div className='intro-top'>
        <div className='intro-eyebrow'>🍃 1분이면 끝! 놀이 원정대 찾기</div>
        <h2 className='intro-title'>
          우리 아이는
          <br />
          어떤 원정대 대원일까요?
        </h2>
        <p className='intro-sub'>
          8가지 놀이 성향으로 알아보는
          <br />
          우리 아이 이야기
        </p>
        {/* <div className='intro-silhouettes'>
          <div className='sil'>
            <img src={types.AXF.image} alt='' />
          </div>
          <div className='sil'>
            <img className='sil-sm' src={types.AYF.image} alt='' />
          </div>
          <div className='sil q'>?</div>
          <div className='sil q'>?</div>
        </div> */}
      </div>

      {/* 언덕 아래에 흩뿌린 캐릭터들 (장식용) */}
      <div className='intro-chars' aria-hidden='true'>
        <img
          src={types.AXF.image}
          alt=''
          style={{ left: '7%', bottom: '24%', width: '74px' }}
        />
        <img
          src={types.AXP.image}
          alt=''
          style={{ left: '30%', bottom: '23%', width: '80px' }}
        />
        <img
          src={types.AYF.image}
          alt=''
          style={{ left: '50%', bottom: '30%', width: '73px' }}
        />
        <img
          src={types.AYP.image}
          alt=''
          style={{ right: '5%', bottom: '25%', width: '76px' }}
        />
        <img
          src={types.BYF.image}
          alt=''
          style={{ left: '18%', bottom: '17%', width: '62px' }}
        />
        <img
          src={types.BYP.image}
          alt=''
          style={{ right: '22%', bottom: '18%', width: '66px' }}
        />
        <img
          src={types.BXF.image}
          alt=''
          style={{ left: '43%', bottom: '16%', width: '70px' }}
        />
        <img
          src={types.BXP.image}
          alt=''
          style={{ right: '7%', bottom: '14%', width: '78px' }}
        />
      </div>

      <div className='intro-bottom'>
        <Button
          variant='filled'
          color='primary'
          size='xLarge'
          rounded
          fullWidth
          onClick={onStart}
          inlineCSS={{
            backgroundColor: '#F7CA45',
            color: '#3D2A0A',
            boxShadow: '0 8px 20px rgba(138, 100, 0, 0.3)',
            '&:hover': { backgroundColor: '#6B4A1F', color: '#FDFAEB' },
            '&:active': { backgroundColor: '#563A17', color: '#FDFAEB' },
          }}
        >
          우리 아이 원정대 찾으러 가기 →
        </Button>
        <div className='intro-skip'>로그인 없이 바로 할 수 있어요</div>
      </div>
    </div>
  )
}
