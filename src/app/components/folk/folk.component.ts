import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folk',
  templateUrl: './folk.component.html',
  styleUrls: ['./folk.component.scss']
})

export class FolkComponent {
  @Input() lives: number;
}
