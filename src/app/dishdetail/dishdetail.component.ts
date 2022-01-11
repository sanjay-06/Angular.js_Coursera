import { Comment } from './../shared/coment'
import { Location } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { DishService } from './../services/dish.service'
import { Dish } from './../shared/dish'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish
  dishIds: string[]
  prev: string
  next: string
  commentForm: FormGroup
  comment: Comment

  @ViewChild('fform') commentFormDirective

  formErrors = {
    author: '',
    rating: '',
    comment: '',
  }

  validationMessages = {
    author: {
      required: 'Author Name is required.',
      minlength: 'Author Name must be at least 2 characters long.',
    },
    comment: {
      required: 'Comment is required.',
    },
  }

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => (this.dishIds = dishIds))
    this.route.params
      .pipe(switchMap(params => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish
        this.setPrevNext(dish.id)
      })
  }

  setPrevNext(dishId: string | undefined) {
    const index = this.dishIds.indexOf(dishId)
    const length = this.dishIds.length
    this.prev = this.dishIds[(length + index - 1) % length]
    this.next = this.dishIds[(length + index + 1) % length]
  }

  goBack(): void {
    this.location.back()
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required]],
      rating: 5,
    })

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  onSubmit() {
    this.comment = this.commentForm.value
    this.comment.date = new Date().toISOString()
    this.dish.comments.push(this.comment)
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    })
    this.commentFormDirective.resetForm()
  }

  onValueChanged(data: any) {
    if (!this.commentForm) return
    const form = this.commentForm
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = ''
        const control = form.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' '
            }
          }
        }
      }
    }
  }
}
