export class WCButton extends HTMLButtonElement {
    #originalContent = "";
    #beforeWaiting = "";
  
    static get observedAttributes() {
        return ['variant', 'emoji', 'waiting'];
    }

    constructor() {
        super();
        this.#originalContent = this.textContent;
        
        let emoji = this.getAttribute('emoji');
        if(emoji.length > 0){
          this.addEmoji(emoji); 
        }
      
        let variant = this.getAttribute('variant');
        if(variant.length > 0){
          this.setVariant(variant); 
        }
    }
  
    addEmoji(emoji){
      if(emoji.length > 0){
        emoji = `${emoji} `;
      }
      this.innerHTML = `${emoji}${ this.#originalContent}`.trim(); 
    }
  
    setVariant(variant){
        while (this.classList.length > 0) {
            this.classList.remove(this.classList.item(0));
        }
        this.classList.add(variant);  
    }
  
    setWaiting(isWaiting){
      if(isWaiting){
        this.#beforeWaiting =  this.innerHTML;
        
        this.innerHTML = `${ this.#beforeWaiting }...`; 
        this.setAttribute("disabled", "");
      }else{
        if(this.#beforeWaiting.length > 0){
          this.innerHTML = `${ this.#beforeWaiting }`;  
        }else{
          this.innerHTML = `${ this.#originalContent }`;  
        }
        this.removeAttribute("disabled");
      }
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "variant" && oldValue !== newValue) {
        this.setVariant(newValue);
      }

      if (name === "emoji" && oldValue !== newValue) {
        this.addEmoji(newValue);
      }
      
      if (name === "waiting" && oldValue !== newValue) {
        this.setWaiting(newValue);
      }
    }
}
