class Accordion extends HTMLElement {
  constructor(label, content){
    //console.log('New Accordian')
    super()
    this.label = label;
    this.content = content;
    this.bttnclassName;
    this.contentclassName;
    this.count = 0;
    this.button = document.createElement('button')
    this.margin = 0;
    this.content = document.createElement('div')
    this.contWidth = 0
    this.contHeight = 0
    this.bttnWidth = 0
    this.bttnHeight = 0
    //this.content.style.position = 'relative'
    //this.style.paddingBottom
    //this.content.style.paddingBottom = 50 + 'px'
    this.content.innerHTML = content
    this.trans = false;
    this.time = 0;
    //console.log()
    this.addEventListener('click',()=>{
     
      this.expand(this.button)
     

    })
}

    SetButtonWH(w, h){
      this.bttnWidth = w
      this.bttnHeight = h
      //let wb = w + 10
      //console.log(wb)
      this.button.style.width = (w) + 'px'
      this.button.style.height = (h) + 'px'
     
      

      //this.content.style.transform = "translateY(-10px)";

      this.innerHTML = this.button.outerHTML + this.content.outerHTML
    }
    SetContentWH(w, h){
      this.contWidth = w
      this.contHeight = h
      //this.style.width = w + 'px'
      //this.style.height = h + 'px'
      //let wc = w + 10
      this.content.style.width = (w) + 'px'
      this.content.style.height = (h) + 'px'

      //this.content.style.transform = "translateY(-10px)";

      this.innerHTML = this.button.outerHTML + this.content.outerHTML
    }
    
    connectedCallback() {
      this.button.innerHTML = this.label
      //this.button.style.paddingBottom = '0'
      this.content.style.opacity = '0'
      this.content.style.paddingBottom = '0'
      this.style.paddingBottom = '0'
      this.content.style.display = 'none'
     // console.log(typeof this.firstChild)
      //this.firstChild
      if(typeof this.content.firstChild == 'object'){
        //console.log(this.content.firstChild)
        this.content.firstChild.style.margin = this.margin
        this.content.firstChild.style.paddingBottom = '0'
        
      }
      this.innerHTML = this.button.outerHTML + this.content.outerHTML
      
    }

    SetButtonClassName(name){
      this.button.className = name; 
      this.innerHTML = this.button.outerHTML + this.content.outerHTML
      
    }
    SetContentClassName(name){
      this.content.className = name; 
      this.innerHTML = this.button.outerHTML + this.content.outerHTML
    }
    SetLabel(newLabel){
      this.label = newLabel
      this.button.innerHTML = this.label
     
      this.innerHTML = this.button.outerHTML + this.content.outerHTML
    }
    SetContent(content){

      this.content.innerHTML = content
     
      this.innerHTML = this.button.outerHTML + this.content.outerHTML
    }

    SetContentInnerMargin(mar){
      this.margin = mar
      
      
      //this.button.style.width = (this.bttnWidth + this.margin) + 'px'
      this.content.style.width = (this.contWidth + this.margin) + 'px'
      this.content.style.height = (this.contHeight + this.margin) + 'px'

      this.innerHTML = this.button.outerHTML + this.content.outerHTML
    }

    expand(button){
      
      if(this.count >= 1){
       // console.log(this.count)
        this.count = 0
        this.content.style.opacity = '0'

        if(this.trans == true){
          //this.content.style.opacity = '0'
          
        }

        //this.content.style.position = 'absolute'


        this.content.style.display = 'none'
        this.innerHTML = button.outerHTML + this.content.outerHTML
      }
      else{
        this.content.style.display = 'contents'
        this.content.style.opacity = '1'
        
        if(this.trans == true){
          //this.content.style.opacity = '0'
          
        }
        this.innerHTML = button.outerHTML + this.content.outerHTML
        this.count++
      }
    }
    
    
    SetTransitions(b, time){
      this.trans = b
      this.time = time
      
    }
    
  }
  
  

  
      
  customElements.define('tkg-accord', Accordion);

  