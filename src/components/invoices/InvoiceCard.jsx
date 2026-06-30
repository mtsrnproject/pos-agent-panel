// src/components/invoices/InvoiceCard.jsx
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

export default function InvoiceCard({ invoice, isSelected, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        borderRight: isSelected ? 4 : 0,
        borderColor: "primary.main",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold">#{invoice.invoice_number}</Typography>

          <Chip label="فاکتور" color="primary" size="small" />
        </Box>

        <Typography variant="body2">
          {invoice.first_name} {invoice.last_name}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {invoice.devices_count} دستگاه
        </Typography>
      </CardContent>
    </Card>
  );
}
