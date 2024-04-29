import { CategoryService } from './../../../services/category.service';
import { Component, signal } from '@angular/core';
import { Category } from 'src/app/models/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  id = signal<number>(0);
  label = signal<string>('');
  mode = signal<string>('');
  categories = signal<Category[]>([]);
  selected = signal<number>(-1);

  constructor(private CategoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.CategoryService.getAll().subscribe((res) => this.categories.set(res));
  }

  createOrUpdate() {
    const category: Category = {
      label: this.label(),
    };

    if (this.id()) {
      this.update();
    } else {
      this.store(category);
    }
  }

  store(category: Category) {
    this.CategoryService.persist(category).subscribe((res) => {
      this.label.set('');
      this.categories.mutate((data) => data.push(res));
    });
  }

  update() {
    const data: Category = {
      id: this.id(),
      label: this.label(),
    };

    this.CategoryService.update(this.id(), data).subscribe((res) => {
      this.categories.update((categories) =>
        categories.map((category) =>
          category.id === this.id() ? data : category
        )
      );
      this.label.set('');
      this.id.set(0);
      this.mode.set('update')
    });
  }

  editCategory(category: Category) {
    this.mode.set('edit')
    if (category.id) {
      this.id.set(category.id);
      this.label.set(category.label);
    }
  }

  deleteCategory(id : number){
    this.mode.set('delete')
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.CategoryService.delete(id).subscribe((res) => {
          this.categories.update((categories) => categories.filter((category) => category.id !== id));
        });
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
   

  }

  isSelected(i : number){
    this.selected.set(i);
  }
}
