(function(){
  
  /* Instance to export:
  */
  function XSCI($,iterator){
    
    // Need a DOM element:
    // Need a function to iterate with:
    if(!$ || typeof iterator !== "function") return false;
    
    // Use an XSCI instance:
    if(!(this instanceof XSCI)) return new XSCI($,iterator);
    
    // Iterate:
    for(
      // Prepare instance:
      this.$        = $,
      this.index    = 0,
      this.stopping = false,
      this.children = this.$.childNodes,
      this.length   = this.children.length;
      // Prepare conditions:
      this.index < this.length && this.stopping !== true;
      // Prepare iteration:
      this.index++
    ){
      
      // Prepare id:
      this.id = current(this) ? this.get("id") : null
      
      // Run the iterator under context of our instance:
      // Pass the iterator our current child:
      // Return false if the iterator returns false:
      if(iterator.call(this,this.children[this.index]) === false) return false;
      
    }
    
    // Return true if the iterator did not return false:
    return true
    
  }
  
  /* Utility to check for valid nodes:
  */
  function current(XSCI,$){
    
    return (
      ($ = XSCI.children[XSCI.index])
      &&
      $.parentNode
      &&
      $.parentNode === XSCI.$
      &&
      typeof $.getAttribute === "function"
      &&
      typeof $.setAttribute === "function"
      &&
      typeof $.removeAttribute === "function"
    )
    
  }
  
  // If the instance is stopping, then have it continue:
  XSCI.prototype.go = function(){ this.stopping = false }
  
  // If the instance is running, then have it end:
  XSCI.prototype.stop = function(){ this.stopping = true }
  
  // Empty out the current child:
  XSCI.prototype.empty = function(){
    
    if(current(this)){
      
      while(this.children[this.index].firstChild){
        
        this.children[this.index].removeChild(this.children[this.index].firstChild)
        
      }
      
    }
    
  }
  
  // Remove the current child:
  XSCI.prototype.delete = function(){
    
    if(current(this)){
      
      this.$.removeChild(this.children[this.index])
      
      this.index--
      
      this.length--
      
    }
    
  }
  
  // Set an attribute of the current child:
  XSCI.prototype.set = function(key,value){
    
    return current(this) ? this.children[this.index].setAttribute(key,value) : null
    
  }
  
  // Get an attribute of the current child:
  XSCI.prototype.get = function(key){
    
    return current(this) ? this.children[this.index].getAttribute(key) : null
    
  }
  
  // Remove an attribute of the current child:
  XSCI.prototype.remove = function(key){
    
    return current(this) ? this.children[this.index].removeAttribute(key) : null
    
  }
  
  window.XSCI = XSCI
  
})()

