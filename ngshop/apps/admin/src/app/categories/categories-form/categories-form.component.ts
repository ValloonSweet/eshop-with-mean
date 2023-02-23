import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { CategoriesService, Category } from '@ngshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  editMode: boolean = false;
  categoryId!: string;
  color!: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        icon: ['', Validators.required],
        color: ['', Validators.required]
      })
      this._checkEditMode();
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    const category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value
    }

    if(this.editMode) {
      this._updateCategory(this.categoryId, category)
    } else {
      this._createCategory(category);
    }


  }

  private _createCategory(category: Category) {
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

  private _updateCategory(id: string, category: Category) {
    this.categoriesService.updateCategory(id, category).subscribe({
      next: ({status}) => {
        if(status) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is updated!'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cannot update category!'});
        }
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cannot update category!'});
      }
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editMode = true;
        this.categoryId = params['id'];
        this.categoriesService.getCategory(params['id']).subscribe(({category}) => {
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['icon'].setValue(category.icon);
          this.categoryForm['color'].setValue(category.color);
        })
      } else {
        this.editMode = false;
      }
    })
  }

  get categoryForm() {
    return this.form.controls;
  }

}
