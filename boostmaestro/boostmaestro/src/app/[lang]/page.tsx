import { Locale } from '@/app/../../i18n.config'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'

export default function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  return (
    <div className='bg-background relative'>
      <div className="relative container mx-auto px-4">
        <EditorWrapper documentId='home-letter' initialLocale={lang} />
      </div>
    </div>
  )
}
