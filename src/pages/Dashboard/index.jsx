import { Box, Grid, Paper, Typography, Chip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { invoices } from "../../mock/data";

const Dashboard = () => {
  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight={700} mb={3}>
        داشبورد
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        {[
          { title: "کل دستگاه‌ها", value: "2450", color: "#1976d2" },
          { title: "فعال", value: "1890", color: "#2e7d32" },
          { title: "تخصیص داده شده", value: "485", color: "#ed6c02" },
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper sx={{ p: 3 }}>
              <Typography color="text.secondary">{item.title}</Typography>
              <Typography variant="h4" sx={{ color: item.color }}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Invoice Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          آخرین فاکتورها
        </Typography>

        <Box component="table" width="100%">
          <thead>
            <tr>
              <th>شماره</th>
              <th>تاریخ</th>
              <th>دستگاه</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.devices}</td>
                <td>
                  <Chip label={inv.status} size="small" />
                </td>
                <td>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
