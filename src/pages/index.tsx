import Head from 'next/head'

type Props = {
  title: string
}

const a = ''

export default function Home({ title = 'React Avançado' }: Props) {
  return (
    <div>
      <Head>
        <title style={{ color: '#87777' }}>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Testeee</p>
    </div>
  )
}
