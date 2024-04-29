import { Category } from "./category";
import { Tag } from "./tag";

export interface Article {
    id?: number;
    title: string;
    content: string;
    slug: string;
    description: string;
    createdAt: Date;
    publishedAt: Date;
    rating: number;
    active: boolean;
    catgory : Category;
    tags : Tag[];
}
