import * as React from 'react';
import { Engine } from './Game/Engine';


const App = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    const game = new Engine(ref.current);
  }, [ref])
  return (
    <div ref={ref} />
  )
}

export { App }