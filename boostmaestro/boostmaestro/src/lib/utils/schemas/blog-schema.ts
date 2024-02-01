import { StoryContent } from '@/app/../../typings';
import { Locale } from '@/app/../../i18n.config'

export function addBlogJsonLd(lang: Locale, story: StoryContent) {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "{$process.env.NEXT_PUBLIC_BASE_URL}/{$lang}/blog/{$story.slug}"
        },
        "headline": "${story.title}",
        "description": "${story.description}",
        "image": [],
        "author": {
          "@type": "Person",
          "url": "
          "name": "Hot Topics Times"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Hot Topics Times",
          "logo": {
            "@type": "ImageObject",
            "url": "{$process.env.NEXT_PUBLIC_BASE_URL}/logo.png"
          }
        },
        "datePublished": "${story.date}",
        "dateModified": "${story.date}"
      }
    `,}
  }