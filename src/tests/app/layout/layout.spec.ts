import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Layout } from '../../../app/layout/layout';
import {provideZonelessChangeDetection} from '@angular/core';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {provideNzIcons} from 'ng-zorro-antd/icon';
import {LoginOutline} from '@ant-design/icons-angular/icons';
import {provideRouter} from '@angular/router';
import {routes} from '../../../app/app.routes';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout, NzLayoutModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideNzIcons([LoginOutline])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
