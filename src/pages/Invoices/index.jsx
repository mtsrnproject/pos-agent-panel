// src/pages/Invoices/index.jsx
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import InvoiceList from "../../components/invoices/InvoiceList";
import InvoiceDetailsPanel from "../../components/invoices/InvoiceDetailsPanel";
import AssignDeviceModal from "../../components/invoices/AssignDeviceModal";
import invoiceService from "../../services/invoiceService";

export default function Invoices() {
  const { enqueueSnackbar } = useSnackbar();

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [devices, setDevices] = useState([]);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoadingList(true);
    try {
      const response = await invoiceService.getInvoices();
      const invoiceList = response.data || response || [];
      setInvoices(invoiceList);
      // انتخاب اولین فاکتور به‌صورت خودکار
      if (invoiceList.length > 0) {
        await selectInvoice(invoiceList[0]);
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("خطا در دریافت فاکتورها", { variant: "error" });
    } finally {
      setLoadingList(false);
    }
  };

  const selectInvoice = async (invoice) => {
    setSelectedInvoice(invoice);
    setLoadingDevices(true);
    try {
      // ← از invoice.name استفاده می‌کنیم، نه invoice.id
      const result = await invoiceService.getDevicesByInvoice(invoice.name);
      setDevices(result);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("خطا در دریافت دستگاه‌ها", { variant: "error" });
    } finally {
      setLoadingDevices(false);
    }
  };

  const handleAssignClick = (device) => {
    setSelectedDevice(device);
    setModalOpen(true);
  };

  const handleAssignSubmit = async (deviceName, formData) => {
    setLoadingAssign(true);
    try {
      await invoiceService.assignDevice(deviceName, formData);
      enqueueSnackbar("دستگاه با موفقیت تخصیص یافت", { variant: "success" });
      setModalOpen(false);
      // رفرش لیست دستگاه‌های فاکتور انتخابی
      if (selectedInvoice) {
        const list = await invoiceService.getDevicesByInvoice(
          selectedInvoice.name,
        );
        setDevices(list);
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.response?.data?.message || "خطا در تخصیص دستگاه", {
        variant: "error",
      });
    } finally {
      setLoadingAssign(false);
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            مدیریت فاکتورها
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مشاهده و تخصیص فاکتورهای فروش به پایانه‌ها
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <InvoiceList
            invoices={invoices}
            selectedId={selectedInvoice?.name} // ← name نه id
            loading={loadingList}
            onSelect={(name) => {
              const item = invoices.find((x) => x.name === name);
              if (item) selectInvoice(item);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <InvoiceDetailsPanel
            invoice={selectedInvoice}
            devices={devices}
            loading={loadingDevices}
            onAssign={handleAssignClick}
          />
        </Grid>
      </Grid>

      <AssignDeviceModal
        open={modalOpen}
        device={selectedDevice}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAssignSubmit}
        loading={loadingAssign}
      />
    </Box>
  );
}
