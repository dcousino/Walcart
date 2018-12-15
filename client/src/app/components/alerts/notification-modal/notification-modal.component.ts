import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
  @Input() order: any;
  constructor(public activeModal: NgbActiveModal) {}
  typeCheck(value: any): string {
    return typeof value;
  }
  ngOnInit() {}
}
