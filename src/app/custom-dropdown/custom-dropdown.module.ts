import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomDropdownComponent } from './custom-dropdown.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomSelectOptionComponent } from './custom-select-option/custom-select-option.component';
import { CustomDropdownService } from './custom-dropdown.service';


@NgModule({
  declarations: [
    CustomDropdownComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,    
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [CustomDropdownService]
})
export class CustomDropdownModule { }
