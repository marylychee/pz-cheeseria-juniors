import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Wrapper } from './Purchases.styles';

// Types
import { PurchaseType } from '../App';

type Props = {
  recentPurchases: PurchaseType[];
};

const Cart: React.FC<Props> = ({ recentPurchases }) => {


  return (
    <Wrapper>
      <h2>Your Recent Purchases</h2>

      {recentPurchases.length === 0 ? <p>No recent purchases.</p> : null}

      {recentPurchases.map(purchase => (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    Order Number {purchase.id}
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchase.purchaseItems.map(row => (
                  <TableRow key={row.title}>
                              <TableCell>{row.title}</TableCell>
                              <TableCell align="right">{row.amount}</TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right">{(row.amount * row.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="left">Total</TableCell>
                  <TableCell align="right">${purchase.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        ))}

    </Wrapper>
  );
};

export default Cart;
