import { Locale } from '@/app/../../i18n.config'
import EditorWrapper from '@/app/[lang]/components/editor/EditorClient'
import EditorStaticHandler from '@/app/[lang]/components/editor/EditorStaticHandler'

export default function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  return (
    <div className='bg-background relative'>
      <div className="relative container mx-auto px-4 pt-48">
        <EditorStaticHandler documentId='home-letter' initialLocale={lang} />
        <EditorWrapper documentId='home-letter' initialLocale={lang} />
      </div>
    </div>
  )
}
