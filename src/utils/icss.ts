import { filter, flapDeep, isObject, MayArray, mergeObjectsWithConfigs, shrinkToValue } from '@edsolater/fnkit'
import { css, CSSObject } from '@emotion/css'

export type ICSSObject = CSSObject // rename  for ICSSObject may be a superset of CSSObject

export type ICSS = MayArray<ICSSObject | boolean | string | number | null | undefined | (() => ICSSObject)>

export function parseCSS(cssProp: ICSS) {
  const cssObjList = filter(flapDeep(cssProp), isObject)
  if (!cssObjList.length) return ''
  const mergedCSSObj = cssObjList.reduce((acc: CSSObject, cur) => mergeICSSObject(acc, shrinkToValue(cur)), {})
  return css(mergedCSSObj)
}

export function createICSS(...icsses: ICSS[]): ICSS {
  return icsses.length <= 1 ? icsses[0] : icsses.flat()
}

export function mergeICSSObject(...icsses: ICSSObject[]): CSSObject {
  return mergeObjectsWithConfigs(icsses, ({ valueA: v1, valueB: v2 }) => v2 ?? v1)
}
