type TimeToMillisecondsParamTypes = {
  hours?: number
  minutes?: number
  seconds?: number
}

export const timeToMilliseconds = (time: TimeToMillisecondsParamTypes) => {
  const { hours = 0, minutes = 0, seconds = 0 } = time

  const minutesToSeconds = minutes * 60
  const hoursToSeconds = hours * 60 * 60

  const totalSeconds = hoursToSeconds + minutesToSeconds + seconds
  const totalMilliseconds = totalSeconds * 1000

  return totalMilliseconds
}
