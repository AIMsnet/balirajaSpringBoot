import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategroyService } from 'src/app/services/categroy/categroy.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {

  @ViewChild('categoryModal') categoryModal : ModalDirective;

  id : Number
  categoryResponse : any
  subMainCategory : any
  category : any
  constructor(private activatedRoute:ActivatedRoute, private categroyService : CategroyService) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.categroyService.getCategory(this.id).subscribe(response => {
    this.categoryResponse = response
    this.subMainCategory = this.categoryResponse['subMainCategory']
    console.log("SUb main category", JSON.stringify(this.subMainCategory))
    })
  }

  showModalCategory(id){
    console.log("Subcategory id -> ", id)
    this.category = this.subMainCategory[id]
    this.category = this.category["category"]
    console.log(this.category) 
    this.categoryModal.show()
  }

}
