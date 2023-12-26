import { useRef, useState } from 'react'
import O from './components/O'
import Re from './components/Re'
import { Howl } from 'howler'
import htmlToCanvas from 'html2canvas'

enum Material {
  O,
  Re
}

const oSound = new Howl({ src: ['/o.mp3'] })
const reSound = new Howl({ src: ['/re.mp3'] })

function App() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [showModal, setShowModal] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const [audio, setAudio] = useState<Howl[] | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const createImage = async () => {
    if (resultRef.current) {
      const canvas = await htmlToCanvas(
        resultRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
      })
      setImageUrl(canvas.toDataURL('image/png'))
    }
  }

  return (
    <div className="p-2">
      <main className='max-w-screen-md mx-auto'>
        <section className='bg-white p-6 rounded-2xl mb-2'>
          <h1 className='text-4xl font-bold mb-6'>我想要一个</h1>
          <div className="grid grid-cols-2 gap-2">
            <button
              className='bg-[#484548] text-white rounded-lg py-12'
              onClick={() => {
                setMaterials([...materials, Material.O])
                oSound.play()
              }}
            >
              <p className='text-4xl font-bold'>奥</p>
              <p>O</p>
            </button>
            <button
              className='bg-[#484548] text-white rounded-lg py-12'
              onClick={() => {
                setMaterials([...materials, Material.Re])
                reSound.play()
              }}
            >
              <p className='text-4xl font-bold'>利</p>
              <p>RE</p>
            </button>
            <button
              className='col-span-2 bg-[#f66] text-white text-4xl font-bold rounded-lg py-4'
              onClick={() => setMaterials([])}
            >
              清除
            </button>
          </div>
        </section>
        <section className='col-span-2 bg-white p-6 rounded-2xl mb-[4.5rem]'>
          <h1 className='text-4xl font-bold'>
            这是你的
            {materials.map(material => material === Material.O ? '奥' : '利').join('') === '利利'
              ? '丽丽'
              : materials.map(material => material === Material.O ? '奥' : '利').join('') === '利奥'.repeat(6) ? '花京院'
                : materials.map(material => material === Material.O ? '奥' : '利').join('')}
          </h1>
          <div ref={resultRef}>
            {materials.map(material => material === Material.O ? '奥' : '利').join('') === '利利'
              ? <img src="/rere.png" alt="" className='w-full rounded-lg mt-6' />
              : materials.map(material => material === Material.O ? '奥' : '利').join('') === '利奥'.repeat(6) ? <img src="/reoreoreoreoreoreo.png" alt="" className='w-full rounded-lg mt-6' />
                : (
                  <ul
                    className='flex flex-col-reverse'
                    style={{
                      height: '100%',
                      ...(materials.length && {
                        paddingTop: 'calc(1.5rem + 50%)',
                      })
                    }}>
                    {materials.map((material, i) => {
                      return material === Material.O
                        ? (
                          <li
                            key={i}
                            style={{
                              marginTop: '-49%',
                              zIndex: i,
                              position: 'relative',
                            }}>
                            <O />
                          </li>
                        ) : (
                          <li
                            key={i}
                            style={{
                              marginTop: '-49%',
                              zIndex: i,
                              position: 'relative',
                            }}>
                            <Re />
                          </li>
                        )
                    })}
                  </ul>
                )}
          </div>
        </section>
        <div className="fixed p-2 bottom-0 left-0 w-screen z-[2147483647]">
          <button
            className='bg-[#005cc5] text-white text-xl font-bold rounded-full py-4 w-full'
            onClick={() => {
              if (materials.length) {
                createImage()
                // 根据materials生成语音，根据Howler的onend回调再播放下一段音频，用o和re音效拼接
                const audio = materials
                  .map(material => material === Material.O ? '奥' : '利').join('') === '利奥'.repeat(6)
                  ? [new Howl({
                    src: ['/reo.mp3']
                  })]
                  : [
                    new Howl({ src: ['/this-is-ur.mp3'] }),
                    ...materials.map(material => material === Material.O
                      ? new Howl({ src: ['/o.mp3'] })
                      : new Howl({ src: ['/re.mp3'] }))
                  ]
                audio.forEach((sound, i) => {
                  sound.on('end', () => {
                    if (i + 1 < audio.length) {
                      audio[i + 1].play()
                    }
                  })
                })

                audio[0].play()
                setAudio(audio)
                setShowModal(true)
              }
            }}
          >
            保存图片
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-[2147483647]">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-6 flex justify-center items-center">
              <div className="bg-white rounded-2xl p-6 h-fit relative">
                <h1 className='text-4xl font-bold mb-6'>保存图片</h1>
                <button
                  className='p-2 absolute top-6 right-6'
                  onClick={() => setShowModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#303030" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                </button>
                <div className='p-4 border border-gray-200 rounded-2xl max-h-96 overflow-y-auto'>
                  {imageUrl ? (
                    <img src={imageUrl} alt="" />
                  ) : (
                    <p>请稍等，加载中...</p>
                  )}
                </div>
                <p className='my-4 text-center text-sm text-gray-600'>长按图片保存到相册</p>
                <button
                  className='bg-[#484548] text-white text-xl font-bold rounded-full py-4 w-full'
                  onClick={() => {
                    setShowModal(false)
                    if (audio) {
                      audio.forEach(sound => sound.stop())
                    }
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </main >
    </div >
  )
}

export default App
