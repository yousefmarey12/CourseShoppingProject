import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipies-edit',
  templateUrl: './recipies-edit.component.html',
  styleUrls: ['./recipies-edit.component.css']
})
export class RecipiesEditComponent implements OnInit {
  id: number
  editMode: boolean = false
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null
      }
    )
  }


}
