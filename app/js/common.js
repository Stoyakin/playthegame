"use strict";

function qs(query, root = document) {
  return root.querySelector(query);
}

function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}

function getParent(el, findParent) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.classList && el.classList.contains(findParent)) return el;
  }
  return false;
}

const resetForm = (itemForm) => {
  ['error', 'no-empty'].forEach(item => qsAll(`.${item}`, itemForm).forEach(elem => elem.classList.remove(item)));
  itemForm.reset();
};

window.onload = () => qs('body').classList.add('page-loaded');

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) qs('body').classList.add('ios');

document.addEventListener("DOMContentLoaded", function (event) {

  window.site = {};

  window.site.form = ({

    init: function () {

      const _th = this,
        inputs = qsAll('.form__field-input, .form__field-textarea'),
        forms = qsAll('form'),
        digitsInput = qsAll('.js-digits');

      function emptyCheck(event) {
        event.target.value.trim() === '' ?
          event.target.classList.remove('not-empty') :
          event.target.classList.add('not-empty')
      }

      for (let item of inputs) {
        item.addEventListener('keyup', emptyCheck)
        item.addEventListener('blur', emptyCheck)
      }

      for (let form of forms) {
        form.addEventListener('submit', (e) => {
          console.log('submit');
          return !_th.checkForm(form) && e.preventDefault()
        })
      }

      for (let digitInput of digitsInput) {
        digitInput.addEventListener('keydown', (e) => {
          let validArr = [46, 8, 9, 27, 13, 110, 190]
          if (validArr.indexOf(e.keyCode) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
          }
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault()
          }
        });
      }

      return this
    },

    checkForm: function (form) {
      let checkResult = true;
      const warningElems = form.querySelectorAll('.error');

      if (warningElems.length) {
        for (let warningElem of warningElems) {
          warningElem.classList.remove('error')
        }
      }

      for (let elem of form.querySelectorAll('input, textarea, select')) {
        if (elem.getAttribute('data-req')) {
          switch (elem.getAttribute('data-type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test(elem.value)) {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'file':
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
          }
        }
      }

      for (let item of form.querySelectorAll('input[data-req^=agreement]')) {
        if (!item.checked) {
          item.classList.add('error')
          checkResult = false
        }
      }

      return checkResult
    }

  }).init()

  window.site.obj = {

    slideUp: function slideUp(selector, duration, cb = null) {
      if (!selector)
        return;
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      element.style.height = element.offsetHeight + 'px';
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = duration + 'ms';
      element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },

    slideDown: function slideDown(selector, duration, cb = null) {
      if (!selector)
        return;
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      element.style.removeProperty('display');
      if (display === 'none') display = 'block';
      element.style.display = display;
      let height = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      element.offsetHeight;
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = duration + 'ms';
      element.style.height = height + 'px';
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },

    slideToogle: function slideToogle(selector, duration, cb = null) {
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      if (display === 'none') this.slideDown(element, duration, cb)
      else this.slideUp(element, duration, cb)
    },

    fadeOut: function fadeOut(selector, duration, cb = null) {
      if (!selector) return;
      let element,
        op = 1;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          element.style.display = 'none';
          if (cb) cb();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      }, duration / 50 || 20);
    },

    fadeIn: function fadeIn(selector, duration, cb = null) {
      if (!selector)
        return;
      let element,
        op = 0.1;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      element.style.opacity = 0;
      element.style.display = 'block';
      let timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
          if (cb) cb();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 50 || 20);
    },

    reviewsSwiper: function reviewsSwiper() {

      var reviewsSwiper = new Swiper('.js-reviews-swiper', {
        loop: true,
        speed: 700,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: '.reviews .swiper-button-next',
          prevEl: '.reviews .swiper-button-prev',
        },
        pagination: {
          el: '.reviews .swiper-pagination',
          type: 'bullets',
          clickable: 1
        },
      });

    },

    galleryBottom: function galleryBottom() {

      var galleryBottom = new Swiper('.js-gallery-bottom-swiper', {
        loop: false,
        speed: 700,
        slidesPerView: 5,
        spaceBetween: 23,
        navigation: {
          nextEl: '.gallery-bottom .swiper-button-next',
          prevEl: '.gallery-bottom .swiper-button-prev',
        },
        pagination: {
          el: '.gallery-bottom .swiper-pagination',
          type: 'bullets',
          clickable: 1
        },
        breakpoints: {
          375: {
            slidesPerView: 1
          },
          667: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          },
        },
        on: {
          init: function () {
            if ( qsAll('.gallery-bottom__item-overimg').length > this.params.slidesPerView )
              qs('.gallery-bottom').classList.add('swiper-show-nav')
            else
              qs('.gallery-bottom').classList.remove('swiper-show-nav')
          },
        }
      });

    },

    anim: function () {

      let elemsAnimArr = ['.js-scroll-anim'];

      function visChecker(el) {
        const rect = el.getBoundingClientRect();
        const wHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= (wHeight * 0.75);
      }

      function elemVisCheck(elArray) {
        window.addEventListener('scroll', () => {
          if (elArray.length) {
            elArray.forEach((item) => {
              if (qsAll(item).length) {
                qsAll(item).forEach((elem) => {
                  if (visChecker(elem)) elem.classList.add('start-animate');
                });
              }
            });
          }
        });
      }

      if (elemsAnimArr.length) elemVisCheck(elemsAnimArr);

    },

    video: function video() {
      const videoPlyr = new Plyr('.js-video', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        loadSprite: false,
        playsInline: true
      });
    },

    mainSlider: function mainSlider() {
      var mSlider = new Swiper('.js-main-slider-init', {
        speed: 600,
        spaceBetween: 0,
        pagination: {
          el: '.js-main-slider-init .swiper-pagination',
          type: 'bullets',
          clickable: 1
        },
      });
    },

    hitsSlider: function hitsSlider() {
      const self = this;
      var hitsSlider = new Swiper('.js-hits-slider', {
        speed: 750,
        spaceBetween: 30,
        slidesPerView: 3,
        centeredSlides: 1,
        loop: 1,
        navigation: {
          nextEl: '.js-hits-slider .swiper-button-next',
          prevEl: '.js-hits-slider .swiper-button-prev',
        }
      });
    },

    mainLightGallery: function mainLightGallery() {
      qsAll('.js-lightgallery').forEach(function (item) {
        lightGallery(item, {
          selector: 'a',
          counter: 0,
          download: 0
        });
      })
    },

    burger: function burger() {
      const _self = this,
        navWrap = qs('.nav');
      qs('.js-burger').addEventListener('click', function (e) {
        if (this.classList.contains('active')) {
          this.classList.remove('active');
          _self.fadeOut(navWrap, 300);
        } else {
          this.classList.add('active');
          _self.fadeIn(navWrap, 300);
        }
        e.preventDefault();
      });
    },

    init: function init() {

      //let elemsAnimArr = ['.js-scroll-anim'];

      //if (elemsAnimArr.length) this.anim();

      if (qs('.js-burger')) this.burger();

      if (qs('.js-reviews-swiper')) this.reviewsSwiper();

      if (qs('.js-gallery-bottom-swiper')) this.galleryBottom();

      if (qs('.js-video')) this.video();

      if (qs('.js-main-slider-init')) this.mainSlider();

      if (qs('.js-hits-slider')) this.hitsSlider();

      if (qs('.js-lightgallery')) this.mainLightGallery();

      let eventResize;

      try {
        eventResize = new Event('resize')
      } catch (e) {
        eventResize = document.createEvent('Event');
        eventResize.initEvent('resize', false, false);
      }
      window.dispatchEvent(eventResize)

      let eventScroll
      try {
        eventScroll = new Event('scroll')
      } catch (e) {
        eventScroll = document.createEvent('Event');
        eventScroll.initEvent('scroll', false, false);
      }
      window.dispatchEvent(eventScroll)

      return this;
    }

  }.init();

});
