import React, { useState, useEffect } from "react";
import { Contract, ContractText } from "types/contractManagment";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { getLocaleDateString, addCommas } from "utils/helpers/main";
import Handlebars from "handlebars/dist/handlebars";
import { isEmpty } from "lodash";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useDownloadTextMutation } from "store/api/contractManagement";
import { useParams } from "react-router-dom";
import useAlert from "hooks/useAlert";

const TextDetail = ({
  data,
  textData,
}: {
  data?: Contract;
  textData?: ContractText;
}) => {
  const { id } = useParams();
  const { showAlert } = useAlert();
  const [html, setHtml] = useState<string>("");
  const [signs, setSigns] = useState<any>({});
  const [downloadPdf, { isLoading }] = useDownloadTextMutation();

  useEffect(() => {
    let obj: any = {};
    // eslint-disable-next-line array-callback-return
    data?.signs.map((item) => {
      if (item.type === "landlord") obj["landlord"] = item;
      else if (item.type === "tenant") obj["tenant"] = item;
      else if (item.type === "witness" && data?.landlord?.id === item?.user?.id)
        obj["landlord_witness"] = obj?.landlord_witness
          ? [...obj.landlord_witness, item]
          : [item];
      else
        obj["tenant_witness"] = obj?.tenant_witness
          ? [...obj.tenant_witness, item]
          : [item];
    });

    setSigns(obj);
  }, [data]);

  useEffect(() => {
    if (textData) {
      let template = Handlebars.compile(textData?.template);
      setHtml(template(getTemplate(textData.text)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textData, signs]);

  const getTemplate = (text?: string) => {
    return {
      currency: "£",
      deposit: addCommas(data?.deposit),
      monthly_rent: addCommas(data?.monthlyRent),
      landlord_name: data?.landlord.firstName || "-",
      tenant_name: data?.tenant.name || "-",
      property_name: data?.property?.title,
      property_address: data?.property?.address?.address_1,
      property_start_date: getLocaleDateString(data?.property?.buildDate),
      landlord_address: data?.landlord?.address?.address,
      contract_text: text,
      agent_name: data?.agencyInfo?.name || "-",
      agent_manager_name: data?.agencyInfo?.manager || "-",
      agent_address: data?.agencyInfo?.address || "-",
      contract_date_day: data?.startedAt
        ? new Date(data?.startedAt).getDay() + 1
        : null,
      contract_date_month: data?.startedAt
        ? new Date(data?.startedAt).getMonth() + 1
        : null,
      contract_date_year: data?.startedAt
        ? new Date(data?.startedAt).getFullYear()
        : null,
      bank_account_name: data?.landlordBankAccountInfo?.name,
      bank_account_number: data?.landlordBankAccountInfo?.iban,
      deposit_schema: data?.protectDepositScheme,

      sign_landlord_image:
        ": " +
        (signs?.landlord?.file?.downloadUrl
          ? '<img src="' + signs?.landlord?.file?.downloadUrl + '" />'
          : "-"),

      sign_landlord_witness_1_image:
        ": " +
        (signs?.landlord_witness &&
        signs?.landlord_witness[0]?.file?.downloadUrl
          ? '<img src="' +
            signs?.landlord_witness[0]?.file?.downloadUrl +
            '" />'
          : "-"),
      sign_landlord_witness_1_name:
        ": " +
        (signs?.landlord_witness
          ? signs?.landlord_witness[0]?.meta?.name
          : "-"),
      sign_landlord_witness_1_address:
        ": " +
        (signs?.landlord_witness
          ? signs?.landlord_witness[0]?.meta?.address
          : "-"),
      sign_landlord_witness_1_job:
        ": " +
        (signs?.landlord_witness ? signs?.landlord_witness[0]?.meta?.job : "-"),
      sign_landlord_witness_2_image:
        ": " +
        (signs?.landlord_witness &&
        signs?.landlord_witness[1]?.file?.downloadUrl
          ? '<img src="' +
            signs?.landlord_witness[1]?.file?.downloadUrl +
            '" />'
          : "-"),
      sign_landlord_witness_2_name:
        ": " +
        (signs?.landlord_witness
          ? signs?.landlord_witness[1]?.meta?.name || "-"
          : "-"),
      sign_landlord_witness_2_address:
        ": " +
        (signs?.landlord_witness
          ? signs?.landlord_witness[1]?.meta?.address || "-"
          : "-"),
      sign_landlord_witness_2_job:
        ": " +
        (signs?.landlord_witness
          ? signs?.landlord_witness[1]?.meta?.job || "-"
          : "-"),

      sign_tenant_image:
        ": " +
        (signs?.tenant?.file?.downloadUrl
          ? '<img src="' + signs?.tenant?.file?.downloadUrl + '" />'
          : "-"),

      sign_tenant_witness_1_image:
        ": " +
        (signs?.tenant_witness && signs?.tenant_witness[0]?.file?.downloadUrl
          ? '<img src="' + signs?.tenant_witness[0]?.file?.downloadUrl + '" />'
          : "-"),
      sign_tenant_witness_1_name:
        ": " +
        (signs?.tenant_witness ? signs?.tenant_witness[0]?.meta?.name : "-"),
      sign_tenant_witness_1_address:
        ": " +
        (signs?.tenant_witness ? signs?.tenant_witness[0]?.meta?.address : "-"),
      sign_tenant_witness_1_job:
        ": " +
        (signs?.tenant_witness ? signs?.tenant_witness[0]?.meta?.job : "-"),

      sign_tenant_witness_2_image:
        signs?.tenant_witness && signs?.tenant_witness[1]?.file?.downloadUrl
          ? '<img src="' + signs?.tenant_witness[1]?.file?.downloadUrl + '" />'
          : "-",
      sign_tenant_witness_2_name:
        ": " +
        (signs?.tenant_witness
          ? signs?.tenant_witness[1]?.meta?.name || "-"
          : "-"),
      sign_tenant_witness_2_address:
        ": " +
        (signs?.tenant_witness
          ? signs?.tenant_witness[1]?.meta?.address || "-"
          : "-"),
      sign_tenant_witness_2_job:
        ": " +
        (signs?.tenant_witness
          ? signs?.tenant_witness[1]?.meta?.job || "-"
          : "-"),
    };
  };

    const handleDownload = () => {
      downloadPdf(id).then((response: any) => {
        if (Boolean(response.data)) {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${+new Date()}.pdf`;
          link.click();
          window.URL.revokeObjectURL(link.href);
          showAlert({ message: "Successful download", type: "success" });
        }
      });
    };
    
  return (
    <Stack mt={2}>
      <Button
        startIcon={<PictureAsPdfIcon />}
        variant="outlined"
        style={{
          width: "200px",
        }}
        disabled={isLoading}
        onClick={handleDownload}
      >
        Download PDF
      </Button>
      {!isEmpty(html) && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Stack>
  );
};

export default TextDetail;
