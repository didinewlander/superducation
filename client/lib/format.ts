export function formatPrice(price: number) {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'NIs',
    }).format(price)
  }
  