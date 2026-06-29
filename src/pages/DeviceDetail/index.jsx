import { MainLayout } from "../../components/layout";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const DeviceDetail = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        جزئیات دستگاه {id}
      </Typography>
      <Typography color="text.secondary">در حال توسعه...</Typography>
    </MainLayout>
  );
};

export default DeviceDetail;
