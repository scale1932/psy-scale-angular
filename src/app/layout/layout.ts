import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, NzLayoutModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
}
