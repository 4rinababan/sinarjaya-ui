// src/components/LoginForm.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authService } from "../../api/authService";
import { useApi } from "../../api/useApi";
import Header from "../../components/ui/Header";
import { useNavigate } from "react-router-dom"; // <- untuk redirect
import { saveToken, getUserFromToken } from "../../utils/storage";

const LoginPage = () => {
  const { apiRequest } = useApi();
  const [rawPhone, setRawPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // hook navigate
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{9,13}$/;
    const phoneNumber = phone.replace(/^(\+62|0)/, "");
    if (!phoneNumber.match(phoneRegex))
      newErrors.phone = "Nomor telepon tidak valid";
    if (!password) newErrors.password = "Password harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // hapus non angka
    setRawPhone(inputValue);

    let normalized = inputValue;

    if (normalized.startsWith("08")) {
      normalized = "62" + normalized.slice(1); // ganti 0 jadi 62
    }

    setPhone(normalized);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");
    try {
      // const res = await authService.login({ phone, password });
      const res = await apiRequest(() =>
        authService.login({ phone, password })
      );
      if (res.error) {
        setServerError(res.error);
        return;
      }

      // Jika login sukses
      if (res.token) {
        saveToken(res.token);

        const userData = getUserFromToken();
        if (userData?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/homepage");
        }
      }
    } catch (err) {
      // console.error("Network/Server Error:", err);
      setServerError("Login Gagal : Password / no Hp salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 10,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" mb={3} align="center" fontWeight={600}>
          Login
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <TextField
          label="No. HP"
          placeholder="08xxxx"
          fullWidth
          margin="normal"
          value={rawPhone}
          onChange={handlePhoneChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
          onClick={() => navigate("/homepage")} // langsung redirect
        >
          Login sebagai Tamu
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
