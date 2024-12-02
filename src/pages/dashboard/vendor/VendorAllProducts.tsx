import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  FaSearch,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlusCircle,
  FaFilter,
} from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  category: string;
  stock: number;
  sold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  shopId: string;
  shopName: string;
  createdAt: string;
  featured: boolean;
}

const VendorAllProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Dummy data - replace with actual API call
  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Earbuds',
      image: 'https://placehold.co/300x300',
      price: 99.99,
      discountPrice: 79.99,
      category: 'Electronics',
      stock: 50,
      sold: 150,
      status: 'in-stock',
      shopId: 'shop1',
      shopName: 'Tech Gadgets Store',
      createdAt: '2024-01-15',
      featured: true,
    },
    {
      id: '2',
      name: 'Smart Watch',
      image: 'https://placehold.co/300x300',
      price: 199.99,
      category: 'Electronics',
      stock: 5,
      sold: 95,
      status: 'low-stock',
      shopId: 'shop1',
      shopName: 'Tech Gadgets Store',
      createdAt: '2024-02-20',
      featured: false,
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      image: 'https://placehold.co/300x300',
      price: 149.99,
      category: 'Electronics',
      stock: 0,
      sold: 200,
      status: 'out-of-stock',
      shopId: 'shop1',
      shopName: 'Tech Gadgets Store',
      createdAt: '2024-03-01',
      featured: false,
    },
  ];

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleEditProduct = () => {
    // Implement edit product logic
    console.log('Editing product:', selectedProduct?.id);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    // Implement delete product logic
    console.log('Deleting product:', selectedProduct?.id);
    setIsDeleteDialogOpen(false);
  };

  const getStatusColor = (status: Product['status']) => {
    const colors = {
      'in-stock': 'success',
      'low-stock': 'warning',
      'out-of-stock': 'error',
    } as const;
    return colors[status];
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">All Products</h2>
          </div>
          <div className="flex gap-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlusCircle />}
              href="/dashboard/vendor/add-product"
            >
              Add New Product
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={handleCategoryChange}
              startAdornment={
                <InputAdornment position="start">
                  <FaFilter className="text-gray-400" />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="in-stock">In Stock</MenuItem>
              <MenuItem value="low-stock">Low Stock</MenuItem>
              <MenuItem value="out-of-stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, product)}
                      className="bg-white hover:bg-gray-100"
                      size="small"
                    >
                      <FaEllipsisV />
                    </IconButton>
                  </div>
                  {product.featured && (
                    <Chip
                      label="Featured"
                      color="primary"
                      size="small"
                      className="absolute top-4 left-4"
                    />
                  )}
                </div>
                <CardContent>
                  <Typography variant="h6" component="h3" className="mb-2">
                    {product.name}
                  </Typography>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <Typography
                            variant="h6"
                            color="primary"
                            className="font-bold"
                          >
                            ${product.discountPrice}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className="line-through"
                          >
                            ${product.price}
                          </Typography>
                        </div>
                      ) : (
                        <Typography
                          variant="h6"
                          color="primary"
                          className="font-bold"
                        >
                          ${product.price}
                        </Typography>
                      )}
                    </div>
                    <Chip
                      label={product.status.replace('-', ' ')}
                      color={getStatusColor(product.status)}
                      size="small"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Typography variant="caption" color="textSecondary">
                        In Stock
                      </Typography>
                      <Typography variant="body2" className="font-semibold">
                        {product.stock} units
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" color="textSecondary">
                        Sold
                      </Typography>
                      <Typography variant="body2" className="font-semibold">
                        {product.sold} units
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="caption" color="textSecondary">
                    Added on {new Date(product.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No products found
            </Typography>
            <Typography color="textSecondary">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : "You haven't added any products yet"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlusCircle />}
              href="/dashboard/vendor/add-product"
              className="mt-4"
            >
              Add Your First Product
            </Button>
          </div>
        )}

        {/* Product Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditProduct}>
            <FaEdit className="mr-2" /> Edit Product
          </MenuItem>
          <MenuItem onClick={() => console.log('View product details')}>
            <FaEye className="mr-2" /> View Details
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} className="text-red-500">
            <FaTrash className="mr-2" /> Delete Product
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selectedProduct?.name}? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default VendorAllProducts;
