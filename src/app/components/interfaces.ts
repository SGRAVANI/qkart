interface Product{
    cost:number;
    image:string;
    rating:number;
    name:string;
    category:string;
    _id:string
  }
  interface Cart extends Product{
  qty:number;
  }
  export {Product,Cart}