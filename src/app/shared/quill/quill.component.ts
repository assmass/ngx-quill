import {AfterViewInit, Component, ElementRef, forwardRef, OnInit, ViewEncapsulation} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

declare var require: any

const Quill = require('quill')

@Component({
  selector: 'app-quill',
  template: ``,
  styleUrls: ['./quill.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuillComponent),
    multi: true,
  }],
  encapsulation: ViewEncapsulation.None
})
export class QuillComponent implements AfterViewInit, OnInit, ControlValueAccessor {
  quillOptions = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
        [{'align': []}],
      ]
    },
    placeholder: 'Mensagem...',
    theme: 'snow'
  }

  quill: any

  content: string

  private propagateChange = (_: any) => { }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.quill = new Quill(this.elementRef.nativeElement, this.quillOptions)

    if (this.content) this.quill.pasteHTML(this.content)

    this.quill.on('text-change', () => {
      const html = this.elementRef.nativeElement.children[0].innerHTML
      this.propagateChange(html)
    })
  }

  writeValue(value) {
    this.content = value

    if (this.quill) this.quill.pasteHTML(value)
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn
  }

  public registerOnTouched() {}
}
