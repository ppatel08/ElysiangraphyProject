import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    public root: SharedService,
    public dialog: MatDialog,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {

    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e: any) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      };

      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', (e: any) => {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        $('body.fixed-nav .sidebar').scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on('scroll', () => {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', (e: any) => {

      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      e.preventDefault();
    });

    $('#content-wrapper').click(function () {
      $(".collapse").removeClass("show");
    });
    $('.collapse-item').click(function () {
      $(".collapse").removeClass("show");
    });

  }

  logout = () => {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
