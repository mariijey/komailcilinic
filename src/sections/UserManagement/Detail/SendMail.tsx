import Loader from "components/Loader";
import { Params, useParams } from "react-router";
import SendMail from "sections/UserManagement/SendMail";
import { useGetUserQuery } from "store/api/userManagement";

const SendMailPersonal = () => {
  const params = useParams() as Params;
  const id: string = params.id as string;
  const { data, isLoading } = useGetUserQuery(id);

  return !isLoading ? <SendMail receiver={data?.data.email} /> : <Loader />;
};

export default SendMailPersonal;
