function fromPairsReducer(obj, [key, value]) {
  obj[key] = value
  return obj
}

export function parseQuery(fullUrl) {
  let query = fullUrl.split('?')[1]

  if (!query) {
    return {}
  }

  return query
    .split('&')
    .filter(q => q.trim().length > 0)
    .map(q => q.split('=', 2))
    .map(([key, value]) => [key, decodeURIComponent(value)])
    .reduce(fromPairsReducer, {})
}

export default function matchRoutePattern(pattern, fullUrl) {
  let url = fullUrl.split('?')[0]

  let names = []
  let regex = pattern
    .replace(/:([^/]+)/g, name => {
      names.push(name.replace(/^:/, ''))
      return '([^/]+)'
    })
    .replace(/\//g, '\\/')

  const r = new RegExp(`^${regex}$`)

  if (!r.test(url)) {
    return null
  }

  const query = parseQuery(fullUrl)

  const params = r.exec(url)
    .slice(1)
    .map((value, index) => [names[index], value])
    .reduce(fromPairsReducer, {})

  return {...query, ...params}
}
