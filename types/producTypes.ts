export interface Iproduct {
    name: string;
    description: string;

    price: number;
    image: string;
    stock: number;
    createdAt?: Date;
    _id: string;
    _v?: number;
  }

export interface Iorder{
    arrayIdProducts: number[];
    totalItems: number;
    totalPrice: number;
  }
