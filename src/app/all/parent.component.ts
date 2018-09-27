import { Component } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'lch-all-parent',
  templateUrl: './parent.component.html',
  styles: ['.parent {background: moccasin}'],
  providers:  [ LoggerService ]
})
export class ParentComponent {

  hasChild = false;
  hookLog: string[];

  name = 'Jaime';
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
    this.hookLog = logger.logs;
  }

  // *ngIf crea o elimina el componente
  toggleChild() {
    this.hasChild = !this.hasChild;
    if (this.hasChild) {
      this.name = 'Jaime';
      this.logger.clear(); // clear log on create
    }
    this.logger.tick();
  }

  updateHero() {
    this.name += '! y otra cosa';
    this.logger.tick();
  }
}
