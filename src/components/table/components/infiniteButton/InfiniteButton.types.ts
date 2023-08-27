import { InfiniteQueryObserverBaseResult } from 'react-query'

export interface InfiniteButtonPropTypes
  extends Pick<
    InfiniteQueryObserverBaseResult,
    'isFetchingNextPage' | 'hasNextPage' | 'fetchNextPage'
  > {
  progressType?: 'linear' | 'circular'
}
