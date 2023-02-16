import { flapDeep, omit } from '@edsolater/fnkit'
import { createComponent, JSX, JSXElement } from 'solid-js'
import { pipe } from '../../fnkit/dist'
import { PivProps } from './types/piv'
import { parsePivPropsToCoreProps } from './utils/parsePivPropsToCoreProps'
import { handlePluginProps } from './utils/plugin'
import { handleShadowProps } from './utils/shallowProps'

export const Piv = <TagName extends keyof HTMLElementTagNameMap = 'div'>(rawProps: PivProps<TagName>) => {
  const props = pipe(rawProps as Partial<PivProps>, handleShadowProps, handlePluginProps)
  if (!props) return null // just for type, logicly it will never happen

  // handle have return null
  return props.dangerousRenderWrapperNode
    ? handleDangerousWrapperPluginsWithChildren(props)
    : handleNormalPivProps(props)
}

function handleNormalPivProps(
  props: Omit<PivProps<any>, 'plugin' | 'shadowProps' | 'children'> & {
    children?: JSX.Element
  }
) {
  return props.as ? (
    createComponent(props.as, parsePivPropsToCoreProps(props))
  ) : (
    <div {...parsePivPropsToCoreProps(props)} />
  )
}

function handleDangerousWrapperPluginsWithChildren(props: PivProps): JSXElement {
  return flapDeep(props.dangerousRenderWrapperNode).reduce(
    (prevNode, getWrappedNode) => (getWrappedNode ? getWrappedNode(prevNode) : prevNode),
    createComponent(Piv, omit(props, 'dangerousRenderWrapperNode'))
  )
}
