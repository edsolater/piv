import { flapDeep, MayDeepArray, omit } from '@edsolater/fnkit'
import { PivProps } from '../types/piv'
import { mergeProps } from './mergeProps'

export type Plugin<T> = {
  (additionalProps: Partial<T & PivProps>): Plugin<T>
  getProps?: (props: T & PivProps) => Partial<Omit<PivProps, 'plugin' | 'shadowProps'>>
  priority?: number // NOTE -1:  it should be calculated after final prop has determine
}

export function handlePluginProps<P extends Partial<PivProps>>(props: P) {
  if (!props?.plugin) return props
  return omit(parsePluginPropsToProps({ plugin: props.plugin, props }), 'plugin')
}

export function parsePluginPropsToProps<T>(utils: {
  plugin: MayDeepArray<Plugin<T>> | undefined
  props: T & PivProps
}): T & PivProps {
  return utils.plugin
    ? flapDeep(utils.plugin).reduce((acc, abilityPlugin) => mergeProps(acc, abilityPlugin.getProps?.(acc)), utils.props)
    : utils.props
}
