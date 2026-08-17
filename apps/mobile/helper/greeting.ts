const getGreeting = (language = 'id') => {
  const hour = new Date().getHours();

  if (language === 'en') {
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon';
    } else if (hour >= 18 && hour < 22) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  } else {
    if (hour >= 5 && hour < 10) {
      return 'Selamat pagi';
    } else if (hour >= 10 && hour < 15) {
      return 'Selamat siang';
    } else if (hour >= 15 && hour < 18) {
      return 'Selamat sore';
    } else {
      return 'Selamat malam';
    }
  }
};

export default getGreeting;
