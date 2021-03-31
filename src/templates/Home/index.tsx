import { NextSeo } from 'next-seo'

import dynamic from 'next/dynamic'
import { InfoOutline } from '@styled-icons/evaicons-outline'

import LinkWrapper from 'components/LinkWrapper'
import { MapProps } from 'components/Map'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function HomeTemplate({ places }: MapProps) {
  return (
    <>
      <NextSeo
        title="App Leaflet"
        description="App com informações sobre Viagens usando Leaflet"
        canonical="https://www.adeilton.leaflet.vercell.com"
        openGraph={{
          url: 'https://my-trips.willianjusten.com.br',
          title: 'App Leaflet',
          description: 'App com informações sobre Viagen usando Leaflet',
          images: [
            {
              url:
                'https://kinsta.com/pt/wp-content/uploads/sites/3/2019/02/wordpress-google-maps-1024x512.png',
              width: 1024,
              height: 512,
              alt: 'App Leaflet'
            }
          ],
          site_name: 'App Leaflet'
        }}
      />
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
