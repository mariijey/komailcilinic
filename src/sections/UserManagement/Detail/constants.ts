import { UserItemSchema } from "types/userManagement";
import * as Yup from "yup";

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);

export const initialValues: Partial<UserItemSchema> = {
  name: "",
  mobile: "",
  website: "",
  bio: "",
  avatar: null,
  userType: undefined,
  social: {
    twitter: "",
    youtube: "",
    facebook: "",
    instagram: "",
  },
  address: { address: "", phone: "", postcode: "" },
  agent: {
    name: "",
    email: "",
    number: "",
    phone: "",
    mobile: "",
    about: "",
    openingHours: "",
    logoId: null,
  },
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().max(255).required("is required"),
  mobile: Yup.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
      "Invalid phone number format"
    )
    .required("Phone number is required"),
  website: Yup.string().nullable(),
  bio: Yup.string().nullable(),
  userType: Yup.string().nullable(),
  address: Yup.object()
    .shape({
      address: Yup.string().nullable(),
      phone: Yup.string().nullable(),
      postcode: Yup.string().nullable(),
    })
    .nullable(),
  social: Yup.object()
    .shape({
      twitter: Yup.string().nullable(),
      youtube: Yup.string().nullable(),
      facebook: Yup.string().nullable(),
      instagram: Yup.string().nullable(),
    })
    .nullable(),
});
