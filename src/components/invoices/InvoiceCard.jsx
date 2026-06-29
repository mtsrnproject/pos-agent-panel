// src/components/invoices/InvoiceCard.jsx
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import {
  Receipt,
  CalendarToday,
  Devices,
  AttachMoney,
} from "@mui/icons-material";

const statusConfig = {
  invoiced: { label: "فاکتور شده", color: "primary" },
  pending: { label: "در انتظار پرداخت", color: "warning" },
  delivered: { label: "تحویل شده", color: "success" },
};

export default function InvoiceCard({ invoice, isSelected, onClick }) {
  const status = statusConfig[invoice.status] || statusConfig.invoiced;

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        borderRight: isSelected ? 4 : 0,
        borderColor: "primary.main",
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: 3,
          transform: "translateX(-4px)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6" fontWeight="bold">
            {invoice.number}
          </Typography>
          <Chip label={status.label} color={status.color} size="small" />
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {invoice.date}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Devices fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {invoice.deviceCount} دستگاه
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <AttachMoney fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {invoice.amount.toLocaleString("fa-IR")} تومان
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
