import { Component, OnInit } from '@angular/core';
import { SharedService } from './service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Elysiangraphy-admin-portal';
  constructor(private sharedService: SharedService) {

  }

  ngOnInit() {
  }
}
