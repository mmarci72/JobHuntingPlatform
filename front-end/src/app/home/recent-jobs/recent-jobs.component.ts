import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { JobCardComponent } from "../../shared/job-card/job-card.component";
import { NgClass, NgOptimizedImage } from "@angular/common";
import { Position } from "../../model/job.model";

@Component({
  selector: "app-recent-jobs",
  standalone: true,
  imports: [JobCardComponent, NgOptimizedImage, NgClass],
  templateUrl: "./recent-jobs.component.html",
  styleUrl: "./recent-jobs.component.scss",
})
export class RecentJobsComponent implements AfterViewInit, OnChanges {
  protected _positions: Position[] = [];

  @Input()
  public set positions(positions: Position[]) {
    this._positions = positions;

    this.cd.detach();
    this.cd.detectChanges();
    this.cd.reattach();
  }

  protected leftOffset = 0;
  protected leftDisabled = true;
  protected rightDisabled = false;
  protected activeButtonIndex = 0;

  protected numberOfButtons = 0;

  private offsetBy = 275;

  @ViewChild("cards") cards?: ElementRef<HTMLDivElement>;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.computeNumberOfNavigationalButtons();
  }

  ngAfterViewInit(): void {
    console.assert(this.cards === undefined, "cannot find html element cards");
  }
  protected scrollLeft() {
    this.leftOffset -= this.offsetBy;
    this.checkScroll();
    this.activeButtonIndex--;
  }

  protected scrollTo(index: number) {
    if (index === this.activeButtonIndex) {
      return;
    }

    if (index < this.activeButtonIndex) {
      const scrollBy = this.activeButtonIndex - index;
      this.leftOffset -= this.offsetBy * scrollBy;
      this.activeButtonIndex -= scrollBy;
    } else {
      const scrollBy = index - this.activeButtonIndex;
      this.leftOffset += this.offsetBy * scrollBy;
      this.activeButtonIndex += scrollBy;
    }
    this.checkScroll();
  }

  protected scrollRight() {
    this.leftOffset += this.offsetBy;
    this.checkScroll();
    this.activeButtonIndex++;
  }

  onScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    this.leftDisabled = this.leftOffset === 0;

    if (this.cards) {
      const width = this.cards.nativeElement.clientWidth;
      const scrollWidth = this.cards.nativeElement.scrollWidth;
      this.rightDisabled = scrollWidth - (this.leftOffset + width) <= 0;
    }
  }

  private computeNumberOfNavigationalButtons() {
    if (this.cards && this._positions.length > 0) {
      let offset = this.leftOffset;
      const width = this.cards.nativeElement.clientWidth;
      const scrollWidth = this.cards.nativeElement.scrollWidth;

      while (scrollWidth - (offset + width) > 0) {
        offset += this.offsetBy;
        this.numberOfButtons++;
      }

      this.numberOfButtons++;
    }
  }
}
