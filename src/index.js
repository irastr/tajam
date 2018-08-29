import $ from 'jquery';
import slick from 'slick-carousel';
import magnificPopup from 'magnific-popup';
import Headhesive from 'headhesive';

$(function() {
  const header = new Headhesive('.header', {
    offset: 700
  });

  $('.form').on('submit', function(ev) {
    ev.preventDefault();
    
    const body = {
      name: $('.form__name').val(),
      email: $('.form__email').val(),
      subject: $('.form__subject').val(),
      message: $('.form__message').val(),
    };
    $('.form__preloader').addClass('animated');
    $('.btn__submit').attr('disabled', 'disabled');
    sendForm(body)
      .then(() => {
        $('.form__preloader').removeClass('animated');
        $('.btn__submit').removeAttr('disabled');
      })
      .catch(err => console.log(err));
  });

  function sendForm(body) {
    // return $.ajax('https://test-project-5422b.firebaseio.com/posts.json', {
    //   type: 'PUT',
    //   data: JSON.stringify(body),
    // });
    return $.post('https://test-project-5422b.firebaseio.com/posts.json', JSON.stringify(body));
  }

  const heroSlider = $('.hero__slider');

  $('.menu-btn').on('click', function() {
    $('.nav').addClass('nav--active');
    $('.headhessive').hide();
  })

  $('.nav__close').on('click', function() {
    $('.nav').removeClass('nav--active');
    $('.headhessive').show();
  })

  if (heroSlider.length) {
    heroSlider.slick({
      arrows: false,
      dots: true,
    });
  }

  const storyBtn = $('.story__btn');
  if (storyBtn.length) {
    storyBtn.magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

  const gallery = $('.works');

  if (gallery.length) {
    gallery.magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
    
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300,
        opener: function(element) {
          return element.find('img');
        }
      }
      
    });
  }

  const testimonials = $('.testimonials__slider-list');
  if (testimonials.length) {
    testimonials.slick({
      arrows: false,
      asNavFor: '.testimonials__slider-nav-list'
    });


    $('.testimonials__slider-nav-list').slick({
      centerMode: true,
      centerPadding: 60,
      slidesToShow: 5,
      asNavFor: '.testimonials__slider-list',
      prevArrow: $('.testimonials__slider-btn--prev'),
      nextArrow: $('.testimonials__slider-btn--next'),
      responsive: [
        {
          breakpoint: 551,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 451,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
        
      ],
    });
  }

});
