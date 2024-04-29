import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateArticleComponent } from '../components/article/create-article/create-article.component';
import { EditArticleComponent } from '../components/article/edit-article/edit-article.component';
import { ListArticleComponent } from '../components/article/list-article/list-article.component';
import { ShowArticleComponent } from '../components/article/show-article/show-article.component';
import { CreateCategoryComponent } from '../components/category/create-category/create-category.component';
import { CreateTagComponent } from '../components/tag/create-tag/create-tag.component';



@NgModule({
  declarations: [
    CreateArticleComponent,
    EditArticleComponent,
    ListArticleComponent,
    ShowArticleComponent,
    CreateCategoryComponent,
    CreateTagComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports : [
    CreateCategoryComponent
  ]
})
export class BlogModule { }
