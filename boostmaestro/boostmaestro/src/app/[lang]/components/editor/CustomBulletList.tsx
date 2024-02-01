import BulletList from '@tiptap/extension-bullet-list'
import { mergeAttributes } from '@tiptap/react'
import Check from '@/../public/check.svg'

const CustomBulletList = BulletList.extend({
  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes({ class: 'special-icon-list', style: '--img-url: url(' + Check.src + ')' }, HTMLAttributes), 0]
  }
})

export default CustomBulletList
