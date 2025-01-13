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
         :host {
	  display: block;
	  font-family: 'Roboto', Arial, sans-serif;
	  border-radius: 8px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06);
	  overflow: hidden;
	  background-color: #ffffff;
	  color: #333333;
	  transition: box-shadow 0.3s ease;
	}
	
	:host(:hover) {
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 6px 12px rgba(0, 0, 0, 0.08);
	}
	
	article {
	  display: flex;
	  flex-direction: column;

   		header {
	  padding: 16px;
	  background-color: #f5f5f5;
	  border-bottom: 1px solid #e0e0e0;
	  display: flex;
	  align-items: center;
	  gap: 16px;

   h1 {
	  font-size: 20px;
	  font-weight: 500;
	  margin: 0;
	  color: #212121;
	  flex-grow: 1;
	}
 img {
	  width: 48px;
	  height: 48px;
	  border-radius: 50%;
	  object-fit: cover;
	  border: 2px solid #e0e0e0;
	}
	}

 main {
	  padding: 16px;
	  font-size: 16px;
	  line-height: 1.5;
	  color: #424242;
	}
	
	footer {
	  padding: 16px;
	  background-color: #f9f9f9;
	  border-top: 1px solid #e0e0e0;
	  display: flex;
	  justify-content: flex-end;
	  gap: 8px;

   		&::slotted(button) {
	  padding: 8px 16px;
	  font-size: 14px;
	  border: none;
	  border-radius: 4px;
	  cursor: pointer;
	  transition: background-color 0.3s ease;
	}
	}
	}
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
