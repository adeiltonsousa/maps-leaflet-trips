import client from 'graphql/client'
import { GET_PAGES } from 'graphql/queries'
import { useRouter } from 'next/dist/client/router'
import PageTemplate from 'templates/About'

export default function AboutPage() {
  const router = useRouter()

  if (router.isFallback) return null

  return <PageTemplate />
}

export async function getStaticPatchs() {
  const { pages } = await client.request(GET_PAGES, { first: 3 })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

// export const getStaticProps = async () => {
//   const { pages } = await client.request(GET_PAGES)

//   console.log(pages)

//   return {
//     props: {}
//   }
// }

// getStaticPaths => Gerar as urls em build time
// getStaticProps => serve para buscar os dados na página (props) - build time - estático
// getServerSideProps => serve para buscar os dados na página (props) - runtime - toda requisição (bundle fica no server)
// getInitialProps => (deprecate) serve para buscar os dados na página (props) - runtime - toda requisição () (bundle tb vem para o client)
