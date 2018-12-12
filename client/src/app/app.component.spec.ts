import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/components/layout/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducers } from './store';
import { GravatarModule } from 'ngx-gravatar';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'user', 'categories', 'cart'],
    rehydrate: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [
        RouterTestingModule,
        GravatarModule,
        FormsModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
