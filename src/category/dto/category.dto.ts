export class CreateCategoryDto {
  public readonly name: string;
  public readonly description: string;
}
export class UpdateCategoryDto {
  public readonly name?: string;
  public readonly description?: string;
}
