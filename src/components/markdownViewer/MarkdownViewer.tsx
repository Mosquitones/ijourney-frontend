/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Link, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { MarkdownViewerPropTypes } from './MarkdownViewer.types'

const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}

export const MarkdownViewer: React.FC<MarkdownViewerPropTypes> = ({
  markdown,
  ...rest
}) => {
  return (
    <ReactMarkdown
      {...rest}
      components={{
        h1: ({ node, ...props }) => (
          <Typography
            variant='h1'
            fontWeight={({ typography }) => typography.fontWeightBold}
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <Typography
            variant='h2'
            fontWeight={({ typography }) => typography.fontWeightBold}
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <Typography
            variant='h3'
            fontWeight={({ typography }) => typography.fontWeightBold}
            {...props}
          />
        ),
        h4: ({ node, ...props }) => (
          <Typography
            variant='h4'
            fontWeight={({ typography }) => typography.fontWeightBold}
            {...props}
          />
        ),
        h5: ({ node, ...props }) => (
          <Typography
            variant='h5'
            fontWeight={({ typography }) => typography.fontWeightBold}
            {...props}
          />
        ),
        h6: ({ node, ...props }) => (
          <Typography
            variant='h6'
            fontWeight={({ typography }) => typography.fontWeightBold}
            {...props}
          />
        ),
        p: ({ node, ...props }) => <Typography variant='body1' {...props} />,
        ul: ({ node, ...props }) => (
          <ul style={{ marginLeft: 16 }} {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol style={{ marginLeft: 16 }} {...props} />
        ),
        li: ({ node, ordered, ...props }) => (
          <li style={{ marginLeft: 16 }} {...props} />
        ),
        a: ({ node, ...props }) => {
          const isUrlValid = props.href ? isValidUrl(props.href) : false
          return (
            <Link
              {...props}
              href={isUrlValid ? props.href : undefined}
              target='_blank'
              sx={{
                ...(!isUrlValid && {
                  color: ({ palette }) => palette.grey[500],
                  cursor: 'not-allowed',
                  opacity: 0.5,
                  textDecoration: 'none',
                }),
              }}
              rel='noopener noreferrer'
            >
              {props.children || props.href}
            </Link>
          )
        },

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
