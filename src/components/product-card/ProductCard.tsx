// react
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ContextProvider";

// mui
import Button from "@mui/material/Button";

// types
import { Product } from "../../App";

//styles
import { ProductCardWrapper as Wrapper } from "./ProductCard.styles";

interface ProductCardProps {
  product: Product;
  handleAddToCart: (clickedItem: Product) => void;
}

function ProductCard(props: ProductCardProps) {
  const { product, handleAddToCart } = props;

  const { title, description, price, image, id } = product;
  return (
    <Wrapper>
      <img src={image} alt="item.title" />

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <h3>${price}</h3>
      </div>

      <Button onClick={() => handleAddToCart(product)}>ADD TO CART</Button>
    </Wrapper>
  );
}

export default ProductCard;
