const calculateDelta = (selectedDistance: number) => {
  // Seçilen mesafeye göre enlem ve boylam delta değerleri
  const delta = selectedDistance / 111.12; // 1 derece = 111.12 km (ortalama)
  return delta;
};

export default calculateDelta;
