import { lazy } from "react";

// project import
import MainLayout from "layout/MainLayout";
import CommonLayout from "layout/CommonLayout";
import Loadable from "components/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";
import { Navigate } from "react-router";

// render - dashboard
const Dashboard = Loadable(lazy(() => import("pages/dashboard")));
const DashboardDefault = Loadable(
  lazy(() => import("pages/dashboard/default"))
);

//render - property

const Properties = Loadable(lazy(() => import("pages/PropertyManagement")));
const PropertyDetails = Loadable(
  lazy(() => import("pages/PropertyManagement/Details"))
);
const ReceivedRequestList = Loadable(
  lazy(() => import("pages/PropertyManagement/ReceivedRequestList"))
);
const DontApprovedProperties = Loadable(
  lazy(() => import("pages/PropertyManagement/DontApprovedProperties"))
);

const PropertyReports = Loadable(
  lazy(() => import("pages/PropertyManagement/PropertyReports"))
);
const AllPropertiesReports = Loadable(
  lazy(() => import("pages/PropertyManagement/AllPropertiesReports"))
);

//render - users

const UsersList = Loadable(lazy(() => import("pages/UserManagement/List")));
const UserProfile = Loadable(
  lazy(() => import("pages/UserManagement/UserProfile"))
);
const PersonalInfo = Loadable(
  lazy(() => import("sections/UserManagement/Detail/PersonalInfo"))
);
const AgentInfo = Loadable(
  lazy(() => import("sections/UserManagement/Detail/AgentInfo"))
);
const ActivePlans = Loadable(
  lazy(() => import("sections/UserManagement/Detail/ActivePlans"))
);
const EmailPreferenceSetting = Loadable(
  lazy(() => import("sections/UserManagement/Detail/EmailPreferenceSetting"))
);
const SendMailPersonal = Loadable(
  lazy(() => import("sections/UserManagement/Detail/SendMail"))
);
const SendMail = Loadable(lazy(() => import("pages/UserManagement/SendMail")));
const SaveSearches = Loadable(
  lazy(() => import("pages/UserManagement/SaveSearch"))
);
const SaveProperties = Loadable(
  lazy(() => import("pages/UserManagement/SaveProperty"))
);
const ProfileContracts = Loadable(
  lazy(() => import("pages/UserManagement/ContractList"))
);
const UserProperties = Loadable(
  lazy(() => import("pages/UserManagement/UserProperties"))
);
const UserInvoices = Loadable(
  lazy(() => import("pages/UserManagement/Invoices"))
);
const Roles = Loadable(lazy(() => import("pages/UserManagement/Roles")));
const AdminList = Loadable(lazy(() => import("pages/UserManagement/Admins")));

const MaintenanceError = Loadable(lazy(() => import("pages/maintenance/404")));
const MaintenanceError500 = Loadable(
  lazy(() => import("pages/maintenance/500"))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import("pages/maintenance/under-construction"))
);
const MaintenanceComingSoon = Loadable(
  lazy(() => import("pages/maintenance/coming-soon"))
);

//render - Kyc
const KYCList = Loadable(lazy(() => import("pages/KYCManagement/index")));
const KYCDetail = Loadable(lazy(() => import("pages/KYCManagement/Detail")));

//render - News

const NewsList = Loadable(lazy(() => import("pages/ContentManagement/News")));
const CreateNews = Loadable(
  lazy(() => import("pages/ContentManagement/News/Form"))
);
const NewsCategories = Loadable(
  lazy(() => import("pages/ContentManagement/News/Category"))
);
const NewsFetchCategory = Loadable(
  lazy(() => import("pages/ContentManagement/News/Category/Form"))
);

//render - FAQ

const FAQ = Loadable(lazy(() => import("pages/ContentManagement/FAQ")));
const CreateFAQ = Loadable(
  lazy(() => import("pages/ContentManagement/FAQ/Form"))
);
const FAQCategories = Loadable(
  lazy(() => import("pages/ContentManagement/FAQ/Category/index"))
);
const FAQFetchCategory = Loadable(
  lazy(() => import("pages/ContentManagement/FAQ/Category/Form"))
);

// render - contracts
const ContractList = Loadable(lazy(() => import("pages/ContractManagement")));
const ContractDetail = Loadable(
  lazy(() => import("pages/ContractManagement/Detail"))
);
const CertificateDepositList = Loadable(
  lazy(() => import("pages/ContractManagement/CertificateList"))
);
const CertificateDepositDetail = Loadable(
  lazy(() => import("pages/ContractManagement/CertificateDetail"))
);
const AnalyzeList = Loadable(
  lazy(() => import("pages/ContractManagement/AnalyzeList"))
);

const AnalyzeDetial = Loadable(
  lazy(() => import("pages/ContractManagement/AnalyzeDetail"))
);

const AppContactUS = Loadable(lazy(() => import("pages/contact-us")));

// contact

const ContactUsList = Loadable(lazy(() => import("pages/ContactUsManagement")));
const ContactUsDetail = Loadable(
  lazy(() => import("pages/ContactUsManagement/Detail"))
);

