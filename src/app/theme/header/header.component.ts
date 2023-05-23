import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (<any>window).mobileMenu();
   
  }

  menuclick() {
    console.log("Asdf");
    
    $('body').toggleClass('tt-m-menu-open');

		// Mobile menu collapse
		$('.tt-menu-collapse').stop().slideToggle(300);

		// Close all dropdowns on mobile menu toggle button click
		$('.tt-submenu').slideUp(300);

		// Remove class "tt-m-dropdown-open" on dropdown toggle button click
		$('.tt-m-submenu-toggle').removeClass('tt-m-dropdown-open');
  }

}
