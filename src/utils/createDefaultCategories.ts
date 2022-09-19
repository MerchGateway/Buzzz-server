import * as fs from 'fs';

import { Category } from 'src/app/category/entities/category.entity';

const createDefaultCategories = async () => {
  let data = fs.readFileSync('./mock_category_data.json', {
    encoding: 'ascii',
  });
  // parse data into json
  let jsonData = JSON.parse(data);
  // get categories
  const categories = await Category.find();

  if (!categories[0]) {
    const newCategories = Category.create(jsonData);
    await Category.save(newCategories);
  }
};
export default createDefaultCategories;
