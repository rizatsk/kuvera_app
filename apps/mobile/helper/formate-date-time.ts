export function formatDateTime(dateObj: Date) {
    // Fungsi helper untuk menambah leading zero (0) jika angka < 10
    const pad = (num: number) => num.toString().padStart(2, '0');

    // --- Bagian Tanggal (DD-MM-YYYY) ---
    const day = pad(dateObj.getDate());
    // getMonth() mengembalikan nilai 0-11, jadi harus ditambah 1
    const month = pad(dateObj.getMonth() + 1); 
    const year = dateObj.getFullYear();

    // --- Bagian Jam (HH:mm:ss) ---
    const hours = pad(dateObj.getHours());
    const minutes = pad(dateObj.getMinutes());
    const seconds = pad(dateObj.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(dateObj: Date) {
    // Fungsi helper untuk menambah leading zero (0) jika angka < 10
    const pad = (num: number) => num.toString().padStart(2, '0');

    // --- Bagian Tanggal (DD-MM-YYYY) ---
    const day = pad(dateObj.getDate());
    // getMonth() mengembalikan nilai 0-11, jadi harus ditambah 1
    const month = pad(dateObj.getMonth() + 1); 
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
}

export function formatDateTimeVerbose(dateString: string): string { // Ditambahkan anotasi tipe kembali (: string)
    // --- Pengecekan Validitas ---
    const dateObj = new Date(dateString);

    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }

    // Array Nama Hari dan Bulan (dalam Bahasa Indonesia)
    const days: string[] = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des' // 'Sept' diubah menjadi 'Sep'
    ];

    // Fungsi helper untuk menambah leading zero (0)
    const pad = (num: number): string => num.toString().padStart(2, '0');

    // --- Bagian Tanggal & Hari ---
    const dayName: string = days[dateObj.getDay()]; // getDay() mengembalikan 0-6
    const date: string = pad(dateObj.getDate());
    const monthName: string = months[dateObj.getMonth()]; // getMonth() mengembalikan 0-11
    const year: number = dateObj.getFullYear();

    // --- Bagian Jam (HH:mm:ss) ---
    const hours: string = pad(dateObj.getHours());
    const minutes: string = pad(dateObj.getMinutes());

    // Menggabungkan semua bagian
    return `${dayName}, ${date} ${monthName} ${year} ${hours}:${minutes}`;
}

export function formatDateVerbose(dateString: string): string { // Ditambahkan anotasi tipe kembali (: string)
    // --- Pengecekan Validitas ---
    const dateObj = new Date(dateString);

    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }

    // Array Nama Hari dan Bulan (dalam Bahasa Indonesia)
    const days: string[] = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des' // 'Sept' diubah menjadi 'Sep'
    ];

    // Fungsi helper untuk menambah leading zero (0)
    const pad = (num: number): string => num.toString().padStart(2, '0');

    // --- Bagian Tanggal & Hari ---
    const dayName: string = days[dateObj.getDay()]; // getDay() mengembalikan 0-6
    const date: string = pad(dateObj.getDate());
    const monthName: string = months[dateObj.getMonth()]; // getMonth() mengembalikan 0-11
    const year: number = dateObj.getFullYear();


    // Menggabungkan semua bagian
    return `${dayName}, ${date} ${monthName} ${year}`;
}