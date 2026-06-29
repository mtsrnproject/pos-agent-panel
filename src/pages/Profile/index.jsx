import { MainLayout } from "../../components/layout";
import { Typography } from "@mui/material";

const Profile = () => {
  return (
    <MainLayout>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        پروفایل کاربری
      </Typography>
      <Typography color="text.secondary">در حال توسعه...</Typography>
    </MainLayout>
  );
};

export default Profile;
