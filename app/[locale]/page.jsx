import { performRequest } from '@/helpers/dato'
import PageContent from './pageContent'
import { DEMO_QUERY } from '@/helpers/queries/queries'

export default async function Page({ params: { locale } }) {
  const { data } = await performRequest({
    query: DEMO_QUERY,
    variables: { locale: locale },
  })
  // If we want to use the translation.json
  // const {t} = await useTranslation()

  if (!data) return <div>loading...</div>

  return <PageContent data={data} />
}
