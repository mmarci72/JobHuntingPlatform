import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatError } from "@angular/material/form-field";
import {
  AngularMarkdownEditorModule,
  EditorInstance,
  EditorOption,
} from "angular-markdown-editor";
import { MarkdownService } from "ngx-markdown";

@Component({
  selector: "app-md-editor",
  standalone: true,
  imports: [AngularMarkdownEditorModule, MatError, ReactiveFormsModule],
  templateUrl: "./md-editor.component.html",
  styleUrl: "./md-editor.component.scss",
})
export class MdEditorComponent {
  @Input()
  public label = "";

  @Input()
  public positionFormGroup?: FormGroup;

  @Input()
  public formControlName = "";

  protected bsEditorInstance!: EditorInstance;

  protected editorOptions: EditorOption = {
    autofocus: false,
    iconlibrary: "fa",
    savable: false,
    onFullscreenExit: () => this.hidePreview(),
    onShow: e => (this.bsEditorInstance = e),
    parser: val => {
      this.parse(val);
    },
  };

  constructor(private readonly markdownService: MarkdownService) {}

  private hidePreview() {
    if (this.bsEditorInstance?.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  private parse(inputValue: string) {
    const markedOutput = this.markdownService.parse(inputValue.trim());
    this.highlight();

    return markedOutput;
  }

  private highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }
}
