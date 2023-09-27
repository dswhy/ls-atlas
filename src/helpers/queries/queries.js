import { gql } from 'graphql-request'

export const DEMO_QUERY = gql`
  query DemoQuery($locale: SiteLocale) {
    testModule(locale: $locale) {
      headline
    }
  }
`
