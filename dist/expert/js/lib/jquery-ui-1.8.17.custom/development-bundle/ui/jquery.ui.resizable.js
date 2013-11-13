!function(a){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;if(this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"}),this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor==String){"all"==this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');/sw|se|ne|nw/.test(f)&&h.css({zIndex:++c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){if(this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}a(this.handles[c]).length}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){c.disabled||(a(this).removeClass("ui-resizable-autohide"),b._handles.show())},function(){c.disabled||b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}return this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement),this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(c){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),a.browser.opera&&/relative/.test(f.css("position"))&&f.css({position:"relative",top:"auto",left:"auto"}),this._renderProxy();var g=b(this.helper.css("left")),h=b(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:c.pageX,top:c.pageY},this.aspectRatio="number"==typeof d.aspectRatio?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");return a("body").css("cursor","auto"==i?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",c),!0},_mouseDrag:function(b){var c=this.helper,d=(this.options,this.originalMousePosition),e=this.axis,f=b.pageX-d.left||0,g=b.pageY-d.top||0,h=this._change[e];if(!h)return!1;var i=h.apply(this,[b,f,g]);return a.browser.msie&&a.browser.version<7,this.sizeDiff,this._updateVirtualBoundaries(b.shiftKey),(this._aspectRatio||b.shiftKey)&&(i=this._updateRatio(i,b)),i=this._respectSize(i,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(i),this._trigger("resize",b,this.ui()),!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}return a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(a){var b,d,e,f,g,h=this.options;g={minWidth:c(h.minWidth)?h.minWidth:0,maxWidth:c(h.maxWidth)?h.maxWidth:1/0,minHeight:c(h.minHeight)?h.minHeight:0,maxHeight:c(h.maxHeight)?h.maxHeight:1/0},(this._aspectRatio||a)&&(b=g.minHeight*this.aspectRatio,e=g.minWidth/this.aspectRatio,d=g.maxHeight*this.aspectRatio,f=g.maxWidth/this.aspectRatio,b>g.minWidth&&(g.minWidth=b),e>g.minHeight&&(g.minHeight=e),d<g.maxWidth&&(g.maxWidth=d),f<g.maxHeight&&(g.maxHeight=f)),this._vBoundaries=g},_updateCache:function(a){this.options,this.offset=this.helper.offset(),c(a.left)&&(this.position.left=a.left),c(a.top)&&(this.position.top=a.top),c(a.height)&&(this.size.height=a.height),c(a.width)&&(this.size.width=a.width)},_updateRatio:function(a){var b=(this.options,this.position),d=this.size,e=this.axis;return c(a.height)?a.width=a.height*this.aspectRatio:c(a.width)&&(a.height=a.width/this.aspectRatio),"sw"==e&&(a.left=b.left+(d.width-a.width),a.top=null),"nw"==e&&(a.top=b.top+(d.height-a.height),a.left=b.left+(d.width-a.width)),a},_respectSize:function(a,b){var d=(this.helper,this._vBoundaries),e=(this._aspectRatio||b.shiftKey,this.axis),f=c(a.width)&&d.maxWidth&&d.maxWidth<a.width,g=c(a.height)&&d.maxHeight&&d.maxHeight<a.height,h=c(a.width)&&d.minWidth&&d.minWidth>a.width,i=c(a.height)&&d.minHeight&&d.minHeight>a.height;h&&(a.width=d.minWidth),i&&(a.height=d.minHeight),f&&(a.width=d.maxWidth),g&&(a.height=d.maxHeight);var j=this.originalPosition.left+this.originalSize.width,k=this.position.top+this.size.height,l=/sw|nw|w/.test(e),m=/nw|ne|n/.test(e);h&&l&&(a.left=j-d.minWidth),f&&l&&(a.left=j-d.maxWidth),i&&m&&(a.top=k-d.minHeight),g&&m&&(a.top=k-d.maxHeight);var n=!a.width&&!a.height;return n&&!a.left&&a.top?a.top=null:n&&!a.top&&a.left&&(a.left=null),a},_proportionallyResize:function(){if(this.options,this._proportionallyResizeElements.length)for(var b=this.helper||this.element,c=0;c<this._proportionallyResizeElements.length;c++){var d=this._proportionallyResizeElements[c];if(!this.borderDif){var e=[d.css("borderTopWidth"),d.css("borderRightWidth"),d.css("borderBottomWidth"),d.css("borderLeftWidth")],f=[d.css("paddingTop"),d.css("paddingRight"),d.css("paddingBottom"),d.css("paddingLeft")];this.borderDif=a.map(e,function(a,b){var c=parseInt(a,10)||0,d=parseInt(f[b],10)||0;return c+d})}a.browser.msie&&(a(b).is(":hidden")||a(b).parents(":hidden").length)||d.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.element,c=this.options;if(this.elementOffset=b.offset(),this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b){return{width:this.originalSize.width+b}},w:function(a,b){var c=(this.options,this.originalSize),d=this.originalPosition;return{left:d.left+b,width:c.width-b}},n:function(a,b,c){var d=(this.options,this.originalSize),e=this.originalPosition;return{top:e.top+c,height:d.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),"resize"!=b&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.17"}),a.ui.plugin.add("resizable","alsoResize",{start:function(){var b=a(this).data("resizable"),c=b.options,d=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10),position:b.css("position")})})};"object"!=typeof c.alsoResize||c.alsoResize.parentNode?d(c.alsoResize):c.alsoResize.length?(c.alsoResize=c.alsoResize[0],d(c.alsoResize)):a.each(c.alsoResize,function(a){d(a)})},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,e){a(b).each(function(){var b=a(this),f=a(this).data("resizable-alsoresize"),g={},i=e&&e.length?e:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(i,function(a,b){var c=(f[b]||0)+(h[b]||0);c&&c>=0&&(g[b]=c||null)}),a.browser.opera&&/relative/.test(b.css("position"))&&(d._revertToRelativePosition=!0,b.css({position:"absolute",top:"auto",left:"auto"})),b.css(g)})};"object"!=typeof e.alsoResize||e.alsoResize.nodeType?i(e.alsoResize):a.each(e.alsoResize,function(a,b){i(a,b)})},stop:function(){var b=a(this).data("resizable"),c=b.options,d=function(b){a(b).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};b._revertToRelativePosition&&(b._revertToRelativePosition=!1,"object"!=typeof c.alsoResize||c.alsoResize.nodeType?d(c.alsoResize):a.each(c.alsoResize,function(a){d(a)})),a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b){var c=a(this).data("resizable"),d=c.options,e=c._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:c.sizeDiff.height,h=f?0:c.sizeDiff.width,i={width:c.size.width-h,height:c.size.height-g},j=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null,k=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;c.element.animate(a.extend(i,k&&j?{top:k,left:j}:{}),{duration:d.animateDuration,easing:d.animateEasing,step:function(){var d={width:parseInt(c.element.css("width"),10),height:parseInt(c.element.css("height"),10),top:parseInt(c.element.css("top"),10),left:parseInt(c.element.css("left"),10)};e&&e.length&&a(e[0]).css({width:d.width,height:d.height}),c._updateCache(d),c._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(){var c=a(this).data("resizable"),d=c.options,e=c.element,f=d.containment,g=f instanceof a?f.get(0):/parent/.test(f)?e.parent().get(0):f;if(g)if(c.containerElement=a(g),/document/.test(f)||f==document)c.containerOffset={left:0,top:0},c.containerPosition={left:0,top:0},c.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var h=a(g),i=[];a(["Top","Right","Left","Bottom"]).each(function(a,c){i[a]=b(h.css("padding"+c))}),c.containerOffset=h.offset(),c.containerPosition=h.position(),c.containerSize={height:h.innerHeight()-i[3],width:h.innerWidth()-i[1]};var j=c.containerOffset,k=c.containerSize.height,l=c.containerSize.width,m=a.ui.hasScroll(g,"left")?g.scrollWidth:l,n=a.ui.hasScroll(g)?g.scrollHeight:k;c.parentData={element:g,left:j.left,top:j.top,width:m,height:n}}},resize:function(b){var c=a(this).data("resizable"),d=c.options,e=(c.containerSize,c.containerOffset),f=(c.size,c.position),g=c._aspectRatio||b.shiftKey,h={top:0,left:0},i=c.containerElement;i[0]!=document&&/static/.test(i.css("position"))&&(h=e),f.left<(c._helper?e.left:0)&&(c.size.width=c.size.width+(c._helper?c.position.left-e.left:c.position.left-h.left),g&&(c.size.height=c.size.width/d.aspectRatio),c.position.left=d.helper?e.left:0),f.top<(c._helper?e.top:0)&&(c.size.height=c.size.height+(c._helper?c.position.top-e.top:c.position.top),g&&(c.size.width=c.size.height*d.aspectRatio),c.position.top=c._helper?e.top:0),c.offset.left=c.parentData.left+c.position.left,c.offset.top=c.parentData.top+c.position.top;var j=Math.abs((c._helper?c.offset.left-h.left:c.offset.left-h.left)+c.sizeDiff.width),k=Math.abs((c._helper?c.offset.top-h.top:c.offset.top-e.top)+c.sizeDiff.height),l=c.containerElement.get(0)==c.element.parent().get(0),m=/relative|absolute/.test(c.containerElement.css("position"));l&&m&&(j-=c.parentData.left),j+c.size.width>=c.parentData.width&&(c.size.width=c.parentData.width-j,g&&(c.size.height=c.size.width/c.aspectRatio)),k+c.size.height>=c.parentData.height&&(c.size.height=c.parentData.height-k,g&&(c.size.width=c.size.height*c.aspectRatio))},stop:function(){var b=a(this).data("resizable"),c=b.options,d=(b.position,b.containerOffset),e=b.containerPosition,f=b.containerElement,g=a(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width,j=g.outerHeight()-b.sizeDiff.height;b._helper&&!c.animate&&/relative/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:j}),b._helper&&!c.animate&&/static/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:j})}}),a.ui.plugin.add("resizable","ghost",{start:function(){var b=a(this).data("resizable"),c=b.options,d=b.size;b.ghost=b.originalElement.clone(),b.ghost.css({opacity:.25,display:"block",position:"relative",height:d.height,width:d.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof c.ghost?c.ghost:""),b.ghost.appendTo(b.helper)},resize:function(){var b=a(this).data("resizable");b.options,b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=a(this).data("resizable");b.options,b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b){var c=a(this).data("resizable"),d=c.options,e=c.size,f=c.originalSize,g=c.originalPosition,h=c.axis;d._aspectRatio||b.shiftKey,d.grid="number"==typeof d.grid?[d.grid,d.grid]:d.grid;var i=Math.round((e.width-f.width)/(d.grid[0]||1))*(d.grid[0]||1),j=Math.round((e.height-f.height)/(d.grid[1]||1))*(d.grid[1]||1);/^(se|s|e)$/.test(h)?(c.size.width=f.width+i,c.size.height=f.height+j):/^(ne)$/.test(h)?(c.size.width=f.width+i,c.size.height=f.height+j,c.position.top=g.top-j):/^(sw)$/.test(h)?(c.size.width=f.width+i,c.size.height=f.height+j,c.position.left=g.left-i):(c.size.width=f.width+i,c.size.height=f.height+j,c.position.top=g.top-j,c.position.left=g.left-i)}});var b=function(a){return parseInt(a,10)||0},c=function(a){return!isNaN(parseInt(a,10))}}(jQuery);