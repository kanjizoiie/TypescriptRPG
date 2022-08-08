import * as React from 'react';
import { Game } from './Game/Game';


const App = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    const game = new Game(ref.current);
  }, [ref])
  return (
    <div ref={ref} />
  )
}

export { App }