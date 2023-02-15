import { createSignal } from 'solid-js'
import { PivProps } from './types/piv'

export function TestButton() {
  const [count, setCount] = createSignal(0)
  return <button onClick={() => setCount((n) => n + 1)}>{count()}</button>
}

export function Piv(props: PivProps<any>) {
  
}
