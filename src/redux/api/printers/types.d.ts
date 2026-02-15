namespace CARDS {
  type GetPrinterResponse = {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    printer_image: {
      id: number;
      image: string;
    }[];
    created_date: string;
  };
  type GetPrinterRequest = void;

  type PostPrinterBasketReq = {
    printer_id: number;
    quantity: number;
  };

  type PostPrinterBasketResponse = {
    printer: {
      slug: string;
      name: string;
      description: string;
      price: number;
    };
    printer_id: number;
    quantity: number;
  };

  type GetBasketRes = {
    id: number;
    product: GetLaptopRes;
    quantity: number;
  };
  type GetBasketReq = void
}
