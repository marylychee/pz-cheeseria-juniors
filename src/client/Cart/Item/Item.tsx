import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';


type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleDialogOpen: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, handleDialogOpen }) => (
  <Wrapper>
    <CardActionArea
      onClick={() => handleDialogOpen(item)}>
        <img src={item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <h3>${item.price}</h3>
        </div>
    </CardActionArea>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
);

export default Item;
