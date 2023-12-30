// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

const json = {
  type: 'div',
  props: { id: 'hello', class: 'foo' },
  children: [
    { type: 'h1', children: 'HELLO' },
    {
      type: 'p',
      children: [{ type: 'span', props: { class: 'bar' }, children: 'World' }],
    },
  ],
};

function generateDOM(element, json) {
  function traverse(json) {
    if (Array.isArray(json)) {
      for (let item of json) {
        const { type, props, children } = item;

        /*create fragment so that it dont rerender DOM */
        let parentElem = document.createElement(type);

        /*if props present */
        if (props) {
          for (let [prop, text] of Object.entries(props)) {
            parentElem.setAttribute(prop, text);
          }
        }

        if (Array.isArray(children)) {
          /* create fragment again to reduce no. of rerenders */
          //let fragment = document.createDocumentFragment();

          for (let node of children) {
            // fragment.appendChild(traverse(node));
            parentElem.appendChild(traverse(node));
          }

          //parentElem.appendChild(fragment);
        } else {
          parentElem.innerText = children; //children can be string, text
        }

        return parentElem;
      }
    } else {
      return traverse([json]); // if not array recursively call the same function pass the entry as an array.
    }
  }

  const generatedDom = traverse(json);
  element.appendChild(generatedDom);
}

generateDOM(appDiv, json);

//NOTE: JSON can be array or object

/*
Output: <div id="hello" class="foo">
  <h1>HELLO</h1>
  <p>
    <span class="bar">World</span>
  </p>
</div>;

*/
