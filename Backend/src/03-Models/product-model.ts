import { UploadedFile } from "express-fileupload"

class ProductModel {
      public productId: number;
      public productName: string;
      public categoryId: number;
      public price: number;
      public picture: UploadedFile;
      public pictureName: string;
}
export default ProductModel;