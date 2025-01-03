import React, { useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import {
  useDeleteCartMutation,
  useGetAllMyCartsQuery,
} from '../redux/features/api/carts/carts.api';
import { TCartProduct } from '../types/cart.type';
import { toast } from 'sonner';
import Loader from '../components/ui/Loader';
import Title from '../components/helmet/Title';

const ViewCart: React.FC = () => {
  const { data, isLoading } = useGetAllMyCartsQuery({});
  const [deleteCart] = useDeleteCartMutation();
  // Calculate total price
  const totalPrice =
    data?.data?.reduce(
      (sum: number, item: TCartProduct) => sum + item.price * item.qty,
      0
    ) || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteCartHandler = async (id: string) => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await deleteCart(id).unwrap();

      if (res?.success) {
        toast.success(res?.message, {
          id: toastId,
          duration: 200,
        });
      }
    } catch (error: any) {
      toast.success(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  return (
    <>
      <Title title="Cart" content="This is cart page." />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-2">
          <Typography
            variant="h4"
            gutterBottom
            className="text-center my-10 lg:my-16"
          >
            Shopping Cart
          </Typography>

          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {data?.data.map((p: TCartProduct) => (
                <Card key={p.id} sx={{ mb: 2 }}>
                  <CardContent sx={{ display: 'flex', gap: 2 }}>
                    <img
                      src={p.product?.images[0]}
                      alt={p.product?.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{p.product?.name}</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Price: {p.price} TK
                      </Typography>

                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <IconButton size="small">
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{p.qty}</Typography>
                        <IconButton size="small">
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          sx={{ ml: 'auto' }}
                          onClick={() => deleteCartHandler(p.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography>Subtotal:</Typography>
                      <Typography>{totalPrice} TK</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography>Delivery Fee:</Typography>
                      <Typography>60 TK</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">{totalPrice + 60} TK</Typography>
                  </Box>
                  <Button
                    component={Link}
                    to="/checkout"
                    variant="contained"
                    fullWidth
                    size="large"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default ViewCart;
