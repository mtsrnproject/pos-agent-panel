// src/components/invoices/InvoiceList.jsx
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import InvoiceCard from "./InvoiceCard";

export default function InvoiceList({
  invoices,
  selectedId,
  onSelect,
  loading,
}) {
  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        فاکتورها
      </Typography>

      <Stack spacing={2}>
        {invoices.map((inv) => (
          <InvoiceCard
            key={inv.name}
            invoice={inv}
            isSelected={inv.name === selectedId}
            onClick={() => onSelect(inv.name)}
          />
        ))}
      </Stack>
    </Box>
  );
}
