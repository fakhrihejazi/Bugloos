namespace bugloos.Core.Entities
{
  public class Product:BaseEntity{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }
    public string TeacherPictureUrl { get; set; }
    public string TeacherName { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }

  }
}