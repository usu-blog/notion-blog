import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import sharedStyles from '../styles/shared.module.css'

const Index = () => (
  <>
    <Header titlePre="Home" />
    <div className=" container md:max-w-screen-md mx-auto px-2">
      <h1 className=" text-center">UsuCode</h1>
      <div>
        <p>休日フリーランスを行っているフロントエンジニアのアキヤマです。</p>
        <p>
          最近HHKBポチり、2021年はもっと副業にも力を入れていこうと考えております。
        </p>
        <p>本業・副業どちらもWEBサイト制作をメインに活動しています。</p>
        <p>よろしくお願いいたします。</p>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/blog">
          <button className="bg-blue-500 py-2 px-4 text-xs rounded text-white hover:bg-opacity-70 transition shadow-lg">
            ブログはこちら
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Index
