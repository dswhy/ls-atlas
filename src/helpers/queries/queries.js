import { gql } from 'graphql-request'

export const DEMO_QUERY = gql`
  query DemoQuery($locale: SiteLocale) {
    testModule(locale: $locale) {
      headline
    }
    site: _site {
      favicon: faviconMetaTags {
        attributes
        content
        tag
      }
      locales
    }
    seo {
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`
