function closeOrBidIHSG(): 'Bid' | 'Close' {
  const now = new Date();

  const day = now.getDay(); // 0 = Minggu, 6 = Sabtu
  const todayAt16 = new Date(now);
  todayAt16.setHours(16, 0, 0, 0);

  const tomorrowAt9 = new Date(now);
  tomorrowAt9.setDate(now.getDate() + 1);
  tomorrowAt9.setHours(9, 0, 0, 0);

  // Kalau hari Sabtu (6) atau Minggu (0)
  if (day === 6 || day === 0) {
    return 'Close';
  }

  // Untuk hari kerja (Senin–Jumat)
  if (now < todayAt16) {
    return 'Bid';
  } else {
    // Sudah lewat jam 16:00 → TTL sampai besok jam 09:00
    return 'Close';
  }
};

export default closeOrBidIHSG;