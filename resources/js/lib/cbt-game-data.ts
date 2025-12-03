export type Choice = {
  id: string;
  text: string;
  type: 'healthy' | 'unhealthy' | 'neutral';
  feedback: string;
  healthChange: number;
  scoreChange: number;
};

export type Monster = {
  name: string;
  image: string;
  description: string;
  negativeThoughtType: string;
};

export type Level = {
  id: number;
  monster: Monster;
  introDialogue: string;
  playerThought: string;
  choices: Choice[];
  background: string;
};

export const GAME_ASSETS = {
  background: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/fantasy-rpg-landscape-background-mystica-ce53bb6a-20251119104446.jpg",
  monsters: {
    shadow: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/shadowy-monster-representing-negative-th-7ff40395-20251119104446.jpg",
    ice: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/ice-golem-monster-representing-despair-b-17b64d48-20251119104446.jpg",
    fog: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/a-misty-swirling-dark-fog-phantom-monste-783273e9-20251119105126.jpg",
    chain: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/a-heavy-stone-golem-monster-wrapped-in-h-857e59d2-20251119105126.jpg"
  }
};

export const LEVELS: Level[] = [
  {
    id: 1,
    monster: {
      name: "Bayangan Keputusasaan",
      image: GAME_ASSETS.monsters.shadow,
      description: "Massa asap gelap yang berputar-putar dan membisikkan kata-kata yang mematahkan semangat.",
      negativeThoughtType: "Memperburuk Keadaan (Catastrophizing)"
    },
    introDialogue: "Kamu menemui bayangan gelap yang menghalangi jalanmu. Ia menjulang di atasmu, membuat segalanya tampak mustahil.",
    playerThought: "Aku tidak akan pernah bisa menyelesaikan proyek ini. Semua orang akan menganggapku gagal dan aku akan kehilangan pekerjaanku.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Terima pikiran itu sebagai kebenaran dan menyerah.", type: "unhealthy", feedback: "Bayangan itu membesar dan menelan jalan di depan. Dada terasa berat dan langkahmu berhenti. Menyerah membuat pikiran negatif semakin kuat dan kesempatan kecil yang mungkin ada pun hilang.", healthChange: -20, scoreChange: 0 },
      { id: "c2", text: "Katakan pada dirimu: 'Berhenti memikirkannya!' dan coba abaikan.", type: "neutral", feedback: "Bayangan itu sempat memudar lalu kembali menekan dari segala arah. Mengusir pikiran tanpa memprosesnya hanya menunda kecemasan—ia muncul lagi lebih kuat saat kamu lelah.", healthChange: -5, scoreChange: 5 },
      { id: "c3", text: "Tantang pikiran itu: 'Aku pernah menangani proyek sulit sebelumnya. Aku bisa memecahnya menjadi langkah-langkah kecil.'", type: "healthy", feedback: "Bayangan menyusut ketika kamu memecah tugas menjadi langkah-langkah kecil. Kamu menuliskan langkah pertama yang realistis, menandai kemajuan, dan perspektifmu jernih kembali.", healthChange: 20, scoreChange: 50 }
    ]
  },
  {
    id: 2,
    monster: {
      name: "Golem Es Perfeksionis",
      image: GAME_ASSETS.monsters.ice,
      description: "Makhluk tajam yang terbuat dari es dingin, membekukan kepercayaan dirimu.",
      negativeThoughtType: "Pikiran Hitam-Putih (All-or-Nothing Thinking)"
    },
    introDialogue: "Angin dingin bertiup saat Golem melangkah maju. Ia menuntut kesempurnaan atau tidak sama sekali.",
    playerThought: "Jika aku membuat satu kesalahan dalam ujian ini, aku benar-benar bodoh dan tidak berharga.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Setuju dengan Golem. Kesempurnaan adalah satu-satunya hasil yang dapat diterima.", type: "unhealthy", feedback: "Hawa dingin menusuk hingga membuat gerakmu kaku. Standar mustahil membekukan keberanian dan setiap kekeliruan terasa seperti bencana.", healthChange: -25, scoreChange: 0 },
      { id: "c2", text: "Ingatkan diri: 'Kesalahan adalah bagian dari belajar. Satu kesalahan tidak menentukan harga diriku.'", type: "healthy", feedback: "Es mulai retak saat kamu mengakui ruang abu-abu. Kamu menuliskan hal yang sudah benar, memberi ruang untuk belajar, dan hangat kepercayaan diri perlahan kembali.", healthChange: 25, scoreChange: 60 },
      { id: "c3", text: "Salahkan guru karena membuat ujian terlalu sulit.", type: "neutral", feedback: "Golem tetap tak bergeming. Menyalahkan pihak luar tidak mengubah keyakinanmu—kamu tetap berdiri di tempat sementara rasa cemas tidak berkurang.", healthChange: -10, scoreChange: 10 }
    ]
  },
  {
    id: 3,
    monster: {
      name: "Kabut Ketidakpastian",
      image: GAME_ASSETS.monsters.fog,
      description: "Kabut tebal yang membingungkan dan menyembunyikan jalan ke depan.",
      negativeThoughtType: "Meramal Nasib Buruk (Fortune Telling)"
    },
    introDialogue: "Kabut tebal mengelilingimu, membuatmu sulit melihat jalan ke depan. Bisikan-bisikan cemas memenuhi udara.",
    playerThought: "Bagaimana jika aku membuat keputusan yang salah? Semuanya akan hancur dan aku tidak akan pernah bahagia.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Hindari membuat keputusan sama sekali dan bersembunyi di dalam kabut.", type: "unhealthy", feedback: "Kabut menebal dan jarak pandang menghilang. Menghindari keputusan membuatmu terjebak; peluang kecil berlalu tanpa kamu sadari.", healthChange: -20, scoreChange: 0 },
      { id: "c2", text: "Coba alihkan perhatian dengan bermain ponsel untuk melupakan masalah.", type: "neutral", feedback: "Pengalihan memberi jeda singkat, tetapi kabut kembali menyelimuti. Masalah asli tetap menunggu saat notifikasi berhenti.", healthChange: -5, scoreChange: 5 },
      { id: "c3", text: "Tantang pikiran: 'Aku tak bisa memprediksi masa depan, tapi aku bisa hadapi apa pun yang terjadi. Salah itu wajar.'", type: "healthy", feedback: "Kabut menipis ketika kamu menerima ketidakpastian. Kamu memilih satu langkah kecil, menyiapkan rencana cadangan, dan percaya bahwa dirimu mampu menghadapi hasil apa pun.", healthChange: 20, scoreChange: 70 }
    ]
  },
  {
    id: 4,
    monster: {
      name: "Raksasa Rantai Penyesalan",
      image: GAME_ASSETS.monsters.chain,
      description: "Raksasa batu yang dililit rantai berat, setiap rantai mewakili kesalahan masa lalu.",
      negativeThoughtType: "Pelabelan Diri (Self-Labeling)"
    },
    introDialogue: "Setiap langkah Raksasa ini mengguncang tanah. Ia menunjukmu dengan tuduhan atas masa lalumu.",
    playerThought: "Aku seharusnya tahu lebih baik dulu. Aku orang jahat karena kesalahan itu.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Hukum diri sendiri dan percaya bahwa kamu tidak pantas bahagia.", type: "unhealthy", feedback: "Rantai bertambah berat dan setiap langkah terasa mustahil. Menghukum diri membuat luka lama membuka kembali dan mengikatmu pada label yang tidak adil.", healthChange: -30, scoreChange: 0 },
      { id: "c2", text: "Berjanji untuk menjadi sempurna mulai sekarang.", type: "neutral", feedback: "Janji untuk menjadi sempurna menambah satu rantai baru bernama 'sempurna'. Target yang tak realistis berubah menjadi sumber kekecewaan berikutnya.", healthChange: -10, scoreChange: 10 },
      { id: "c3", text: "Ubah perspektif: 'Aku melakukan yang terbaik saat itu. Aku sudah belajar dan tumbuh dari pengalaman itu.'", type: "healthy", feedback: "Rantai-rantai itu pecah saat kamu memberi diri sendiri pengampunan. Kamu mengakui pelajaran yang didapat, memperbaiki langkah, dan bergerak tanpa beban.", healthChange: 30, scoreChange: 80 }
    ]
  }
];

export type Avatar = {
  id: string;
  name: string;
  class: 'Ksatria' | 'Penyihir' | 'Penyembuh';
  image: string;
};

export const AVATARS: Avatar[] = [
  { id: 'a1', name: 'Ksatria Ketangguhan', class: 'Ksatria', image: 'Sword' },
  { id: 'a2', name: 'Orang Bijak', class: 'Penyihir', image: 'Sparkles' },
  { id: 'a3', name: 'Penjaga Ketenangan', class: 'Penyembuh', image: 'Heart' },
];
