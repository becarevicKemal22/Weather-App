import './style.css';
import {Test} from './components/test/test';

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = "Hello webpack";
    element.classList.add('hello');
  
    return element;
  }
  
  document.body.appendChild(component());

  const comp = new Test();
  console.log(comp);
  document.body.appendChild(comp.getElement());