import theme from '~/config/theme/antdStyled'

const getGrid = (grid) => {
  let breakPoints = {}

  Object.keys(theme.grid.gutters).map((point) => (breakPoints[point] = 0))

  let previous = 1
  for (const item in Object.assign(breakPoints, grid)) {
    breakPoints[item]
      ? (previous = breakPoints[item])
      : (breakPoints[item] = previous)
  }
  return breakPoints
}
export default getGrid
