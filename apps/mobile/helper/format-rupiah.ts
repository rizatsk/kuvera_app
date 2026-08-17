export const formatRupiah = (amount: number | string): string => {
  let numericAmount: number;
  if (typeof amount === 'string') {
    numericAmount = parseFloat(amount.replace(/[^0-9,-]/g, '').replace(',', '.'));
  } else {
    numericAmount = amount;
  }
  
  if (isNaN(numericAmount)) {
    return 'Rp ';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

export const cleanRupiahToNumber = (formattedText: string): number => {
    if (!formattedText) return 0;
    
    // 1. Hapus simbol "Rp"
    let cleanedText = formattedText.replace('Rp', '');
    
    // 2. Hapus titik pemisah ribuan (Locale Indonesia)
    cleanedText = cleanedText.replace(/\./g, ''); 
    
    // 3. Ganti koma desimal menjadi titik desimal (untuk parseFloat)
    cleanedText = cleanedText.replace(/,/g, '.'); 
    
    // 4. Konversi ke Float/Number
    return parseFloat(cleanedText) || 0;
};