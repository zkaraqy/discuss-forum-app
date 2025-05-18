export function formatDate(isoString) {
  const date = new Date(isoString);

  const DAYS_IN_INDONESIA = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];

  const MONTHS_IN_INDONESIA = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const dayName = DAYS_IN_INDONESIA[date.getDay()];
  const day = date.getDate();
  const month = MONTHS_IN_INDONESIA[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
}
