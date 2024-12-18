import { Category } from '@/types'

export const buildQueryString = (params: any, prefix = '') => {
  const queryParts: string[] = []

  Object.keys(params).forEach((key) => {
    const fullKey = prefix ? `${prefix}[${key}]` : key
    const value = params[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      queryParts.push(buildQueryString(value, fullKey))
    } else {
      const encodedKey = fullKey
      const encodedValue = value
      if (Array.isArray(encodedValue)) {
        encodedValue.map((item) => queryParts.push(`${encodedKey}=${item}`))
      } else {
        queryParts.push(`${encodedKey}=${encodedValue}`)
      }
    }
  })
  return queryParts.join('&')
}

export const formattedCategory = (category: Category | null) => {
  if (!category) return []

  const result = Object.entries(category).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([secondKey, secondValue]) => {
          if (typeof secondValue === 'object') {
            Object.entries(secondValue).forEach(([thirdKey, thirdValue]) => {
              acc[`${secondKey} ∙ ${thirdKey}`] = thirdValue
            })
          }
        })
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return result
}
