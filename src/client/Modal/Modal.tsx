import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CardMedia from '@material-ui/core/CardMedia';

// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './Modal.styles';

type Props = {
  dialogOpen: boolean;
  handleDialogClose: (open: boolean) => void;
  dialogItem: CartItemType;
};

const Modal: React.FC<Props> = ({ dialogItem, dialogOpen, handleDialogClose }) => (
  <Wrapper>
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogItem.title}
        </DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            image={dialogItem.image}
            alt={dialogItem.title}
          />
          <h2>{dialogItem.category}</h2>
          <p>{dialogItem.description}</p>
          <h3>${dialogItem.price}</h3>
        </DialogContent>
    </Dialog>
  </Wrapper>
)

export default Modal;
