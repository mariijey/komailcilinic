// type
import { NavItemType } from "types/menu";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import GroupIcon from "@mui/icons-material/Group";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import QuizIcon from "@mui/icons-material/Quiz";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Email from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const icons = {
  PeopleAltIcon,
  DashboardIcon,
  HomeWorkIcon,
  GroupIcon,
  NewspaperIcon,
  QuizIcon,
  HistoryEduIcon,
  MarkEmailReadIcon,
  ContactPhoneIcon,
  ContactMailIcon,
  Email,
  DriveFolderUploadIcon,
  AdminPanelSettingsIcon,
  VerifiedUserIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: "group-dashboard",
  type: "group",
  children: [
    {
      id: "داشبورد",
      type: "item",
      title: "Dashboard",
      icon: icons.DashboardIcon,
      url: "/dashboard",
      breadcrumbs: true,
    },
    {
      id: "doctors",
      type: "item",
      title: "دکترها",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_doctors.php",
      breadcrumbs: true,
    },
    {
      id: "blog",
      type: "item",
      title: "مقالات",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_Arti.php",
      breadcrumbs: true,
    },
    {
      id: "cilinik",
      type: "item",
      title: "کیلینیک",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_Arti.php",
      breadcrumbs: true,
    },
    {
      id: "news",
      type: "item",
      title: "اخبار",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_News.php",
      breadcrumbs: true,
    },
    {
      id: "insurence",
      type: "item",
      title: "بیمه",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_insurence.php",
      breadcrumbs: true,
    },

    {
      id: "gallery",
      type: "item",
      title: "گالری",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_gallery.php",
      breadcrumbs: true,
    },

    {
      id: "Schedule",
      type: "item",
      title: "برنامه درگاه",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/Add_prog.php",
      breadcrumbs: true,
    },
    {
      id: "users",
      type: "item",
      title: "کاربران",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/show_users.php",
      breadcrumbs: true,
    },
    {
      id: "organ",
      type: "item",
      title: "سازمان طرف قرارداد",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/show_users.php",
      breadcrumbs: true,
    },

    {
      id: "Special-services",
      type: "item",
      title: " نوبت های رزرو شده ",
      icon: icons.DashboardIcon,
      url: "/KomailClinic/Admin/show_users.php",
      breadcrumbs: true,
    },
    {
      id: "visits",
      type: "collapse",
      title: "نوبت های رزرو شده",
      icon: icons.NewspaperIcon,
      // access: { roles: [13] },
      children: [
        {
          id: "visits-normal",
          title: "نمایش نوبت های معمولی (سوپر ادمین)",
          type: "item",
          url: "/KomailClinic/Admin/sHow_Reservetion.php",
        },
        {
          id: "visits-sub",
          title: "نمایش نوبت های تخت پوشش (سوپر ادمین)",
          type: "item",
          url: "/KomailClinic/Admin/show_sub_resrev.php",
        },
      ],
    },
  ],
};

export default dashboard;
