import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KnowledgeBaseService } from '../knowledge-base.service';
import { EvaluationService } from 'app/entry/entry-content/evaluations/evaluations.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-knowledge-base-item',
  templateUrl: './knowledge-base-item.component.html',
  styleUrls: ['./knowledge-base-item.component.scss']
})
export class KnowledgeBaseItemComponent implements OnInit {

  @Input() item: any;
  @Input() itemKb: any;
  @Output() newMeasureEvent: EventEmitter<any> = new EventEmitter<any>();
  titleKb: string;

  constructor(private el: ElementRef, private router: Router,
              private _knowledgeBaseService: KnowledgeBaseService,
              private _evaluationService: EvaluationService,
              private _translateService: TranslateService,
              private activatedRoute: ActivatedRoute) {
    this.router = router;
  }

  ngOnInit() {
    this.titleKb = this.itemKb.name;
  }

  /**
   * Shows or hides an help item.
   * @memberof KnowledgeBaseItemComponent
   */
  displayItem() {
    const accordeon = this.el.nativeElement.querySelector('.pia-knowledgeBaseBlock-item-accordion button span');
    const displayer = this.el.nativeElement.querySelector('.pia-knowledgeBaseBlock-item-content');
    if (displayer.classList.contains('hide')) {
      displayer.classList.remove('hide');
      accordeon.classList.remove('pia-icon-accordeon-down');
      accordeon.classList.add('pia-icon-accordeon-up');
    } else {
      displayer.classList.add('hide');
      accordeon.classList.remove('pia-icon-accordeon-up');
      accordeon.classList.add('pia-icon-accordeon-down');
    }
  }

  /**
   * Adds a measure to the PIA.
   * This is used mainly on "Mesures préventives et existantes" subsection.
   * @memberof KnowledgeBaseItemComponent
   */
  addNewMeasure() {
    this.newMeasureEvent.emit(this.itemKb);
  }

}
