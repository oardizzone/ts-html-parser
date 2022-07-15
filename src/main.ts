import "./style.css";
import typescriptLogo from "./typescript.svg";
import { setupCounter } from "./counter";
import { htmlParser } from "./htmlParser";

const htmlString = `
<div>
  <a href="https://vitejs.dev" target="_blank">
	<img src="/vite.svg" class="logo" alt="Vite logo" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
	<img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
  </a>
  <h1>Vite + TypeScript</h1>
  <div class="card">
	<button id="counter" type="button"></button>
  </div>
  <p class="read-the-docs">
	Click on the Vite and TypeScript logos to learn more
  </p>
</div>
`;

const simpleHtml = `
	<div>
		<h1>
			Hello!
		</h1>
		<p>
			This is a simple html tree
		</p>
		<br />
		<a>
			This is a link with text...
		</a>
		<a>
			<img />
			<p>
				This is a link with an image!
			</p>
		</a>
	</div>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = htmlString;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
console.table(htmlParser(simpleHtml));
