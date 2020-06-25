import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cikisYap() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
