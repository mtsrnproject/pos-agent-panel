// src/components/invoices/AssignDeviceModal.jsx
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

export default function AssignDeviceModal({
  open,
  device,
  onClose,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    nationalId: "",
    mobile: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (device?.name) {
      onSubmit(device.name, formData);
      setFormData({ nationalId: "", mobile: "", firstName: "", lastName: "" });
    }
  };

  const handleClose = () => {
    setFormData({ nationalId: "", mobile: "", firstName: "", lastName: "" });
    onClose();
  };

  if (!device) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>تخصیص دستگاه به مشتری</DialogTitle>
        <DialogContent>
          <Box mb={2} mt={1}>
            <Typography variant="body2" color="text.secondary">
              سریال انتخابی:
            </Typography>
            <Typography variant="h6" fontFamily="monospace" fontWeight="bold">
              {device.serial_number}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="نام"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            disabled={loading}
          />

          <TextField
            fullWidth
            label="نام خانوادگی"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            disabled={loading}
          />

          <TextField
            fullWidth
            label="کد ملی پذیرنده"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading}
            inputProps={{ maxLength: 10 }}
          />

          <TextField
            fullWidth
            label="شماره موبایل"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading}
            inputProps={{ maxLength: 11 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            انصراف
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "در حال ثبت..." : "تایید و تخصیص"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
