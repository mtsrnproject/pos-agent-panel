// src/pages/Invoices/index.jsx
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import InvoiceList from "../../components/invoices/InvoiceList";
import InvoiceDetailsPanel from "../../components/invoices/InvoiceDetailsPanel";
import AssignDeviceModal from "../../components/invoices/AssignDeviceModal";
import { invoiceService } from "../../services/invoiceService";

export default function Invoices() {
  const { enqueueSnackbar } = useSnackbar();

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSerial, setSelectedSerial] = useState("");

  // دریافت لیست فاکتورها
  useEffect(() => {
    fetchInvoices();
  }, []);

  // دریافت جزئیات فاکتور انتخابی
  useEffect(() => {
    if (selectedInvoiceId) {
      fetchInvoiceDetails(selectedInvoiceId);
    }
  }, [selectedInvoiceId]);

  const fetchInvoices = async () => {
    setLoadingList(true);
    setError(null);
    try {
      const data = await invoiceService.getInvoices();
      setInvoices(data);
      if (data.length > 0 && !selectedInvoiceId) {
        setSelectedInvoiceId(data[0].id);
      }
    } catch (err) {
      setError(err);
      enqueueSnackbar("خطا در دریافت فاکتورها", { variant: "error" });
    } finally {
      setLoadingList(false);
    }
  };

  const fetchInvoiceDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const data = await invoiceService.getInvoiceById(id);
      setSelectedInvoice(data);
    } catch (err) {
      enqueueSnackbar("خطا در دریافت جزئیات فاکتور", { variant: "error" });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleAssignClick = (serial) => {
    setSelectedSerial(serial);
    setModalOpen(true);
  };

  const handleAssignSubmit = async (serial, formData) => {
    setLoadingAssign(true);
    try {
      await invoiceService.assignDevice(serial, formData);
      enqueueSnackbar("دستگاه با موفقیت تخصیص یافت", { variant: "success" });
      setModalOpen(false);
      // رفرش جزئیات فاکتور
      if (selectedInvoiceId) {
        fetchInvoiceDetails(selectedInvoiceId);
      }
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "خطا در تخصیص دستگاه", {
        variant: "error",
      });
    } finally {
      setLoadingAssign(false);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            مدیریت فاکتورها
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مشاهده و تخصیص فاکتورهای فروش به پایانه‌ها
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          ثبت فاکتور جدید
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <InvoiceList
            invoices={invoices}
            selectedId={selectedInvoiceId}
            onSelect={setSelectedInvoiceId}
            loading={loadingList}
            error={error}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <InvoiceDetailsPanel
            invoice={selectedInvoice}
            loading={loadingDetails}
            onAssign={handleAssignClick}
          />
        </Grid>
      </Grid>

      <AssignDeviceModal
        open={modalOpen}
        serial={selectedSerial}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAssignSubmit}
        loading={loadingAssign}
      />
    </Box>
  );
}
