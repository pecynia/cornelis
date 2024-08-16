import { Locale } from "@../../../i18n.config"
import ClientHeaderButtonWrapper from "@/app/components/admin/ClientHeaderButton"
import { HeaderClient } from "@/app/components/HeaderClient"

export default async function Header({lang}: {lang: Locale}) {
    return (
        <HeaderClient>
            <ClientHeaderButtonWrapper lang={lang} />
        </HeaderClient>
    )
}