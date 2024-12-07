import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { TCoupon } from '../../../types/coupon.type';
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';

type TCouponProps = {
  coupon: TCoupon;
};

const CouponCard: React.FC<TCouponProps> = ({ coupon }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProduct = () => {};
  const handleDeleteClick = () => {};
  return (
    <div>
      <Card className="relative">
        <div className="absolute top-0 right-0">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <FaEllipsisV />
          </IconButton>
        </div>
        <CardContent>
          <Typography variant="h4" component={'h4'}>
            {coupon?.name}
          </Typography>
          <Typography variant="h6" component={'h6'}>
            {coupon?.discount} TK.
          </Typography>
          <Typography variant="h6" component={'h6'}>
            {coupon?.code}
          </Typography>
        </CardContent>
      </Card>

      <div>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: 100,
                width: '20ch',
              },
            },
          }}
        >
          <MenuItem onClick={handleEditProduct}>
            <FaEdit className="mr-2" /> Edit Coupon
          </MenuItem>

          <MenuItem onClick={handleDeleteClick} className="text-red-500">
            <FaTrash className="mr-2" /> Delete Coupon
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default CouponCard;
