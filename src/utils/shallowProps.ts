import { flapDeep } from '@edsolater/fnkit'
import { PivProps } from '../types/piv'
import { mergeProps } from './mergeProps'

export function handleShadowProps<P extends Partial<PivProps<any>>>(props: P): Omit<P, 'shadowProps'> {
  if (!props?.shadowProps) return props
  return mergeProps({ ...props, shadowProps: undefined }, ...flapDeep(props.shadowProps)) as Omit<P, 'shadowProps'>
}
