import { performRequest } from '@/helpers/dato'
import PageContent from './pageContent'
import { useTranslation } from '@/i18n'

export default async function Page({ params: { locale } }) {
  // const { data } = await performRequest({
  //   query: YOUR_QUERY,
  //   variables: { locale: locale },
  // })

  // If we want to use the translation.json
  // const {t} = await useTranslation()

  // if (!data) return <div>loading...</div>

  return <PageContent />
}
