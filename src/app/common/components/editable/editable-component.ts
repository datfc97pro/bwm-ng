import { OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";

export class EditableComponent implements OnInit, OnChanges {
  @Input() entity: any;

  @Input() set field(entityField: string) {
    this.entityField = entityField;
    this.setOriginValue();
  }

  @Input() style: any;

  @Input() className: string;

  @Output() entityUpdated = new EventEmitter();

  isActiveInput: boolean = false;

  originEntityValue: any;

  entityField: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.setOriginValue();
    this.isActiveInput = false;
  }

  updateEntity() {
    const entityValue = this.entity[this.entityField];

    if (entityValue !== this.originEntityValue) {
      this.entityUpdated.emit({
        [this.entityField]: this.entity[this.entityField]
      });
      this.setOriginValue();
    }

    this.isActiveInput = false;
  }

  cancelUpdate() {
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originEntityValue;
  }

  setOriginValue() {
    this.originEntityValue = this.entity[this.entityField];
  }
}
