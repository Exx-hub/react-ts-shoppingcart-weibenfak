import { Fragment, useState } from "react";
import { useQuery } from "react-query";

// components
import ProductCard from "./components/product-card/ProductCard";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";

// mui
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Styles
import { AppWrapper as Wrapper, StyledButton } from "./App.styles";

// types
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  qty: number;
};

// fetch data from api
const fetcherFunction = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data: Product[] = await response.json();
  return data;
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  console.log(cartItems);
  // useQuery hook from react query using fetcher function to fetch data
  const { data, isLoading, error } = useQuery<Product[]>(
    "products",
    fetcherFunction
  );
  // console.log(data);

  // const getTotalItems = (cartItems: Product[]) => cartItems.length;

  const getTotalItems = (items: Product[]) =>
    items.reduce((acc: number, item) => acc + item.qty, 0);

  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) => {
          if (item.id === clickedItem.id) {
            return { ...item, qty: item.qty + 1 }; // item object, add 1 to qty property
          } else {
            return item;
          }
        });
      }
      // First time the item is added, a qty prop is added to the item
      return [...prev, { ...clickedItem, qty: 1 }]; // cartItems array, add new cart item object with qty key
    });
  };

  // iterates over cartItem array, checks each item, returns acc + item if not matching id
  // if matching id,
  // ---if qty 1, just returns the acc without doing anything, this will remove the item, then goes to next item
  // adds next item to cartItem array and returns it, effectively removing the matched id item.
  // if qty more than 1, returns array with spreaded acc, with cartItem object with qty key dedcuted by 1.
  // a little complicated to wrap head around but i understand how it works.
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        console.log("acc", acc);
        if (item.id === id) {
          if (item.qty === 1) return acc;
          return [...acc, { ...item, qty: item.qty - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as Product[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <ShoppingCart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <ProductCard product={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
