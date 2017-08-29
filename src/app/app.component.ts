import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      content1: '<strong>Testing</strong>',
      content2: null
    })
  }

  submit() {
    console.log(this.form.value)
    this.form.patchValue(this.form.value)
  }
}
