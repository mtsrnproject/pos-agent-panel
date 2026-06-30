import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Typography,
  Pagination,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deviceService } from "./../../services/deviceService";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // وضعیت دیالوگ تخصیص
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [nationalId, setNationalId] = useState("");
  const [mobile, setMobile] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);

  // دریافت لیست دستگاه‌ها
  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await deviceService.getDevices(
        page,
        itemsPerPage,
        searchTerm,
      );
      setDevices(response.data || []);
      setTotalPages(Math.ceil((response.total || 0) / itemsPerPage));
    } catch (err) {
      setError("خطا در دریافت اطلاعات دستگاه‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [page, searchTerm]);

  // تغییر صفحه
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // جستجو
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  // باز کردن دیالوگ تخصیص
  const handleOpenAssignDialog = (device) => {
    setSelectedDevice(device);
    setAssignDialogOpen(true);
    setNationalId("");
    setMobile("");
  };

  // بستن دیالوگ تخصیص
  const handleCloseAssignDialog = () => {
    setAssignDialogOpen(false);
    setSelectedDevice(null);
    setNationalId("");
    setMobile("");
  };

  // تخصیص دستگاه
  const handleAssignDevice = async () => {
    if (!nationalId || !mobile) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    setAssignLoading(true);
    try {
      await deviceService.assignDevice(selectedDevice.name, nationalId, mobile);
      alert("دستگاه با موفقیت تخصیص داده شد");
      handleCloseAssignDialog();
      fetchDevices();
    } catch (err) {
      alert("خطا در تخصیص دستگاه");
    } finally {
      setAssignLoading(false);
    }
  };

  // رنگ وضعیت
  const getStatusColor = (status) => {
    const colors = {
      "فاکتور شده": "warning",
      "تخصیص داده شده": "success",
      غیرفعال: "error",
      فعال: "info",
    };
    return colors[status] || "default";
  };

  return (
    <Box
      sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* هدر و جستجو */}
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            مدیریت دستگاه‌ها
          </Typography>
          <TextField
            placeholder="جستجو بر اساس سریال..."
            value={searchTerm}
            onChange={handleSearch}
            size="small"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Paper>

      {/* پیغام خطا */}
      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* جدول دستگاه‌ها */}
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ flex: 1, overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>مدل</TableCell>
                <TableCell>شماره سریال</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>مالک</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell>شماره پایانه</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : devices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary">
                      دستگاهی یافت نشد
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                devices.map((device) => (
                  <TableRow key={device.name} hover>
                    <TableCell>{device.device_model || "-"}</TableCell>{" "}
                    <TableCell>{device.serial_number || "-"}</TableCell>
                    <TableCell>
                      <Chip
                        label={device.status || "نامشخص"}
                        color={getStatusColor(device.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {device.first_name || device.last_name
                        ? `${device.first_name ?? ""} ${device.last_name ?? ""}`.trim()
                        : "-"}
                    </TableCell>{" "}
                    <TableCell>{device.national__id || "-"}</TableCell>
                    <TableCell>{device.terminal || "-"}</TableCell>
                    <TableCell align="center">
                      {device.status === "فاکتور شده" && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenAssignDialog(device)}
                        >
                          تخصیص
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination ثابت در پایین */}
        {totalPages > 0 && (
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Paper>

      {/* دیالوگ تخصیص دستگاه */}
      <Dialog
        open={assignDialogOpen}
        onClose={handleCloseAssignDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>تخصیص دستگاه</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="کد ملی"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="شماره موبایل"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog} disabled={assignLoading}>
            انصراف
          </Button>
          <Button
            onClick={handleAssignDevice}
            variant="contained"
            disabled={assignLoading}
          >
            {assignLoading ? <CircularProgress size={24} /> : "تخصیص"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Devices;
