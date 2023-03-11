import * as fs from 'fs';
import * as path from 'path';

import { Category } from 'src/app/category/entities/category.entity';

const createDefaultCategories = async () => {
  const pathSrc = path.join(
    __dirname,
    '..',
    '/assets/data/mock_category_data.json',
  );
  const data = fs.readFileSync(pathSrc, {
    encoding: 'ascii',
  });
  // parse data into json
  const jsonData = JSON.parse(data);
  // get categories
  const categories = await Category.find();

  if (!categories[0]) {
    const newCategories = Category.create(jsonData);
    await Category.save(newCategories);
  }
};
export default createDefaultCategories;
