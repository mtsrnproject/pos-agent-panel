// src/components/invoices/InvoiceList.jsx
import { Box, Typography, Stack, CircularProgress, Alert } from "@mui/material";
import InvoiceCard from "./InvoiceCard";

export default function InvoiceList({
  invoices,
  selectedId,
  onSelect,
  loading,
  error,
}) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">خطا در دریافت فاکتورها: {error.message}</Alert>
    );
  }

  if (!invoices || invoices.length === 0) {
    return <Alert severity="info">فاکتوری یافت نشد</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight="bold">
        فاکتورهای اخیر
      </Typography>
      <Stack spacing={2}>
        {invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            isSelected={invoice.id === selectedId}
            onClick={() => onSelect(invoice.id)}
          />
        ))}
      </Stack>
    </Box>
  );
}
