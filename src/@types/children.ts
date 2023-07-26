/* eslint-disable @typescript-eslint/ban-types */
import { ReactNode, FC, VFC } from 'react'

type PropsWithChildren<P = {}> = P & {
  children?: ReactNode
}

export type FCWithChildren<P = {}> = FC<PropsWithChildren<P>>

export type FCWithoutChildren<P = {}> = VFC<P>
