var ajaxlibjs;

if (typeof ajaxlibjs == 'undefined')
{
    ajaxlibjs = true;
    console.log("ajaxlib.js");

    function iOS()
    {
	return [
	    'iPad Simulator',
	    'iPhone Simulator',
	    'iPod Simulator',
	    'iPad',
	    'iPhone',
	    'iPod'
	].includes(navigator.platform)
	    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    };

    function getHeight()
    {
        var height;

        if (document.body)
        {
            height = (document.body.clientHeight);
        }else{
            height = (window.innerHeight);
        }
        return height;
    };

    function getWidth()
    {
        var width;

        if (document.body)
        {
            width = (document.body.clientWidth);
        }else{
            width = (window.innerWidth);
        }
        return width;
    };

    function getData(page)
    {
        var xhr_object = null;
        if(window.XMLHttpRequest) // Firefox
            xhr_object = new XMLHttpRequest();
        else if(window.ActiveXObject) // Internet Explorer
            xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
        else
        {
            console.log("This browser seems to not support XMLHTTPRequest...");
            return;
        }
        xhr_object.open("GET", page, false);
        xhr_object.send(null);
        if(xhr_object.readyState == 4)
        {
            return (xhr_object.responseText);
        }
        else
        {
            return("Unable to load required content, check connection or proxy limitations");
        }
    };

    function urlencode(str)
    {
        return escape(str.replace(/%/g, '%25').replace(/\+/g, '%2B')).replace(/%25/g, '%');
    }

    function evalJsContent(target)
    {
        var scripts = document.getElementById(target).getElementsByTagName("script");
        if (scripts != null)
        {
            nbScripts = scripts.length;
            for(var i = 0; i < nbScripts; i++)
            {
                if ((scripts[i] != false) && (scripts[i].innerHTML.length != 0))
                {
                    try
                    {
                        var evalRes = eval(scripts[i].innerHTML);
                    }
                    catch (e)
                    {
                        console.log(e);
                    }
                }
                if (scripts[i] != null)
                {
                    if (scripts[i].getAttribute("src"))
                    {
                        var todo = scripts[i].getAttribute("src");
                        if (todo)
                        {
                            var script = getData(todo);
                            try
                            {
                                var evalRes = eval(script);
                            }
                            catch (e)
                            {
                                console.log(e);
                            }
                        }
                    }
                }
            }
        }
    }

    function setPage(data, target)
    {
        if (target != null)
        {
            var doc = document.getElementById(target);
            if (doc == null)
            {
                doc = document.getElementsByTagName('html')[0];
            }
            doc.innerHTML = data;
            evalJsContent(target);
        }
    }

    function copyContent(source, target)
    {
        if ((source != null) && (target != null))
        {
            var docSource = document.getElementById(source);
            var docTarget = document.getElementById(target);
            if ((docSource != null) && (docTarget != null))
                docTarget.innerHTML = docSource.innerHTML;
        }
    }

    function getPage(page, target, async=false)
    {
        var xhr_object = null;
        if(window.XMLHttpRequest) // Firefox
            xhr_object = new XMLHttpRequest();
        else if(window.ActiveXObject) // Internet Explorer
            xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
        else
        {
            console.log("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
            return;
        }
        xhr_object.onload = function ()
        {
            if (target != null)
            {
                var doc = document.getElementById(target);
                if (doc == null)
                {
                    doc = document.getElementsByTagName('html')[0];
                }
                doc.innerHTML = xhr_object.responseText;
                evalJsContent(target);
            }
        };
        xhr_object.open("GET", page, async);
        xhr_object.send(null);
        if (async == false)
        {
            return xhr_object.responseText;
        }
        else
            return false;
    };

    function addPage(page, target)
    {
        var doc = document.getElementById(target);
        if (doc == null)
        {
            doc = document.getElementsByTagName('html')[0];
        }
        var xhr_object = null;
        if(window.XMLHttpRequest) // Firefox
            xhr_object = new XMLHttpRequest();
        else if(window.ActiveXObject) // Internet Explorer
            xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
        else
        {
            console.log("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
            return;
        }
        xhr_object.open("GET", page, false);
        xhr_object.send(null);
        if(xhr_object.readyState == 4)
        {
            doc.innerHTML += xhr_object.responseText;
            evalJsContent(target);
        }
    };

    function purgePage(target)
    {
        var doc = document.getElementById(target);
        if (doc == null)
        {
            doc = document.getElementsByTagName('html')[0];
        }
        doc.innerHTML = "";
    };

    function post(path, params, target, async=true)
    {
        var method = 'post';


        var xForm = document.createElement("form");
        xForm.setAttribute("method", "post");
        xForm.setAttribute("action", path);
        for (var key in params)
        {
            if (params.hasOwnProperty(key))
            {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                xForm.appendChild(hiddenField);
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function ()
        {
            if (target != null)
            {
                var doc = document.getElementById(target);
                if (doc != null)
                {
                    doc.innerHTML = xhr.responseText;
                    evalJsContent(target);
                }
            }
        };
        xhr.open(xForm.method, xForm.action, async);
        xhr.send(new FormData(xForm));
        if (async == false)
        {
            return xhr.responseText;
        }
        else
            return false;
    };

    function setPosAndSize(elem, w, h, x, y, z, position = "absolute")
    {
        try
        {
            elem = document.getElementById(elem);
            if (x == '100%')
                x = getWidth() - w;
            if (y == '100%')
                y = getHeight() - h;
            if (w == '100%')
                w = getWidth() - x;
            if (h == '100%')
                h = getHeight() - y;
            if (x < 0)
                x = getWidth() + x;
            if (y < 0)
                y = getHeight() + y;
            if (w < 0)
                w = getWidth() - x + w;
            if (h < 0)
                h = getHeight() - y + h;
            elem.style.position= position;
            elem.style.top = y;
            elem.style.left = x;
            elem.style.zIndex = z;
            elem.style.width = w;
            elem.style.height = h;
            elem.style.overflow = "hidden";
        }
        catch (e)
        {
            console.log(e);
        }
    };

    function createInput(id, type, value, onchange = "")
    {
        var input = document.createElement("input");
        input.setAttribute("id", id);
        input.setAttribute("type", type);
        input.setAttribute("value", value);
        input.setAttribute("onchange", onchange);

        return input.outerHTML;
    }

    function appendRow(target, cols, arrayAttr, arrayContent)
    {
        var doc = document.getElementById(target);
        if (doc == null)
        {
            doc = document.getElementsByTagName('html')[0];
        }
        var res = "";
        res += "<tr>";
        for (i = 0 ; i < cols ; i++)
        {
            var attr = arrayAttr.shift();
            var content = arrayContent.shift();
            res += "<td " + attr + ">";
            res += content;
            res += "</td>";
        }

        res += "</tr>";
        doc.innerHTML += res;
    }

    function appendItem(target, content, type, attributes="", container="")
    {
        var doc = document.getElementById(target);
        var out = "";
        if (doc != null)
        {
            if (container != "")
                out += "<" + container + ">";

            out += "<" + type + " " + attributes + ">";
            out += content;
            out += "</" + type + ">";

            if (container != "")
                out += "</" + container + ">";
        }
        doc.innerHTML += out;
    }

    function openTab(parent, tabName)
    {
        var i;
        var rootElement = document.getElementById(parent);
        if (rootElement != null)
        {
            var x = rootElement.getElementsByClassName("rc_content");

            for (i = 0; i < x.length; i++)
            {
                var currentTabName = x[i].id.split('_').pop()
                var button = document.getElementById("tab_" + currentTabName);

                if (x[i].id === (parent + "_" + tabName))
                {
                    x[i].style.display = "block";
                    if (button != null)
                        button.style.backgroundColor = "#526275";
                }
                else
                {
                    x[i].style.display = "none";

                    if (button != null)
                        button.style.backgroundColor = "#728295";
                }
            }
        }
    }

    function isVisible(elem)
    {
        if (!(elem instanceof Element))
            throw Error('DomUtil: elem is not an element.');
        const style = getComputedStyle(elem);
        if (style.display === 'none')
            return false;
        if (style.visibility !== 'visible')
            return false;
        if (style.opacity < 0.1)
            return false;
        if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
                elem.getBoundingClientRect().width === 0)
        {
            return false;
        }
        const elemCenter = {
            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
        };
        if (elemCenter.x < 0)
            return false;
        if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth))
            return false;
        if (elemCenter.y < 0)
            return false;
        if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight))
            return false;
        let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
        do
        {
            if (pointContainer === elem)
                return true;
        } while (pointContainer = pointContainer.parentNode);

        return false;
    }


    function setVisible(target)
    {
        var doc = document.getElementById(target);
        if (doc != null)
        {
            doc.style.display = 'block';
        }
    }

    function setHidden(target)
    {
        var doc = document.getElementById(target);
        if (doc != null)
        {
            doc.style.display = 'none';
        }
    }

    function receiveData(addr, port, handler)
    {
        var socket = new WebSocket('ws://' + addr + ':' + port);
        socket.binaryType = 'arraybuffer';

        socket.onmessage = function(event)
        {
            handler(event.data);
        }

        return socket;
    }

function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;

      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;

      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
	  //        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
	  var search = arr[i].toUpperCase().indexOf(val.toUpperCase());
          if (search >= 0) {
          /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML = arr[i].substr(0, search);
              b.innerHTML += "<strong>" + arr[i].substr(search, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(search + val.length, arr[i].length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

}
