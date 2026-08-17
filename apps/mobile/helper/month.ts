export const getMonthData = (monthIndex: number, language: 'id' | 'en' = 'id') => {
    const monthNames = {
        id: [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ],
        en: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    };

    const names = monthNames[language] || monthNames['id'];

    return names[monthIndex];
};

export const getThisMonth = () => {
    const thisMonthNumber = new Date().getMonth();
    return getMonthData(thisMonthNumber, 'en');
};
