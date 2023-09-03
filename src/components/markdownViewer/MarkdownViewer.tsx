/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { MarkdownViewerPropTypes } from './MarkdownViewer.types'

export const MarkdownViewer: React.FC<MarkdownViewerPropTypes> = ({
  markdown,
}) => {
  return (
    <ReactMarkdown
      components={{
        li: ({ node, ordered, ...props }) => (
          <li style={{ marginLeft: 16 }} {...props} />
        ),
        code({ node, ...props }) {
          const match = /language-(\w+)/.exec(props.className || '')
          return !props.inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={materialDark}
              language={match[1]}
              PreTag='div'
            >
              {String(props.children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={props.className}>
              {props.children}
            </code>
          )
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {markdown}
    </ReactMarkdown>
  )
}
