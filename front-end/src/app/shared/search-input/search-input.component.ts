import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-search-input",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./search-input.component.html",
  styleUrl: "./search-input.component.scss",
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input()
  public initialValue = "";

  @Input()
  debounceTime = 300;

  @Output()
  public textChange = new EventEmitter<string>();

  protected textContent: string = this.initialValue;
  private inputValue = new Subject<string>();
  private trigger$ = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  subscriptions: Subscription[] = [];

  ngOnInit() {
    const subscription = this.trigger$.subscribe(currentValue => {
      this.textChange.emit(currentValue);
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onInput() {
    this.inputValue.next(this.textContent);
  }
}
