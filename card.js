export class WCCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
		this.shadowRoot.querySelector("header h1").textContent = this.getAttribute("head-title");
    }

	getTemplate() {
        const styles = `
        <style>
            
        </style>
        `;

        const template = document.createElement("template");
        template.innerHTML = `
           <article>
			  <header>
			    <h1></h1>
			    <img/>
			  </header>
			  <main>
				<slot name="body"></slot>
			  </main>
			  <footer>
			    <slot name="footer"></slot>
			  </footer>
			</article>
            ${styles}
        `;

        return template;
    }
}
