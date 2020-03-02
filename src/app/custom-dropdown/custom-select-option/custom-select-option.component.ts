import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomDropdownService } from '../custom-dropdown.service';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-custom-select-option',
  templateUrl: './custom-select-option.component.html',
  styleUrls: ['./custom-select-option.component.scss']
})
export class CustomSelectOptionComponent implements OnInit, Highlightable {

  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
    this.multiple = this.dropdownService.getMultiple();
  }

  ngOnInit(): void {
    this.multiple = this.dropdownService.getMultiple();
    this.dropdownService.setCheckAll(this.checkAll);
  }
  
  @Input()
  public key: any;
 
  @Input()
  public value: any;
  
  @Input()
  checked = false;

  @Input()
  public checkAll = false;

  multiple: boolean;

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

  @HostBinding('class.active')
  public active = false;
 
  public getLabel(): string {
    return this.value;
  }
 
  public setActiveStyles(): void {
    this.active = true;
  }
 
  public setInactiveStyles(): void {
    this.active = false;
  }

  public onSelect(): void {
    this.checked = true;
  }
  
  public onDeselect(): void {
    this.checked = false;
  }

  public isSelected() {
    return this.select._selectionModel.isSelected(this);
  }
  public toggle() {
    return this.select._selectionModel.select(this);
  }
}
