import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-folk',
  templateUrl: './folk.component.html',
  styleUrls: ['./folk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FolkComponent {
  @Input() lives: number;
}
