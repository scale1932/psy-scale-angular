import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Header } from '../../../../app/layout/header/header';
import {provideZonelessChangeDetection} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {provideRouter, RouterModule} from '@angular/router';
import { NzIconModule, provideNzIcons} from 'ng-zorro-antd/icon';
import {routes} from '../../../../app/app.routes';
import {LoginOutline} from '@ant-design/icons-angular/icons';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header,CommonModule, NzDropDownModule, RouterModule, NzIconModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideNzIcons([LoginOutline])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
