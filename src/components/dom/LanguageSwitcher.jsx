const { default: Link } = require('next/link')
const { Trans } = require('react-i18next')

const LanguageSwitcher = ({ locale, ...props }) => {
  const { t } = useTranslation(locale)
  const path = usePathname().slice(4)

  return (
    <div {...props}>
      <Trans i18nKey='languageSwitcher' t={t}>
        <p className='font-bold'>{locale}</p>
        <p>|</p>
      </Trans>
      {languages
        .filter((l) => locale !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' or '}
              <Link href={`/${l}/${path}`}>{l}</Link>
            </span>
          )
        })}
    </div>
  )
}
