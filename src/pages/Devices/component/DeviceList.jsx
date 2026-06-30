import { Box, Typography, Paper, Chip, Button, Stack } from "@mui/material";

const STATUS_INVOICE = "تخصیص یافته";

const STATUS_LABELS = {
  "تخصیص یافته": "فاکتور شده",
  غیرفعال: "غیرفعال",
  "فعال شده": "فعال",
  "جمع‌آوری شده": "جمع‌آوری شده",
};

export default function DeviceList({ devices, loading, onAssignClick }) {
  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <Typography>در حال بارگذاری...</Typography>
      </Box>
    );
  }

  if (devices.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary">دستگاهی یافت نشد.</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2}>
      {devices.map((d) => {
        const canAssign = d.status === STATUS_INVOICE;
        return (
          <Paper
            key={d.name}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography fontWeight={600}>{d.serial_number}</Typography>
              <Typography color="text.secondary" fontSize={13}>
                {d.device_brand} {d.device_model}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                پایانه: {d.terminal || "—"}
              </Typography>
              {d.first_name && (
                <Typography fontSize={12} color="text.secondary">
                  {d.first_name} {d.last_name} | {d.national__id}
                </Typography>
              )}
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={STATUS_LABELS[d.status] || d.status || "نامشخص"}
                color={
                  d.status === STATUS_INVOICE
                    ? "success"
                    : d.status === "غیرفعال"
                      ? "error"
                      : "default"
                }
                size="small"
              />
              {canAssign && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onAssignClick(d)}
                >
                  تخصیص
                </Button>
              )}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
