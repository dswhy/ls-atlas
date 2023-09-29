import { Layout } from '@/components/dom/Layout'
import './global.css'
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'
import { performRequest } from '@/helpers/dato'
import { DEMO_QUERY } from '@/helpers/queries/queries'
import { toNextMetadata } from 'react-datocms/seo'
import { setState } from '@/helpers/store'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

function getPageRequest(locale = 'en') {
  return {
    query: DEMO_QUERY,
    variables: { locale: locale },
  }
}

export async function generateMetadata() {
  const { data } = await performRequest(getPageRequest())
  return toNextMetadata([...data.site.favicon, ...data.seo.seo])
}

export default async function RootLayout({ children, params: { locale } }) {
  const { data } = await performRequest(getPageRequest(locale))
  if (data) setState({ data: data })

  return (
    <html lang={locale} dir={dir(locale)} className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
