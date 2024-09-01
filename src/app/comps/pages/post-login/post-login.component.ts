import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-login',
  standalone: true,
  imports: [],
  templateUrl: './post-login.component.html',
  styleUrl: './post-login.component.scss'
})
export class PostLoginComponent implements OnInit {
  constructor(private actRt: ActivatedRoute, private router: Router) {
    this.router.navigate(['home']);
  }
  ngOnInit(): void {
    
  }
}
