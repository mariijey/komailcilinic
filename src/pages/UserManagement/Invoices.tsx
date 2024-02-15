import { useParams } from "react-router";
import Invoices from "sections/UserManagement/Invoices";

const UserInvoices = () => {
    const {id} = useParams();
  return <Invoices userId={id}/>;
};

export default UserInvoices;
