## Tujuan
- Menyambungkan halaman `/leaderboard` ke database Supabase untuk menampilkan leaderboard asli (nickname + Total EXP bulanan), disortir menurun.
- Memungkinkan user mengatur “Status” via ikon yang dapat diklik; tersimpan di DB dan terlihat oleh user lain.
- Menampilkan tren (naik/turun peringkat dan selisih posisi).
- Mengganti indikator waktu dari "5 days left" menjadi sisa hari dalam bulan ini dan menyiapkan reset bulanan (nilai EXP bulanan kembali 0 secara perhitungan).

## Lokasi Kode
- Komponen utama: `resources/js/pages/leaderboard/index.tsx` (saat ini memakai data dummy). 
- Rute: `routes/web.php` → `leaderboard()` sudah ada.
- Sumber data EXP yang sudah digunakan di app:
  - `xp_events` (mis. penyelesaian level): `resources/js/pages/mentoring/levels/*.tsx` 
  - `user_xp_events` (mis. mood / tugas harian): `resources/js/pages/dashboard.tsx:296,317`

## Skema Database (Supabase)
- Tabel sudah ada:
  - `xp_events(user_id uuid, points int, type text, created_at timestamptz)`
  - `user_xp_events(user_id uuid, amount int, source text, occurred_at timestamptz, created_at timestamptz)`
- Tabel baru (dibuat bila belum ada):
  - `leaderboard_status(user_id uuid primary key references auth.users, status text not null, updated_at timestamptz not null default now())`
  - `leaderboard_rank_snapshot(user_id uuid primary key, month date not null, last_rank int not null, updated_at timestamptz not null default now())`
- View/Fungsi (opsional, untuk efisiensi satu query):
  - `monthly_user_exp(user_id, total_exp)`
    - total_exp = sum(`xp_events.points`) + sum(`user_xp_events.amount`) dalam rentang bulan berjalan.
  - Atau gunakan 2 query dan gabung di client (lebih sederhana tanpa fungsi DB).

## Fetch & Sorting
- Di `leaderboard/index.tsx`:
  - Ambil data nickname user (pakai nama dari app atau tabel profil Supabase bila ada). Bila belum ada profil di Supabase, gunakan `page.props.auth.user.name` sebagai fallback.
  - Ambil EXP bulanan:
    - Query ke `xp_events` untuk bulan ini.
    - Query ke `user_xp_events` untuk bulan ini.
    - Gabungkan per `user_id` dan hitung `totalExp`.
  - Ambil `status` dari `leaderboard_status` (left join ke hasil ranking).
  - Urutkan menurun berdasarkan `totalExp`.
  - Hitung rank (index + 1) setelah sorting.

## Set Status
- Pada grid “Set Your Status” di `leaderboard/index.tsx`:
  - Saat klik ikon, simpan ke `leaderboard_status` (`upsert { user_id, status }`).
  - Setelah sukses, re-fetch leaderboard agar status terlihat untuk semua.
  - Gunakan key status berbasis string sederhana (mis. `sparkles`, `flame`, `moon`, dst.) yang dipetakan ke ikon existing (`statusIcons`).

## Trend (Delta Peringkat)
- Ambil `last_rank` dari `leaderboard_rank_snapshot` untuk user di bulan berjalan (baris dibuat/update saat user memuat halaman atau saat kita menyimpan snapshot terbaru).
- Tampilkan delta: `trend = last_rank - current_rank` 
  - Positif → naik (tanda panah naik, +nilai)
  - Negatif → turun (tanda panah turun, nilai absolut)
- Setelah menghitung, perbarui snapshot untuk user saat ini agar delta akurat di kunjungan berikutnya.
- Untuk konsistensi global, kita dapat memperbarui snapshot semua user saat re-render; namun MVP: update snapshot untuk user yang sedang online/berinteraksi.

## Sisa Waktu Bulan
- Hitung `daysLeft = endOfMonth(today) - today` 
- Ganti label “5 days left” menjadi `"{daysLeft} days left"`.
- Reset bulanan: karena leaderboard dihitung dari event bulan berjalan, nilai akan “ter-reset” otomatis ke 0 di awal bulan (tanpa perlu mutasi massal). Jika ingin hard reset, siapkan job terjadwal, tapi MVP cukup filter periode bulan berjalan.

## Realtime Update (opsional)
- Berlangganan Supabase Realtime pada `xp_events` dan `user_xp_events` untuk INSERT.
- Saat ada event baru, trigger re-fetch & re-sort; trend akan menyesuaikan.

## Implementasi UI (tanpa mengubah gaya existing)
- Pertahankan tampilan tabel, header, ikon, grid status yang sudah ada; hanya mengganti sumber data ke hasil fetch dan menambahkan interaksi klik status.
- Tambahkan badge kecil untuk trend (↑/↓ dan angka delta) di kolom rank atau kolom terpisah.
- Perbarui label waktu di header leaderboard dengan `daysLeft`.

## Validasi
- Jalankan fetch ketika halaman mount; test dengan data dummy + event insert.
- Cek urutan setelah menambah XP untuk user; pastikan rank & trend berubah.
- Cek set status: ikon di baris user berubah dan terlihat setelah refresh untuk akun lain.

## Catatan Keamanan
- Gunakan RLS Supabase yang memperbolehkan SELECT agregat ranking public; 
- UPDATE/UPSERT ke `leaderboard_status` hanya untuk baris milik `auth.uid()`.

Setelah kamu konfirmasi, saya akan:
1) Membuat tabel/SQL yang diperlukan (jika belum ada) di Supabase.
2) Mengimplementasikan fetch, sorting, status update, trend, dan label sisa hari di `resources/js/pages/leaderboard/index.tsx`.
3) Menambahkan langganan realtime (opsional) agar ranking otomatis menyegarkan saat ada XP baru.