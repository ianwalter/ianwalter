import { h, render } from "preact"

render(
  (
  <div id="foo" >
      <span class="greeting">Hello, world!</span>
      <button onClick={e =>  {
        const target = e.target
        alert('hi!');
      }}>Click Me</button>
    </div>
  ),
  document.getElementById('app')
)
