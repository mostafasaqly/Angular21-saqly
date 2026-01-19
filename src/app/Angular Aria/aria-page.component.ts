import { Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Toolbar, ToolbarWidget, ToolbarWidgetGroup } from '@angular/aria/toolbar';
import { Tabs, TabList, Tab, TabPanel, TabContent } from '@angular/aria/tabs';
import { AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent } from '@angular/aria/accordion';

import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-aria-page',
  imports: [
    CommonModule,

    // Toolbar
    Toolbar, ToolbarWidget, ToolbarWidgetGroup,

    // Tabs
    Tabs, TabList, Tab, TabPanel, TabContent,

    // Accordion
    AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent,

    // Menu (needs CDK Overlay)
    Menu, MenuContent, MenuItem, MenuTrigger, OverlayModule,
  ],
  templateUrl: './aria-page.component.html',
  styleUrl: './aria-page.component.css',
})
export class AriaPageComponent {
  // Tabs state
  selectedTab = signal<'toolbar' | 'accordion' | 'menu'>('toolbar');

  onTabChange(next: string | undefined) {
    if (next === 'toolbar' || next === 'accordion' || next === 'menu') {
      this.selectedTab.set(next);
    } else {
      this.selectedTab.set('toolbar');
    }
  }

  // Menu references (Angular Aria uses viewChild for menu directive instance)
  formatMenu = viewChild<Menu<string>>('formatMenu');
  categorizeMenu = viewChild<Menu<string>>('categorizeMenu');

  // Demo “selected value” from menu items
  lastMenuAction = signal<string | null>(null);

  isBold = signal(false);
  isItalic = signal(false);
  align = signal<'left' | 'center' | 'right'>('left');

  toggleBold() {
    this.isBold.update(v => !v);
  }

  toggleItalic() {
    this.isItalic.update(v => !v);
  }

  setAlign(value: 'left' | 'center' | 'right') {
    this.align.set(value);
  }

}
