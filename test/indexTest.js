import matchRoutePattern from '../lib'

describe('matchRoutePattern', () => {
  it('should match pattern', () => {
    assert.deepEqual(
      matchRoutePattern('/:controller/:action', '/pages/show'),
      {controller: 'pages', action: 'show'}
    )
  })

  it('should match pattern with 1 query parameter', () => {
    assert.deepEqual(
      matchRoutePattern('/:controller/:action', '/pages/show?id=1'),
      {controller: 'pages', action: 'show', id: '1'}
    )
  })

  it('should prefer route parameter than query parameter', () => {
    assert.deepEqual(
      matchRoutePattern('/:controller/:action', '/pages/show?action=1'),
      {controller: 'pages', action: 'show'}
    )
  })

  it(`should return null if the route doesn't match the pattern`, () => {
    assert.equal(
      matchRoutePattern('/:controller/:action', '/'),
      null
    )
  })
})
