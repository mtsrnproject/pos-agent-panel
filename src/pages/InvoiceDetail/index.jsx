import { Box, Typography, Paper } from "@mui/material";

const InvoiceDetail = () => {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        جزئیات فاکتور
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography>اینجا جزئیات فاکتور نمایش داده می‌شود</Typography>
      </Paper>
    </Box>
  );
};

export default InvoiceDetail;
