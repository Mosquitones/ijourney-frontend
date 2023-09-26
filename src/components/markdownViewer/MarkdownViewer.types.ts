import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

export interface MarkdownViewerPropTypes
  extends Omit<ReactMarkdownOptions, 'children'> {
  markdown: string
}
