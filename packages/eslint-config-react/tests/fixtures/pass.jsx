import React from 'react'
import { render } from 'react-dom'

render(
  (
    <div id="foo" >
      <span className="greeting">Hello, world!</span>
      <button onClick={() => alert('hi!')}>Click Me</button>
    </div>
  ),
  document.getElementById('app')
)
