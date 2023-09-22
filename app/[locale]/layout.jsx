import { Layout } from '@/components/dom/Layout'
import './global.css'
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'

export const metadata = {
  title: 'Next.js + Three.js + DatoCMS + i18n',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs with DatoCMS and i18n support.',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params: { locale } }) {
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
