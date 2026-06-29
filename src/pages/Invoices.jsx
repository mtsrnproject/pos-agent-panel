// src/pages/Invoices.jsx
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import {
  Print as PrintIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const invoices = [
  {
    id: "1",
    number: "INV-8842",
    status: "invoiced",
    date: "۱۴۰۲/۰۸/۲۲",
    deviceCount: 15,
    amount: "۹۸,۰۰۰,۰۰۰",
  },
  {
    id: "2",
    number: "INV-8841",
    status: "pending",
    date: "۱۴۰۲/۰۸/۲۱",
    deviceCount: 5,
    amount: "۴۲,۰۰۰,۰۰۰",
  },
  {
    id: "3",
    number: "INV-8839",
    status: "delivered",
    date: "۱۴۰۲/۰۸/۱۹",
    deviceCount: 2,
    amount: "۱۴,۵۰۰,۰۰۰",
  },
];

const serialsData = [
  { id: "1", serial: "POS-99881122", status: "invoiced", bank: "بانک ملت" },
  { id: "2", serial: "POS-99881123", status: "invoiced", bank: "بانک ملی" },
  { id: "3", serial: "POS-99770055", status: "assigned", bank: "بانک پارسیان" },
  { id: "4", serial: "POS-99220033", status: "invoiced", bank: "بانک سپه" },
];

const statusLabels = {
  invoiced: "فاکتور شده",
  pending: "در انتظار پرداخت",
  delivered: "تحویل شده",
  assigned: "تخصیص یافته",
};

const statusColors = {
  invoiced: "success",
  pending: "warning",
  delivered: "info",
  assigned: "default",
};

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);
  const [selectedSerial, setSelectedSerial] = useState("");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [mobile, setMobile] = useState("");

  const handleOpenAssignModal = (serial) => {
    setSelectedSerial(serial);
    setAssignDialogOpen(true);
  };

  const handleCloseModal = () => {
    setAssignDialogOpen(false);
    setNationalId("");
    setMobile("");
  };

  const handleAssign = () => {
    if (!nationalId || nationalId.length !== 10) {
      alert("کد ملی باید ۱۰ رقم باشد");
      return;
    }
    if (!mobile || mobile.length !== 11) {
      alert("شماره موبایل باید ۱۱ رقم باشد");
      return;
    }
    handleCloseModal();
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 300);
  };

  return (
    <Box sx={{ p: 3 }} dir="rtl">
      {/* Page Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "DM Serif Display, serif",
              fontWeight: 700,
              color: "#1F2421",
              mb: 0.5,
            }}
          >
            مدیریت فاکتورها
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مشاهده و تخصیص فاکتورهای فروش به پایانه‌ها
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#C8853F",
            "&:hover": { bgcolor: "#A86B2C" },
            borderRadius: "8px",
            px: 3,
          }}
        >
          ثبت فاکتور جدید
        </Button>
      </Box>

      {/* Main Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "320px 1fr" },
          gap: 3,
        }}
      >
        {/* Invoice Cards List */}
        <Box
          sx={{
            maxHeight: { lg: "calc(100vh - 240px)" },
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#C8853F",
              borderRadius: "3px",
            },
          }}
        >
          <Stack spacing={2}>
            {invoices.map((invoice) => (
              <Card
                key={invoice.id}
                sx={{
                  cursor: "pointer",
                  border:
                    selectedInvoice.id === invoice.id
                      ? "2px solid #C8853F"
                      : "1px solid #E2D9C8",
                  borderRight:
                    selectedInvoice.id === invoice.id
                      ? "4px solid #C8853F"
                      : undefined,
                  bgcolor: "#FBF7EF",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(200, 133, 63, 0.15)",
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
                onClick={() => setSelectedInvoice(invoice)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Roboto Slab, serif",
                        fontWeight: 700,
                        color: "#1F2421",
                      }}
                    >
                      {invoice.number}
                    </Typography>
                    <Chip
                      label={statusLabels[invoice.status]}
                      color={statusColors[invoice.status]}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Stack spacing={1}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        تاریخ
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {invoice.date}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        تعداد
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {invoice.deviceCount} دستگاه
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        مبلغ کل
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: "#C8853F" }}
                      >
                        {invoice.amount} تومان
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Details Panel */}
        <Paper
          sx={{
            p: 3,
            bgcolor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E2D9C8",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "DM Serif Display, serif",
                  fontWeight: 700,
                  color: "#1F2421",
                  mb: 0.5,
                }}
              >
                جزئیات فاکتور {selectedInvoice.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                لیست سریال‌های ثبت شده در این فاکتور
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: "#C8853F" }}>
                <PrintIcon />
              </IconButton>
              <IconButton sx={{ color: "#C8853F" }}>
                <DownloadIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Serials Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#F0E3D0" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ردیف</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>شماره سریال</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>وضعیت</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>بانک پذیرنده</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serialsData.map((serial, index) => (
                  <TableRow
                    key={serial.id}
                    sx={{
                      "&:hover": { bgcolor: "#FBF7EF" },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      sx={{ fontFamily: "monospace", fontWeight: 600 }}
                    >
                      {serial.serial}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[serial.status]}
                        color={statusColors[serial.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{serial.bank}</TableCell>
                    <TableCell>
                      {serial.status === "invoiced" ? (
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor: "#C8853F",
                            "&:hover": { bgcolor: "#A86B2C" },
                          }}
                          onClick={() => handleOpenAssignModal(serial.serial)}
                        >
                          تخصیص دستگاه
                        </Button>
                      ) : (
                        <Button size="small" disabled>
                          تخصیص شده
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button sx={{ color: "#C8853F", fontWeight: 600 }}>
              مشاهده همه سریال‌ها ({selectedInvoice.deviceCount} مورد)
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Assign Device Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            bgcolor: "#FBF7EF",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E2D9C8",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "DM Serif Display, serif",
              fontWeight: 700,
            }}
          >
            تخصیص دستگاه به مشتری
          </Typography>
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Box
              sx={{
                p: 2,
                bgcolor: "#F0E3D0",
                borderRadius: "8px",
                border: "1px solid #E2D9C8",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                سریال انتخاب شده
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#C8853F",
                }}
              >
                {selectedSerial}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="کد ملی پذیرنده"
              placeholder="مثلاً ۰۰۱۱۲۲۳۳۴۴"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              inputProps={{ maxLength: 10 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#FFFFFF",
                },
              }}
            />

            <TextField
              fullWidth
              label="شماره موبایل"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              inputProps={{ maxLength: 11, dir: "ltr" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#FFFFFF",
                },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: "1px solid #E2D9C8" }}>
          <Button onClick={handleCloseModal} sx={{ color: "#8A8A80" }}>
            انصراف
          </Button>
          <Button
            variant="contained"
            onClick={handleAssign}
            sx={{
              bgcolor: "#C8853F",
              "&:hover": { bgcolor: "#A86B2C" },
              px: 3,
            }}
          >
            تایید و تخصیص
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{
            bgcolor: "#C8853F",
            color: "#FFFFFF",
            fontWeight: 600,
            "& .MuiAlert-icon": {
              color: "#FFFFFF",
            },
          }}
        >
          دستگاه با موفقیت تخصیص یافت.
        </Alert>
      </Snackbar>
    </Box>
  );
}
