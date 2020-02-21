import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomDropdownService } from '../custom-dropdown.service';

@Component({
  selector: 'custom-select-option',
  template: '{{value}}',
  styleUrls: ['./custom-select-option.component.scss']
})
export class CustomSelectOptionComponent implements OnInit {

  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  ngOnInit(): void {
  }
  @Input()
  public key: string;
 
  @Input()
  public value: string;
  
  @HostBinding('class.selected')
  public get selected(): boolean {
  return this.select.selectedOption === this;
  }
  
  private select: CustomSelectComponent;
    
  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
  event.preventDefault();
  event.stopPropagation();
  
  this.select.selectOption(this);
  }
}
