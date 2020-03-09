import { CustomSelectButtonOptionComponent } from './custom-dropdown-button/custom-select-button-option/custom-select-button-option.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import {TextFieldModule} from '@angular/cdk/text-field';

import { AppComponent } from './app.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { CustomSelectComponent } from './custom-dropdown/custom-select/custom-select.component';
import { CustomSelectOptionComponent } from './custom-dropdown/custom-select-option/custom-select-option.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { MatSelectModule } from '@angular/material/select';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { CustomDropdownButtonComponent } from './custom-dropdown-button/custom-dropdown-button.component';
import { CustomSelectButtonComponent } from './custom-dropdown-button/custom-select-button/custom-select-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomDropdownComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent,
    CustomInputComponent,
    CustomTextareaComponent,
    CustomDropdownButtonComponent,
    CustomSelectButtonComponent,
    CustomSelectButtonOptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    TextFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
