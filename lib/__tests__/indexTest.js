jest.dontMock('../index')

describe('matchRoutePattern', () => {
  const matchRoutePattern = require('../index').default

  it('should match pattern', () => {
    expect(matchRoutePattern('/:controller/:action', '/pages/show')).toEqual({controller: 'pages', action: 'show'})
  })
  it('should match pattern with 1 query parameter', () => {
    expect(matchRoutePattern('/:controller/:action', '/pages/show?id=1'))
      .toEqual({controller: 'pages', action: 'show', id: '1'})
  })
  it('should prefer route parameter than query parameter', () => {
    expect(matchRoutePattern('/:controller/:action', '/pages/show?action=1'))
      .toEqual({controller: 'pages', action: 'show'})
  })
  it(`should return null if the route doesn't match the pattern`, () => {
    expect(matchRoutePattern('/:controller/:action', '/')).toBe(null)
  })
})
