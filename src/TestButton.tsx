import { createSignal } from 'solid-js'

export function TestButton() {
  const [count, setCount] = createSignal(0)
  return <button onClick={() => setCount((n) => n + 1)}>{count()}</button>
}
