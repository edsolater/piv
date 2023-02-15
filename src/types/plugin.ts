import { MayArray } from '@edsolater/fnkit'
import { JSXElement } from 'solid-js'
import { PivProps } from './piv'

export type WithPlugins<TagName extends keyof HTMLElementTagNameMap = 'div'> = {
  plugin?: MayArray<Plugin<any>>
}

export type WrapperNodeFn = (node: JSXElement) => JSXElement // change outter wrapper element

export type PluginCreateFn<T> = (props: T) => Partial<Omit<PivProps, 'plugin' | 'shadowProps'>>

export type Plugin<T> = {
  (additionalProps: Partial<T & PivProps>): Plugin<T>
  getProps?: (props: T & PivProps) => Partial<Omit<PivProps, 'plugin' | 'shadowProps'>>
  priority?: number // NOTE -1:  it should be calculated after final prop has determine
}
