export const mockUsers = [
  { 
    id: 'U001', 
    email: 'admin@epad.go.id', 
    password: 'admin123', 
    role: 'admin', 
    nama: 'Budi Santoso, S.E.', 
    nip: '198501012010011002',
    jabatan: 'Kepala Bidang Pendapatan'
  },
  { 
    id: 'U002', 
    email: 'petugas@epad.go.id', 
    password: 'petugas123', 
    role: 'lapangan', 
    nama: 'Agus Hermawan', 
    wilayah: 'Kecamatan Tengah' 
  },
  { 
    id: 'U003', 
    email: 'kasir@epad.go.id', 
    password: 'kasir123', 
    role: 'kasir', 
    nama: 'Siti Aminah' 
  },
  { 
    id: 'WP001', 
    email: 'wp@epad.go.id', 
    password: 'wp123', 
    role: 'wp', 
    nama: 'PT. Maju Mundur Sejahtera', 
    npwpd: 'P.2.0001234.05.01' 
  },
];

export const mockStats = {
  totalPAD: 154750000000,
  targetPAD: 200000000000,
  presentase: 77.3,
  perJenisPajak: [
    { jenis: 'Pajak Hotel', realisasi: 45000000000, target: 50000000000 },
    { jenis: 'Pajak Restoran', realisasi: 32000000000, target: 40000000000 },
    { jenis: 'Pajak Hiburan', realisasi: 12000000000, target: 20000000000 },
    { jenis: 'PBB-P2', realisasi: 65750000000, target: 90000000000 },
  ]
};

export const mockWajibPajak = [
  { id: 'WP001', nama: 'PT. Maju Mundur Sejahtera', npwpd: 'P.2.0001234.05.01', alamat: 'Jl. Protokol No. 10, Kota Madya', status: 'aktif' },
  { id: 'WP002', nama: 'Hotel Grand Mentari', npwpd: 'H.1.0005678.02.01', alamat: 'Jl. Pariwisata KM 5', status: 'aktif' },
  { id: 'WP003', nama: 'Restoran Rasa Sayang', npwpd: 'R.1.0009999.01.01', alamat: 'Pasar Seni Blok A', status: 'non_aktif' },
  { id: 'WP004', nama: 'Caffe Kopi Senja', npwpd: 'R.1.0001111.03.01', alamat: 'Jl. Melati No. 45', status: 'aktif' },
  { id: 'WP005', nama: 'Wisma Bahagia', npwpd: 'H.1.0002222.04.01', alamat: 'Jl. Mawar No. 12', status: 'aktif' },
  { id: 'WP006', nama: 'Toko Kelontong Berkah', npwpd: 'T.1.0003333.05.01', alamat: 'Jl. Kenanga No. 8', status: 'aktif' },
  { id: 'WP007', nama: 'Bengkel Maju Jaya', npwpd: 'B.1.0004444.06.01', alamat: 'Jl. Anggrek No. 22', status: 'aktif' },
  { id: 'WP008', nama: 'Apotek Sehat', npwpd: 'A.1.0005555.07.01', alamat: 'Jl. Teratai No. 15', status: 'aktif' },
];

export const mockKetetapan = [
  { id: 'K001', wpId: 'WP001', jenisPajak: 'Pajak Restoran', masaPajak: 'April', tahunPajak: 2026, jumlahPajak: 1250000, denda: 0, jatuhTempo: '2026-05-20', status: 'piutang' },
  { id: 'K002', wpId: 'WP001', jenisPajak: 'PBB-P2', masaPajak: 'Tahunan', tahunPajak: 2026, jumlahPajak: 1290000, denda: 25000, jatuhTempo: '2026-04-30', status: 'piutang' },
  { id: 'K003', wpId: 'WP001', jenisPajak: 'Pajak Air Tanah', masaPajak: 'Maret', tahunPajak: 2026, jumlahPajak: 450000, denda: 0, jatuhTempo: '2026-05-15', status: 'piutang' },
  { id: 'K004', wpId: 'WP002', jenisPajak: 'Pajak Hotel', masaPajak: 'April', tahunPajak: 2026, jumlahPajak: 8500000, denda: 0, jatuhTempo: '2026-05-10', status: 'piutang' },
  { id: 'K005', wpId: 'WP002', jenisPajak: 'Pajak Restoran', masaPajak: 'April', tahunPajak: 2026, jumlahPajak: 2100000, denda: 0, jatuhTempo: '2026-05-10', status: 'piutang' },
  { id: 'K006', wpId: 'WP004', jenisPajak: 'Pajak Restoran', masaPajak: 'April', tahunPajak: 2026, jumlahPajak: 750000, denda: 0, jatuhTempo: '2026-05-25', status: 'piutang' },
  { id: 'K007', wpId: 'WP001', jenisPajak: 'Pajak Reklame', masaPajak: 'Mei', tahunPajak: 2026, jumlahPajak: 3500000, denda: 0, jatuhTempo: '2026-06-15', status: 'piutang' },
];

export const mockPembayaran = [
  { id: 'P001', wpId: 'WP001', nomorSspd: 'SSPD-2026-0001', jenisPajak: 'Pajak Hotel', jumlahBayar: 4500000, tanggalBayar: '2026-03-15' },
  { id: 'P002', wpId: 'WP001', nomorSspd: 'SSPD-2026-0012', jenisPajak: 'Pajak Restoran', jumlahBayar: 1100000, tanggalBayar: '2026-02-10' },
  { id: 'P003', wpId: 'WP002', nomorSspd: 'SSPD-2026-0045', jenisPajak: 'Pajak Hotel', jumlahBayar: 7800000, tanggalBayar: '2026-04-05' },
  { id: 'P004', wpId: 'WP001', nomorSspd: 'SSPD-2026-0089', jenisPajak: 'Pajak Penerangan Jalan', jumlahBayar: 225000, tanggalBayar: '2026-04-20' },
  { id: 'P005', wpId: 'WP004', nomorSspd: 'SSPD-2026-0102', jenisPajak: 'Pajak Restoran', jumlahBayar: 950000, tanggalBayar: '2026-03-28' },
  { id: 'P006', wpId: 'WP001', nomorSspd: 'SSPD-2026-0115', jenisPajak: 'Pajak Restoran', jumlahBayar: 1350000, tanggalBayar: '2026-01-15' },
  { id: 'P007', wpId: 'WP002', nomorSspd: 'SSPD-2026-0140', jenisPajak: 'Pajak Restoran', jumlahBayar: 1850000, tanggalBayar: '2026-03-01' },
  { id: 'P008', wpId: 'WP005', nomorSspd: 'SSPD-2026-0165', jenisPajak: 'Pajak Hotel', jumlahBayar: 3200000, tanggalBayar: '2026-04-12' },
];
