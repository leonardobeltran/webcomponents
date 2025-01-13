export class WCCard extends HTMLElement {
    static observedAttributes = ['header-title', 'header-image'];
	
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
	
	this.setHeadTitle(this.getAttribute("header-title"));
    }

	 attributeChangedCallback(name, oldValue, newValue) {
	    if (name === 'header-title' && oldValue !== newValue) {
	      this.setHeadTitle(newValue);
	    }

		 if (name === 'header-image' && oldValue !== newValue) {
	      this.setHeadImage(newValue);
	    }
	  }

	setHeadTitle(titleText){
		if(titleText){
			this.shadowRoot.querySelector("header h1").textContent = titleText;
		}
	}

	setHeadImage(imageSrc){
		if(imageSrc){
			this.shadowRoot.querySelector("header img").src = imageSrc;
		}
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
