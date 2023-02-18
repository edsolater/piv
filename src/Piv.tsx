import { flapDeep, omit, pipe } from '@edsolater/fnkit'
import { createComponent, JSX, JSXElement } from 'solid-js'
import { PivProps } from './types/piv'
import { parsePivPropsToCoreProps } from './utils/prop-builders/parsePivPropsToCoreProps'
import { handlePluginProps } from './utils/prop-handlers/plugin'
import { handleShadowProps } from './utils/prop-handlers/shallowProps'

export const Piv = <TagName extends keyof HTMLElementTagNameMap = 'div'>(props: PivProps<TagName>) => {
  // const props = pipe(rawProps as Partial<PivProps>, handleShadowProps, handlePluginProps)
  // if (!props) return null // just for type, logicly it will never happen

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

function handleDangerousWrapperPluginsWithChildren(props: PivProps<any>): JSXElement {
  return flapDeep(props.dangerousRenderWrapperNode).reduce(
    (prevNode, getWrappedNode) => (getWrappedNode ? getWrappedNode(prevNode) : prevNode),
    createComponent(props.as ?? Piv, omit(props, 'dangerousRenderWrapperNode'))
  )
}
