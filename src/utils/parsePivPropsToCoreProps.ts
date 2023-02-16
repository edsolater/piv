import { flapDeep, merge, shakeFalsy, shakeNil } from '@edsolater/fnkit'
import { JSX } from 'solid-js/jsx-runtime'
import { PivProps } from '../types/piv'
import { classname } from './classname'
import { parseCSSToString } from './icss'
import { mergeRefs } from './mergeProps'

export function parsePivPropsToCoreProps(
  pivProps: Omit<PivProps<any>, 'plugin' | 'shadowProps' | 'children'> & {
    children?: JSX.Element
  }
) {
  return {
    ...(pivProps.htmlProps && Object.assign({}, ...shakeNil(flapDeep(pivProps.htmlProps)))),
    class:
      shakeFalsy([classname(pivProps.class), parseCSSToString(pivProps.icss)]).join(' ') ||
      undefined /* don't render if empty string */,
    ref: (el) => el && mergeRefs(...flapDeep(pivProps.ref))(el),
    style: pivProps.style ? merge(...shakeNil(flapDeep(pivProps.style))) : undefined,
    onClick: pivProps.onClick ? (ev) => pivProps.onClick?.({ ev, el: ev.currentTarget }) : undefined,
    children: pivProps.children
  }
}
