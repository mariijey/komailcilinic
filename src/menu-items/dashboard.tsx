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
      id: "dashboard",
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
      access: { roles: [13] },
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

    {
      id: "userManagement",
      type: "item",
      title: "Users",
      icon: icons.PeopleAltIcon,
      access: { roles: [1, 5] },
      url: "/user-management",
      breadcrumbs: true,
    },
    {
      id: "kycManagement",
      type: "item",
      title: "Verifications",
      icon: icons.VerifiedUserIcon,
      access: { roles: [1, 3] },
      url: "/kyc-management",
      breadcrumbs: true,
    },
    {
      id: "adminManagement",
      type: "collapse",
      title: "Admin Management",
      icon: icons.AdminPanelSettingsIcon,
      access: { roles: [1, 5] },
      breadcrumbs: true,
      children: [
        {
          id: "admins",
          type: "item",
          title: "Admins",
          url: "/admin-management/admins",
          access: { roles: [5] },
          breadcrumbs: true,
        },
        {
          id: "roles",
          type: "item",
          title: "Roles",
          url: "/admin-management/roles",
          access: { roles: [5] },
          breadcrumbs: true,
        },
      ],
    },
    {
      id: "propertyManagement",
      type: "collapse",
      title: "Property Management",
      icon: icons.HomeWorkIcon,
      access: { roles: [9] },
      children: [
        {
          id: "properties",
          title: "Properties",
          type: "item",
          url: "/property-management",
        },
        {
          id: "dontApprovedList",
          title: "Pending for Approved List",
          type: "item",
          url: "/property-management/dont-approved-property",
        },
        {
          id: "reports",
          title: "Reports",
          type: "item",
          url: "/property-management/reports",
        },
      ],
    },
    {
      id: "contractsManagement",
      type: "collapse",
      title: "Contract Management",
      icon: icons.HistoryEduIcon,
      access: { roles: [21] },
      children: [
        {
          id: "contractsLists",
          title: "Contracts",
          type: "item",
          url: "/contracts-management",
        },
        {
          id: "certificatesList",
          title: "Certificates Deposit",
          type: "item",
          url: "/certificates-deposit",
        },
        {
          id: "analyzeList",
          title: "Analyze List",
          type: "item",
          url: "/contracts-management/analyze-list",
        },
      ],
    },

    {
      id: "FAQManagement",
      type: "collapse",
      title: "FAQ Management",
      icon: icons.QuizIcon,
      access: { roles: [13] },
      children: [
        {
          id: "FAQLists",
          title: "Faqs",
          type: "item",
          url: "faq",
        },
        {
          id: "FAQCategories",
          title: "Categories",
          type: "item",
          url: "/faq/categories",
        },
      ],
    },

    {
      id: "postManagement",
      type: "collapse",
      title: "News Management",
      icon: icons.NewspaperIcon,
      access: { roles: [13] },
      children: [
        {
          id: "news",
          title: "News",
          type: "item",
          url: "/news",
        },
        {
          id: "newsCategories",
          title: "Categories",
          type: "item",
          url: "/news/categories",
        },
      ],
    },

    {
      id: "sendMail",
      type: "item",
      title: "SendMail",
      icon: icons.Email,
      access: { roles: [41] },
      url: "/user-management/send-mail",
    },
    {
      id: "subscribedEmails",
      type: "item",
      title: "Subscribed Emails",
      icon: icons.MarkEmailReadIcon,
      access: { roles: [41] },
      url: "/subscribed-emails",
    },
    {
      id: "uploadFile",
      type: "item",
      title: "Upload File",
      icon: icons.DriveFolderUploadIcon,
      url: "/upload-file",
    },

    {
      id: "contactUs",
      type: "item",
      title: "Contact Us",
      icon: icons.ContactMailIcon,
      url: "/contactus-management",
      access: { roles: [25] },
    },
  ],
};

export default dashboard;
