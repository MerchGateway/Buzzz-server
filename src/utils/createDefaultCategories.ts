import { Category } from 'src/app/category/entities/category.entity';
import * as categoriesJson from '../assets/data/mock_category_data.json';

const createDefaultCategories = async () => {
  // get categories
  const parseCategory = categoriesJson as Category[];
  const categories = await Category.find();

  if (!categories[0]) {
    const newCategories = Category.create(parseCategory);

    const newlyCreatedCategories = await Category.save(newCategories);
  }
};
export default createDefaultCategories;
