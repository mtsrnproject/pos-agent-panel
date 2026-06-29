// src/components/invoices/InvoiceDetailsPanel.jsx
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Print, Download } from "@mui/icons-material";

const statusConfig = {
  invoiced: { label: "فاکتور شده", color: "primary" },
  assigned: { label: "تخصیص یافته", color: "success" },
};

export default function InvoiceDetailsPanel({ invoice, loading, onAssign }) {
  if (loading) {
    return (
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (!invoice) {
    return (
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          لطفاً یک فاکتور را انتخاب کنید
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            جزئیات فاکتور {invoice.number}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            لیست سریال‌های ثبت شده در این فاکتور
          </Typography>
        </Box>
        <Box>
          <IconButton size="small">
            <Print />
          </IconButton>
          <IconButton size="small">
            <Download />
          </IconButton>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell>شماره سریال</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>بانک پذیرنده</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.serials?.map((serial, index) => {
              const status =
                statusConfig[serial.status] || statusConfig.invoiced;
              const isAssigned = serial.status === "assigned";

              return (
                <TableRow key={serial.serialNumber}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography fontFamily="monospace" fontWeight="bold">
                      {serial.serialNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={status.label}
                      color={status.color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{serial.bank}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant={isAssigned ? "outlined" : "contained"}
                      size="small"
                      disabled={isAssigned}
                      onClick={() => onAssign(serial.serialNumber)}
                    >
                      {isAssigned ? "تخصیص شده" : "تخصیص دستگاه"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="text">
          مشاهده همه سریال‌ها (
          {invoice.totalSerials || invoice.serials?.length || 0} مورد)
        </Button>
      </Box>
    </Paper>
  );
}
