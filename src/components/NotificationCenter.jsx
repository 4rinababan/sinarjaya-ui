import React, { useEffect, useState } from "react";
import { getSavedUser, getUserFromToken } from "../utils/storage";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Badge,
  Chip,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../api/notificationService";

// ✅ Format waktu
const timeAgo = (date) => {
  if (!date) return "-";
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`;
  return new Date(date).toLocaleDateString("id-ID");
};

// ✅ Tab kategori filter
const categories = [
  { label: "Semua", value: "all" },
  { label: "Belum Dibaca", value: "new" },
  { label: "Sudah Dibaca", value: "read" },
];

const NotificationPage = () => {
  const [notifList, setNotifList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const user = getSavedUser();
  const decoded = getUserFromToken();

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  // ✅ Ambil notifikasi dari API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const userId = user?.id || decoded?.id;
      const response = await notificationService.getNotification(userId);

      // Pastikan format response sesuai
      if (response?.status === 200 && Array.isArray(response.data)) {
        setNotifList(response.data);
      } else {
        setNotifList([]);
      }
    } catch (error) {
      setNotifList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (id, isRead) => {
    if (isRead) return; // ✅ Jika sudah dibaca, abaikan

    setNotifList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    try {
      await notificationService.markAsRead(id);
    } catch (error) {
      // Rollback jika gagal
      setNotifList((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      );
    }
  };

  // ✅ Hitung notifikasi belum dibaca
  const unreadCount = notifList.filter((n) => !n.read).length;

  // ✅ Filter berdasarkan tab
  const filteredList = notifList.filter((n) => {
    if (filter === "new" && n.read) return false;
    if (filter === "read" && !n.read) return false;
    return true;
  });

  // ✅ Chip kategori status order
  const getTypeChip = (message) => {
    if (!message) return <Chip label="Umum" size="small" />;

    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("pesanan dibuat")) {
      return (
        <Chip
          label="Menunggu Konfirmasi"
          size="small"
          sx={{ bgcolor: "#FFF4E5", color: "#FF9800", fontWeight: 600 }}
        />
      );
    }

    if (lowerMsg.includes("diproses")) {
      return (
        <Chip
          label="Order Diproses"
          size="small"
          sx={{ bgcolor: "#E3F2FD", color: "#1976d2", fontWeight: 600 }}
        />
      );
    }

    if (lowerMsg.includes("selesai")) {
      return (
        <Chip
          label="Order Selesai"
          size="small"
          sx={{ bgcolor: "#E8F5E9", color: "#388E3C", fontWeight: 600 }}
        />
      );
    }

    if (lowerMsg.includes("dibatalkan")) {
      return (
        <Chip
          label="Order Dibatalkan"
          size="small"
          sx={{ bgcolor: "#FFEBEE", color: "#D32F2F", fontWeight: 600 }}
        />
      );
    }

    return <Chip label="Umum" size="small" />;
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>Memuat notifikasi...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ px: { xs: 2 }, pt: 3, maxWidth: 500, mx: "auto", width: "100%" }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
        <Button
          variant="text"
          onClick={() => navigate("/homepage")}
          sx={{ minWidth: "auto", p: 0 }}
        >
          <ArrowBackIcon color="action" />
        </Button>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon fontSize="large" color="primary" />
        </Badge>
        <Typography variant="h6" fontWeight={700}>
          Notifikasi
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Tabs Filter */}
      <Tabs
        value={filter}
        onChange={(e, val) => setFilter(val)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ mb: 2 }}
      >
        {categories.map((cat) => (
          <Tab key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Tabs>

      {/* Jika kosong */}
      {filteredList.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Tidak ada notifikasi ditemukan.
        </Typography>
      )}

      {/* List Notifikasi */}
      {filteredList.map((notif) => (
        <Accordion
          key={notif.id}
          onChange={() => handleClick(notif.id, notif.read)}
          sx={{
            backgroundColor: notif.read ? "#fff" : "#e3f2fd",
            borderRadius: 2,
            boxShadow: notif.read ? "none" : "0 2px 8px rgba(0,0,0,0.05)",
            mb: 1.5,
            px: 1,
            "& .MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: 64,
              "&.Mui-expanded": { minHeight: 64 },
              "& .MuiAccordionSummary-content": {
                margin: 0,
                alignItems: "center",
              },
              px: 0,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ width: "100%" }}
            >
              <Avatar
                sx={{
                  backgroundColor: notif.read ? "#fff" : "#f5faff", // soft blue
                  borderRadius: 2,
                  mb: 1.5,
                  boxShadow: notif.read ? "none" : "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                <NotificationsIcon
                  sx={{ color: notif.read ? "#757575" : "#1976d2" }}
                />
              </Avatar>

              <Box flexGrow={1}>
                <Typography fontWeight={notif.read ? 400 : 700} fontSize={15}>
                  {notif.order?.order_code}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 0.5 }}
                >
                  <Chip label={notif.read ? "Dibaca" : "Baru"} size="small" />
                  {getTypeChip(notif.message)}
                  <Typography variant="caption" color="text.secondary">
                    {timeAgo(notif.created_at)}
                  </Typography>
                </Stack>
              </Box>
              {!notif.read && (
                <IconButton size="small" onClick={() => handleClick(notif.id)}>
                  <DoneAllIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </AccordionSummary>

          {/* Detail Notifikasi */}
          <AccordionDetails>
            <Typography variant="body2">
              <b>Order ID:</b> {notif.order?.order_code || "-"} <br />
              <b>Produk:</b> {notif.order?.product_name || "-"} <br />
              <b>Jumlah:</b> {notif.order?.quantity || "-"} <br />
              <b>Catatan:</b> {notif.order?.detail || "-"} <br />
            </Typography>

            <Box
              component="span"
              sx={{
                mt: 1,
                px: 2,
                py: 0.5,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                color: "primary.main",
                cursor: "pointer",
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                userSelect: "none",
              }}
              onClick={() => handleOpenDialog(notif.order)}
            >
              Lihat Detail
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Detail Pesanan</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography>
                <b>Kode Order:</b> {selectedOrder.order_code}
              </Typography>
              <Typography>
                <b>Produk:</b> {selectedOrder.product_name}
              </Typography>
              <Typography>
                <b>Jumlah:</b> {selectedOrder.quantity}
              </Typography>
              <Typography>
                <b>Status:</b> {selectedOrder.status}
              </Typography>
              <Typography>
                <b>Perusahaan:</b> {selectedOrder.company_name}
              </Typography>
              <Typography>
                <b>Nama Pemesan:</b> {selectedOrder.user_name}
              </Typography>
              <Typography>
                <b>Telepon:</b> {selectedOrder.user_phone}
              </Typography>
              <Typography>
                <b>Alamat:</b> {selectedOrder.address}
              </Typography>
              <Typography>
                <b>Catatan:</b> {selectedOrder.detail}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationPage;
