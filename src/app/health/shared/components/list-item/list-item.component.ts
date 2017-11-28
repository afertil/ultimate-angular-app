import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      {{ item | json }}
    </div>
  `
})
export class ListItemComponent {

  @Input()
  item: any;

  constructor() {}
}
