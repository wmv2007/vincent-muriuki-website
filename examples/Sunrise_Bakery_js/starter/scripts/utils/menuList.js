 export const menuList = [
  {
    id: '01',
    Image: '../assets/bread.svg',
    name: 'Artisan Bread',
    description: 'Fresh handmade bread with a golden crust.',
    priceCents: '18000'
  },

  {
    id: '02',
    Image: '../assets/cake.svg',
    name: 'Celebration Cake',
    description: 'Custom cakes for birthdays and special occasions.',
    priceCents: '150000'
  },

  {
    id: '03',
    Image: '../assets/pastry.svg',
    name: 'Fresh Pastries',
    description: 'Buttery, flaky pastries baked throughout the day.',
    priceCents: '12000'
  }
]

export default menuList;

export function getMenuId(menuId) {
  let productId;

  menuList.forEach((menu) => {
    if (menu.id === menuId) {
      productId = menu
    }
  });

  return productId;

}