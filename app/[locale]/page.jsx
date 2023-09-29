import { performRequest } from '@/helpers/dato'
import PageContent from './pageContent'
import { DEMO_QUERY } from '@/helpers/queries/queries'

function getPageRequest(locale = 'en') {
  return {
    query: DEMO_QUERY,
    variables: { locale: locale },
  }
}

export default async function Page({ params: { locale }, ...props }) {
  const { data } = await performRequest(getPageRequest(locale))
  // If we want to use the translation.json
  // const {t} = await useTranslation()

  if (!data) return <div>loading...</div>

  return <PageContent data={data} />
}
