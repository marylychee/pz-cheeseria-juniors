import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Modal from './Modal/Modal';
import Purchases from './Purchases/Purchases';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type PurchaseItemType = {
  id: number;
  title: string;
  price: number;
  amount: number;
}

export type PurchaseType = {
  id: number;
  purchaseItems: Array <PurchaseItemType>;
  total: number;
}

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const getPurchases = async (): Promise<PurchaseType[]> =>
 await (await fetch(`api/purchases`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recentPurchasesOpen, setRecentPurchasesOpen] = useState(false);
  const [purchaseSuccessful, setPurchaseful] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [dialogItem, setDialogItem] = useState({} as CartItemType);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  const { data: recentPurchases, status, refetch: refetchPurchases } = useQuery<PurchaseType[]>(
    'purchases',
    getPurchases);
  console.log(data);
  console.log(recentPurchases)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const clearCart = () => setCartItems([]);

  const handleDialogOpen = (clickedItem: CartItemType) => {
    setDialogOpen(true);
    setDialogItem(clickedItem);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handlePurchase = () => {

      const purchaseItems = cartItems.map(({id, title, price, description, category, image, amount}) => {
          return {
            id, title, price, amount
          }
      });

      const calculateTotal = (cartItems: CartItemType[]) =>
        cartItems.reduce((ack: number, item: CartItemType) => ack + item.amount * item.price, 0);
      const total =  Math.round(calculateTotal(cartItems) * 1e2 ) / 1e2;

      const data = {
        purchaseItems,
        total,
      };

      try {
        fetch(`api/purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(data)
        })
        .then(response => {
          console.log(response.statusText)
          clearCart();
          setPurchaseful(true);
          refetchPurchases();
        })

      } catch (error) {
        console.error(error);
      }
  }

  const setCartFalse = () => {
    setCartOpen(false)
    setPurchaseful(false)
  }

  const onRecentPurchaseOpen = () => {
    setRecentPurchasesOpen(true)
    refetchPurchases();
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={() => onRecentPurchaseOpen()}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartFalse()}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          handlePurchase={handlePurchase}
          purchaseSuccessful={purchaseSuccessful}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} handleDialogOpen={handleDialogOpen}/>
          </Grid>
        ))}
      </Grid>

      <Modal
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogItem={dialogItem}
      />

      <Drawer anchor='left' open={recentPurchasesOpen} onClose={() => setRecentPurchasesOpen(false)}>
        <Purchases
          recentPurchases={recentPurchases} status={status}
        />
      </Drawer>

    </Wrapper>

  );
};

export default App;
