import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { CustomSelectComponent } from './custom-dropdown/custom-select/custom-select.component';
import { CustomSelectOptionComponent } from './custom-dropdown/custom-select-option/custom-select-option.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomDropdownComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
