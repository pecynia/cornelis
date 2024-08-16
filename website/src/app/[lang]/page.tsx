import { Locale } from "@../../../i18n.config"

export default function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div className="container">
      <div className=" text-black p-4 h-screen">
        {lang}
      </div>

    </div>
  )
}
