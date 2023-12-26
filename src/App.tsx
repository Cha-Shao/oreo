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
        {!!materials.length && (
          <section className='col-span-2 bg-white p-6 rounded-2xl mb-2'>
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
                      className='flex flex-col-reverse h-full pt-[calc(1.5rem+50%)]'
                    >
                      {materials.map((material, i) => {
                        return material === Material.O ? (
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
        )}
        <footer className='mb-[4.5rem] text-center text-sm text-gray-500'>
          <p>本作品仅供娱乐，不作他用</p>
          <a href="https://github.com/Cha-Shao/oreo" className='flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6a7280" viewBox="0 0 256 256"><path d="M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z"></path></svg>
            Source code
          </a>
          <a href="https://oreo.ddiu.io/">灵感：ddiu</a>
        </footer>
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