//subscribed emails

const SubscribedEmails = Loadable(lazy(() => import("pages/EmailsManagement")));

// upload file

const UploadFile = Loadable(lazy(() => import("pages/UploadFile")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "dashboard",
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
          ],
        },
        {
          path: "/property-management",
          children: [
            {
              path: "",
              element: <Properties />,
            },
            {
              path: ":id",
              element: <PropertyDetails />,
            },
            {
              path: ":id/received-request-list",
              element: <ReceivedRequestList />,
            },
            {
              path: "dont-approved-property",
              element: <DontApprovedProperties />,
            },
            {
              path: ":id/reports",
              element: <PropertyReports />,
            },
            {
              path: "reports",
              element: <AllPropertiesReports />,
            },
          ],
        },
        {
          path: "/user-management",
          children: [
            {
              path: "",
              element: <UsersList />,
            },
            {
              path: ":id",
              element: <UserProfile />,
              children: [
                {
                  path: "",
                  skipLazyLoad: true,
                  element: <Navigate to="personal" />,
                },
                {
                  path: "personal",
                  element: <PersonalInfo />,
                },
                {
                  path: "agent",
                  element: <AgentInfo />,
                },
                {
                  path: "active-plans",
                  element: <ActivePlans />,
                },
                {
                  path: "email-preference",
                  element: <EmailPreferenceSetting />,
                },
                {
                  path: "contracts",
                  element: <ProfileContracts />,
                },
                {
                  path: "send-email",
                  element: <SendMailPersonal />,
                },
              ],
            },
            {
              path: "send-mail",
              element: <SendMail />,
            },
            {
              path: ":id/save-searches",
              element: <SaveSearches />,
            },
            {
              path: ":id/save-properties",
              element: <SaveProperties />,
            },
            {
              path: ":id/properties",
              element: <UserProperties />,
            },
            {
              path: ":id/invoices",
              element: <UserInvoices />,
            },
          ],
        },
        {
          path: "admin-management",
          children: [
            {
              path: "",
              skipLazyLoad: true,
              element: <Navigate to="admins" />,
            },
            {
              path: "admins",
              element: <AdminList />,
            },
            {
              path: "roles",
              element: <Roles />,
            },
          ],
        },
        {
          path: "",
          children: [
            {
              path: "/contracts-management",
              element: <ContractList />,
            },
            {
              path: "/contracts-management/:id",
              element: <ContractDetail />,
            },
            {
              path: "/certificates-deposit",
              element: <CertificateDepositList />,
            },
            {
              path: "/certificates-deposit/:id",
              element: <CertificateDepositDetail />,
            },
            {
              path: "/contracts-management/analyze-list",
              element: <AnalyzeList />,
            },
            {
              path: "/contracts-management/analyze-details/:id",
              element: <AnalyzeDetial />,
            },
          ],
        },
        {
          path: "/contactus-management",
          children: [
            {
              path: "",
              element: <ContactUsList />,
            },
            {
              path: ":id",
              element: <ContactUsDetail />,
            },
          ],
        },
        { path: "kyc-management", element: <KYCList /> },
        { path: "kyc-management/:id", element: <KYCDetail /> },
        {
          path: "news",
          children: [
            {
              path: "",
              element: <NewsList />,
            },
            {
              path: "create",
              element: <CreateNews />,
            },
            {
              path: ":id",
              element: <CreateNews />,
            },
            {
              path: "categories",
              children: [
                {
                  path: "",
                  element: <NewsCategories />,
                },
                {
                  path: "create",
                  element: <NewsFetchCategory />,
                },
                {
                  path: ":id",
                  element: <NewsFetchCategory />,
                },
              ],
            },
          ],
        },
        {
          path: "faq",
          children: [
            {
              path: "",
              element: <FAQ />,
            },
            {
              path: "create",
              element: <CreateFAQ />,
            },
            {
              path: ":id",
              element: <CreateFAQ />,
            },
            {
              path: "categories",
              children: [
                {
                  path: "",
                  element: <FAQCategories />,
                },
                {
                  path: "create",
                  element: <FAQFetchCategory />,
                },
                {
                  path: ":id",
                  element: <FAQFetchCategory />,
                },
              ],
            },
          ],
        },
        {
          path: "subscribed-emails",
          element: <SubscribedEmails />,
        },
        {
          path: "upload-file",
          element: <UploadFile />,
        },
      ],
    },
    {
      path: "/maintenance",
      element: <CommonLayout />,
      children: [
        {
          path: "404",
          element: <MaintenanceError />,
        },
        {
          path: "500",
          element: <MaintenanceError500 />,
        },
        {
          path: "under-construction",
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: "coming-soon",
          element: <MaintenanceComingSoon />,
        },
      ],
    },
    {
      path: "/",
      element: <CommonLayout layout="simple" />,
      children: [
        {
          path: "contact-us",
          element: <AppContactUS />,
        },
      ],
    },
  ],
};

export default MainRoutes;
