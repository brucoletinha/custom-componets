import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-custom-dropdown-button',
  templateUrl: './custom-dropdown-button.component.html',
  styleUrls: ['./custom-dropdown-button.component.scss']
})
export class CustomDropdownButtonComponent implements OnInit {

  @Input()
  public reference: HTMLElement;
 
  @ViewChild(TemplatePortalDirective, { static: true })
  public contentTemplate: TemplatePortalDirective;
  
  constructor(protected overlay: Overlay) { }

  ngOnInit(): void {
  }

  protected overlayRef: OverlayRef;
  
  public showing = false;
  
  public show() {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(this.contentTemplate);
      this.syncWidth();
      this.overlayRef.backdropClick().subscribe(() => this.hide());
      this.showing = true;
  }
  
  public hide() {
    this.overlayRef.detach();
    this.showing = false;
  }
  
  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }
  
  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }
  
    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }])
    .withDefaultOffsetY(-(this.reference.offsetHeight));

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
 
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }
}
