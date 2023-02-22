import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@ngshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        icon: ['', Validators.required]
      })
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    const category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value
    }

    this.categoriesService.createCategory(category).subscribe({
      next: ({status}) => {
        if(status) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is created!'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cannot create category!'});
        }
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cannot create category!'});
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

}
