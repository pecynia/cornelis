// import { Locale } from '@/app/../../i18n.config'
// import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'

// export default function Home({
//   params: { lang }
// }: {
//   params: { lang: Locale }
// }) {

//   return (
//     <div className='bg-background relative'>
//       <div className="relative container mx-auto px-4">
//         <EditorWrapper documentId='home-letter' initialLocale={lang} />
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import TempWelcome from '@/app/[lang]/components/TempWelcome'


export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { contact, errorMessages } = await getDictionary(lang);

  return (
    <TempWelcome lang={lang} contact={contact} errorMessages={errorMessages} />
  )
}