import { Box, Typography, Paper, Chip, Button, Stack } from "@mui/material";
import { devices } from "../../mock/data";

const Devices = () => {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        دستگاه‌ها
      </Typography>

      <Stack spacing={2}>
        {devices.map((d) => (
          <Paper
            key={d.serial}
            sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography fontWeight={600}>{d.serial}</Typography>
              <Typography color="text.secondary">{d.bank}</Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              <Chip label={d.status} color="primary" size="small" />
              <Button variant="outlined">جزئیات</Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Devices;
