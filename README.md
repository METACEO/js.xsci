# XSCI.js

*Extra Small Child Iteration - 1,059 bytes minified!*

## Usage

This little library allows you to quickly iterate over an element's children. Each iteration provides you helpful information and methods via your iterator's context (the `this` variable.) All browser and API examples below incorporate the [XTF.js](https://gist.github.com/METACEO/df988bf134e3fdb18e8cafe9f6e4b7de) library (another little library great for generating DOM.)

### Browser

Below is a *very* simple example.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <script src="xtf.min.js"></script>
    <script src="xsci.min.js"></script>
  </head>
  <body>

    <div id="example"></div>

    <script>
      
      var $example = document.getElementById("example")
      
      // Generate example DOM:
      $example.appendChild(XTF([
        ["a","a tag"],
        ["b","b tag"],
        ["c","c tag"]
      ]))
      
      // Iterate over the example:
      XSCI($example,function($child){
        
        console.log(
          this.index,
          this.length,
          $child,
          $child.innerHTML
        )
        
      })
      
      // The above outputs:
      // 0 3 <a> "a tag"
      // 1 3 <b> "b tag"
      // 2 3 <c> "c tag"
      
    </script>

  </body>
</html>
```

### API

Below are the data attributes your iterator's context is provided.

- `this.$` is the original DOM element you supply XSCI (this is used by XSCI internally - only modify this if you know what you're doing.)
- `this.children` is the original DOM element's `childNodes` value (this is used by XSCI internally - only modify this if you know what you're doing.)
- `this.id` is a shorthand that provides your iterator the `id` attribute of the current child.
- `this.index` is the current child's index among the original DOM's children.
- `this.length` is the amount of children the original DOM element has.
- `this.stopping` is checked internally by XSCI to determine if it should continue to iterate. Anything other than `true` and XSCI will stop iterating. Refer to the `this.stop()` and `this.go()` below.

Below are the methods your iterator's context is provided.

- `this.stop()` will prevent the iterator from continuing after.

  ```html
  <div id="someDiv"><a></a><b></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      // This will stop on the <b> child.
      if(this.index === 1) this.stop();
      
      console.log(this.index,$child)
      
    })
    
    // The above will output:
    // 0 <a>
    // 1 <b>
    
  </script>
  ```

- `this.go()` will allow the iterator to continue if it has been stopped.

  ```html
  <div id="someDiv"><a></a><b></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      // This would stop on the <b> child but...
      if(this.index === 1) this.stop();
      
      // ...this cancels the stop.
      if(this.index === 1 && this.stopping) this.go();
      
      console.log(this.index,$child)
      
    })
    
    // The above will output:
    // 0 <a>
    // 1 <b>
    // 2 <c>
    
  </script>
  ```

- `this.empty()` will empty out the current child of its children.

  ```html
  <div id="someDiv"><a><a1></a1><a2></a2><a3></a3></a><b><b1></b1></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      if(this.index === 0) this.empty();
      
    })
    
    console.log(document.getElementById("someDiv").innerHTML)
    
    // The above will output:
    // <a></a><b><b1></b1></b><c></c>
    
  </script>
  ```
  
- `this.delete()` will remove the current child (the index and length will be updated after this method is called.)

  ```html
  <div id="someDiv"><a></a><b></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      if(this.index === 1 && this.length === 3) this.delete();
      
    })
    
    console.log(document.getElementById("someDiv").innerHTML)
    
    // The above will output:
    // <a></a><c></c>
    
  </script>
  ```

- `this.set(key,value)` is a shorthand for `$child.setAttribute(key,value)`.

  ```html
  <div id="someDiv"><a></a><b></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      this.set("data-index",this.index)
      
    })
    
    console.log(document.getElementById("someDiv").innerHTML)
    
    // The above will output:
    // <a data-index="0"></a><b data-index="1"></b><c data-index="2"></c>
    
  </script>
  ```

- `this.get(key)` is a shorthand for `$child.getAttribute(key)`.

  ```html
  <div id="someDiv"><a rel="abc"></a><b rel="123"></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      console.log(this.index,this.get("rel"))
      
    })
    
    // The above will output:
    // 0 abc
    // 1 123
    // 2 null
    
  </script>
  ```

- `this.remove(key)` is a shorthand for `$child.removeAttribute(key)`.

  ```html
  <div id="someDiv"><a rel="abc"></a><b rel="123"></b><c></c></div>

  <script>
    
    XSCI(document.getElementById("someDiv"),function($child){
      
      if(this.get("rel") !== "123") this.remove("rel");
      
    })
    
    console.log(document.getElementById("someDiv").innerHTML)
    
    // The above will output:
    // <a></a><b rel="123"></b><c></c>
    
  </script>
  ```

