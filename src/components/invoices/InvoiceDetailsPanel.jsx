// src/components/invoices/InvoiceDetailsPanel.jsx
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";

export default function InvoiceDetailsPanel({
  invoice,
  devices,
  loading,
  onAssign,
}) {
  if (!invoice) return <Typography>لطفا فاکتوری را انتخاب کنید</Typography>;

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Box mb={3}>
        <Typography variant="h6" mb={1}>
          فاکتور #{invoice.invoice_number}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {invoice.first_name} {invoice.last_name}
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : devices.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={3}>
          دستگاهی برای این فاکتور یافت نشد
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>سریال</TableCell>
              <TableCell>مدل</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>مالک</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {devices.map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.serial_number}</TableCell>
                <TableCell>{d.device_model}</TableCell>

                <TableCell>
                  <Chip
                    label={d.status || "نامشخص"}
                    color={d.agent_name ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {d.first_name && d.last_name
                    ? `${d.first_name} ${d.last_name}`
                    : "-"}
                </TableCell>

                <TableCell>
                  <Button
                    disabled={!!d.agent_name}
                    onClick={() => onAssign(d)}
                    size="small"
                    variant="outlined"
                  >
                    {d.agent_name ? "تخصیص شده" : "تخصیص"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
