import { GetStaticProps } from 'next'
import client from 'graphql/client'
import { GET_PAGES, GET_PAGE_SLUG } from 'graphql/queries'
import { useRouter } from 'next/dist/client/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  // retorna um loading, qq coisa enquanto tá sendo criado
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

export async function getStaticPaths() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }

  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}

// getStaticPaths => Gerar as urls em build time
// getStaticProps => serve para buscar os dados na página (props) - build time - estático
// getServerSideProps => serve para buscar os dados na página (props) - runtime - toda requisição (bundle fica no server)
// getInitialProps => (deprecate) serve para buscar os dados na página (props) - runtime - toda requisição () (bundle tb vem para o client)