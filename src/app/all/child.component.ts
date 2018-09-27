import {
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { Component, Input } from '@angular/core';
import { LoggerService } from '../services/logger.service';

let siguientId = 1;
export class Parent implements OnInit {
  constructor(private logger: LoggerService) { }

  // implement OnInit's `ngOnInit` method
  ngOnInit() { this.logIt(`OnInit`); }

  logIt(msj: string) {
    this.logger.log(`#${siguientId++} ${msj}`);
  }
}

@Component({
  selector: 'lch-all-child',
  templateUrl: './child.component.html',
  styles: [':host { border: 1px solid red; display:block; background-color: white; margin: 10px;}', 'h3 { margin: 0 }']
})
export class ChildComponent extends Parent implements OnChanges,
OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
AfterViewChecked, OnDestroy {
  @Input() name: string;
  private verb = 'inicializado';

  constructor(logger: LoggerService) {
    super(logger);

    let is = this.name ? 'es' : 'no es';
    this.logIt(`Propiedad name ${is} conocida en tiempo de construccion`);
  }

  // only called for/if there is an @input variable set by parent.
  ngOnChanges(changes: SimpleChanges) {
    let changesMsgs: string[] = [];
    for (let propName in changes) {
      if (propName === 'name') {
        let name = changes['name'].currentValue;
        changesMsgs.push(`${this.verb} name a "${name}"`);
      } else {
        changesMsgs.push(propName + ' ' + this.verb);
      }
    }
    this.logIt(`OnChanges: ${changesMsgs.join('; ')}`);
    this.verb = 'changed'; // next time it will be a change
  }

    // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck() { this.logIt(`DoCheck`); }

  ngAfterContentInit() { this.logIt(`AfterContentInit`);  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked() { this.logIt(`AfterContentChecked`); }

  ngAfterViewInit() { this.logIt(`AfterViewInit`); }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked() { this.logIt(`AfterViewChecked`); }

  ngOnDestroy() { this.logIt(`OnDestroy`); }
}
