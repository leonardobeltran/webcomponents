export class WCCard extends HTMLElement {
  // definir las propiedades que se quieren observar
  static propertiesAttributes = {
    headerTitle: 'header-title',
    headerImage: 'header-image',
  };

  constructor() {
    super();
    // obtener la plantilla y agregarla al shadow dom
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));

    //inicizalizar con los atributos que tiene el elemento al definirse
    if(this.hasAttribute("header-title")){	  
    	this.setHeadTitle(this.getAttribute("header-title"));
    }
    if(this.hasAttribute("header-image")){	  
    	this.setHeadImage(this.getAttribute("header-image"));
    }
    
    // crear getters y setters dinamicamente
    for (const [property, attribute] of Object.entries(WCCard.propertiesAttributes)) {
      Object.defineProperty(this, property, {
        get() {
          return this.getAttribute(attribute);
        },
        set(value) {
          this.setAttribute(attribute, value);
        },
      });
    }
  }
  
  //esta propiedad debe ser estatica y con ese nombre para que sea valida la definicion
  static get observedAttributes() {
    return Object.values(WCCard.propertiesAttributes);
  }
  
  //calllback que se ejecuta cuando cambia el valor de los atributos
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "header-title" && oldValue !== newValue) {
      this.setHeadTitle(newValue);
    }

    if (name === "header-image" && oldValue !== newValue) {
      this.setHeadImage(newValue);
    }
  }

  // funciones utilitarias
  setHeadTitle(titleText) {
      this.shadowRoot.querySelector("header h1").textContent = titleText;
  }

  setHeadImage(imageSrc) {
    if (imageSrc) {
      this.shadowRoot.querySelector("header img").src = imageSrc;
    }
  }

  getTemplate() {
    const styles = `
        <style>
        /* el :host es el contenedor del componente, soporta sintaxis anidada */
        :host {
          font-family: Roboto, Arial, sans-serif;
          border-radius: 8px;
          padding: 1em;
          box-sizing: border-box;
          box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 6%);
          background-color: #fff;
          color: #333;
          display: flex;
	  flex-direction: column;
          
          header{
            display: flex;
            flex-direction: column;
            gap: 1em;
            
            h1 {
              font-size: 1.3em;
              font-weight: 500;
              margin: 0;
              color: var(--title-color, #212121);
            }
            
            img {
              border: 2px solid #e0e0e0;
              
              &:not([src]){
                visibility: hidden;
                display: none;
              }
            }
          }
          
          main {
            font-size: 1em;
            line-height: 1.5em;
            color: #424242;
          }
          
          footer {
            background-color: #f9f9f9;
            border-top: 1px solid #e0e0e0;
            display: flex;
            justify-content: flex-end;
            gap: 0.5em;
         }
        }
        
        /* ejemplo del pseudo selector slotted (no se puede anidar) */
        ::slotted(button){
          background-color: #007bff;
            color: #fff;
            border: none;
            padding: 0.5em 1em;
            margin-block: 1em;
            border-radius: 4px;
            cursor: pointer;
        }
        </style>
        `;

    const template = document.createElement("template");
    template.innerHTML = `
           <article>
		  <header>
    		    <!-- con el atributo part se pueden exteriorizar partes del shadow -->
		    <h1 part="header-title"></h1>
		    <img loading="lazy"/>
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
