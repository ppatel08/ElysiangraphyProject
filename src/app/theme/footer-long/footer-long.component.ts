import { Component, OnInit, Input } from '@angular/core';
import { AboutusService } from 'src/app/api/services/aboutus.service';

@Component({
  selector: 'app-footer-long',
  templateUrl: './footer-long.component.html',
  styleUrls: ['./footer-long.component.css']
})
export class FooterLongComponent implements OnInit {

  @Input()
  aboutUs: any;

  constructor() { }

  ngOnInit(): void {
  }

}
