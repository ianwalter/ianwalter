import { h, render } from 'preact'

render(
  (
    <div id="foo" >
      <span className="greeting">Hello, world!</span>
      <button onClick={() => alert('hi!')}>Click Me</button>
    </div>
  ),
  document.getElementById('app')
)
