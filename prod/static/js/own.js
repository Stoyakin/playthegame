"use strict";function qs(e){return(1<arguments.length&&void 0!==arguments[1]?arguments[1]:document).querySelector(e)}function qsAll(e){return(1<arguments.length&&void 0!==arguments[1]?arguments[1]:document).querySelectorAll(e)}function getParent(e,t){for(;e&&e.parentNode;)if((e=e.parentNode).classList&&e.classList.contains(t))return e;return!1}var resetForm=function(e){["error","no-empty"].forEach(function(t){return qsAll(".".concat(t),e).forEach(function(e){return e.classList.remove(t)})}),e.reset()};window.onload=function(){return qs("body").classList.add("page-loaded")},navigator.userAgent.match(/(iPod|iPhone|iPad)/)&&qs("body").classList.add("ios"),document.addEventListener("DOMContentLoaded",function(e){window.site={},window.site.form={init:function(){var r=this,e=qsAll(".form__field-input, .form__field-textarea"),t=qsAll("form"),n=qsAll(".js-digits");function i(e){""===e.target.value.trim()?e.target.classList.remove("not-empty"):e.target.classList.add("not-empty")}var o=!0,l=!1,a=void 0;try{for(var s,y=e[Symbol.iterator]();!(o=(s=y.next()).done);o=!0){var d=s.value;d.addEventListener("keyup",i),d.addEventListener("blur",i)}}catch(e){l=!0,a=e}finally{try{o||null==y.return||y.return()}finally{if(l)throw a}}var c=!0,u=!1,p=void 0;try{for(var v,f=function(){var t=v.value;t.addEventListener("submit",function(e){return console.log("submit"),!r.checkForm(t)&&e.preventDefault()})},m=t[Symbol.iterator]();!(c=(v=m.next()).done);c=!0)f()}catch(e){u=!0,p=e}finally{try{c||null==m.return||m.return()}finally{if(u)throw p}}var g=!0,h=!1,w=void 0;try{for(var b,q=n[Symbol.iterator]();!(g=(b=q.next()).done);g=!0){b.value.addEventListener("keydown",function(e){-1!==[46,8,9,27,13,110,190].indexOf(e.keyCode)||65==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||67==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||88==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&e.keyCode<=39||(e.shiftKey||e.keyCode<48||57<e.keyCode)&&(e.keyCode<96||105<e.keyCode)&&e.preventDefault()})}}catch(e){h=!0,w=e}finally{try{g||null==q.return||q.return()}finally{if(h)throw w}}return this},checkForm:function(e){var t=!0,r=e.querySelectorAll(".error");if(r.length){var n=!0,i=!1,o=void 0;try{for(var l,a=r[Symbol.iterator]();!(n=(l=a.next()).done);n=!0){l.value.classList.remove("error")}}catch(e){i=!0,o=e}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}}var s=!0,y=!1,d=void 0;try{for(var c,u=e.querySelectorAll("input, textarea, select")[Symbol.iterator]();!(s=(c=u.next()).done);s=!0){var p=c.value;if(p.getAttribute("data-req"))switch(p.getAttribute("data-type")){case"tel":/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(p.value)||(p.parentNode.classList.add("error"),t=!1);break;case"email":/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(p.value)||(p.parentNode.classList.add("error"),t=!1);break;case"file":default:""===p.value.trim()&&(p.parentNode.classList.add("error"),t=!1)}}}catch(e){y=!0,d=e}finally{try{s||null==u.return||u.return()}finally{if(y)throw d}}var v=!0,f=!1,m=void 0;try{for(var g,h=e.querySelectorAll("input[data-req^=agreement]")[Symbol.iterator]();!(v=(g=h.next()).done);v=!0){var w=g.value;w.checked||(w.classList.add("error"),t=!1)}}catch(e){f=!0,m=e}finally{try{v||null==h.return||h.return()}finally{if(f)throw m}}return t}}.init(),window.site.obj={slideUp:function(e,t,r){var n;e&&((n="string"==typeof e||e instanceof String?qs(e):e).style.height=n.offsetHeight+"px",n.style.transitionProperty="height, margin, padding",n.style.transitionDuration=t+"ms",n.offsetHeight,n.style.overflow="hidden",n.style.height=0,n.style.paddingTop=0,n.style.paddingBottom=0,n.style.marginTop=0,n.style.marginBottom=0,setTimeout(function(){n.style.display="none",n.style.removeProperty("height"),n.style.removeProperty("padding-top"),n.style.removeProperty("padding-bottom"),n.style.removeProperty("margin-top"),n.style.removeProperty("margin-bottom"),n.style.removeProperty("overflow"),n.style.removeProperty("transition-property"),n.style.removeProperty("transition-duration")},t))},slideDown:function(e,t,r){if(e){var n;n="string"==typeof e||e instanceof String?qs(e):e;var i=getComputedStyle(n).display;n.style.removeProperty("display"),"none"===i&&(i="block"),n.style.display=i;var o=n.offsetHeight;n.style.overflow="hidden",n.style.height=0,n.style.paddingTop=0,n.style.paddingBottom=0,n.style.marginTop=0,n.style.marginBottom=0,n.offsetHeight,n.style.transitionProperty="height, margin, padding",n.style.transitionDuration=t+"ms",n.style.height=o+"px",n.style.removeProperty("padding-top"),n.style.removeProperty("padding-bottom"),n.style.removeProperty("margin-top"),n.style.removeProperty("margin-bottom"),setTimeout(function(){n.style.removeProperty("height"),n.style.removeProperty("overflow"),n.style.removeProperty("transition-property"),n.style.removeProperty("transition-duration")},t)}},slideToogle:function(e,t,r){var n,i=2<arguments.length&&void 0!==r?r:null;n="string"==typeof e||e instanceof String?qs(e):e,"none"===getComputedStyle(n).display?this.slideDown(n,t,i):this.slideUp(n,t,i)},fadeOut:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:null;if(e){var i,o=1;i="string"==typeof e||e instanceof String?qs(e):e;var l=setInterval(function(){o<=.1&&(clearInterval(l),i.style.display="none",n&&n()),i.style.opacity=o,i.style.filter="alpha(opacity="+100*o+")",o-=.1*o},t/50||20)}},fadeIn:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:null;if(e){var i,o=.1,l=getComputedStyle(i).display;(i="string"==typeof e||e instanceof String?qs(e):e).style.opacity=0,i.style.display=l;var a=setInterval(function(){1<=o&&(clearInterval(a),n&&n()),i.style.opacity=o,i.style.filter="alpha(opacity="+100*o+")",o+=.1*o},t/50||20)}},reviewsSwiper:function(){new Swiper(".js-reviews-swiper",{loop:!0,speed:700,effect:"fade",navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"}})},galleryBottom:function(){new Swiper(".js-gallery-bottom-swiper",{loop:!1,speed:700,slidesPerView:5,spaceBetween:23,navigation:{nextEl:".gallery-bottom .swiper-button-next",prevEl:".gallery-bottom .swiper-button-prev"},on:{init:function(){qsAll(".gallery-bottom__item-overimg").length>this.params.slidesPerView?qs(".gallery-bottom").classList.add("swiper-show-nav"):qs(".gallery-bottom").classList.remove("swiper-show-nav")}}})},anim:function(){var e,t=[".js-scroll-anim"];t.length&&(e=t,window.addEventListener("scroll",function(){e.length&&e.forEach(function(e){qsAll(e).length&&qsAll(e).forEach(function(e){!function(e){var t=e.getBoundingClientRect(),r=window.innerHeight||document.documentElement.clientHeight;return t.top<=.75*r}(e)||e.classList.add("start-animate")})})}))},video:function(){new Plyr(".js-video",{controls:["play","progress","current-time","mute","volume","fullscreen"],loadSprite:!1,playsInline:!0})},mainSlider:function(){new Swiper(".js-main-slider-init",{speed:600,spaceBetween:0,pagination:{el:".js-main-slider-init .swiper-pagination",type:"bullets",clickable:1}})},mainLightGallery:function(){lightGallery(qs(".js-lightgallery"),{selector:"a"})},init:function(){var t,r;qs(".js-reviews-swiper")&&this.reviewsSwiper(),qs(".js-gallery-bottom-swiper")&&this.galleryBottom(),qs(".js-video")&&this.video(),qs(".js-main-slider-init")&&this.mainSlider(),qs(".js-lightgallery")&&this.mainLightGallery();try{t=new Event("resize")}catch(e){(t=document.createEvent("Event")).initEvent("resize",!1,!1)}window.dispatchEvent(t);try{r=new Event("scroll")}catch(e){(r=document.createEvent("Event")).initEvent("scroll",!1,!1)}return window.dispatchEvent(r),this}}.init()});
//# sourceMappingURL=own.js.map
