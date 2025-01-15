export class WCButton extends HTMLButtonElement {
    #originalContent = "";
  
    static get observedAttributes() {
        return ['variant', 'emoji'];
    }

    constructor() {
        super();
        this.#originalContent = this.textContent;
        
        const variant = this.getAttribute('variant') || '';
        const emoji = this.getAttribute('emoji') || '';

        this.innerHTML = `${emoji} ${ this.#originalContent}`.trim(); 
        this.classList.add(variant);
    }
}
