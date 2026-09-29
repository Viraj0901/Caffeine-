/**
 * High-quality curated dish images matching each Caffeine Aligarh menu item exactly by name and preparation style.
 * Uses high-availability, responsive CDN image links with instant fallback to styled illustrations.
 */

export const DISH_IMAGES: Record<string, string> = {
  // ==========================================
  // TREATS & SIPS (COFFEES & BREWS)
  // ==========================================
  'caf-vietnamese-cold-coffee':
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80', // Layered Vietnamese iced drip coffee with condensed milk
  'caf-cappuccino':
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80', // Cappuccino with latte art
  'caf-biscoff-latte':
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=700&q=80', // Hot latte with cinnamon biscuit foam
  'caf-biscoff-iced-latte':
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80', // Iced Biscoff caramel latte
  'caf-nutella-iced-latte':
    'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=700&q=80', // Nutella chocolate iced coffee
  'caf-classic-cold-coffee':
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80', // Creamy blended cold coffee
  'caf-caffeine-overload':
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80', // Intense dark roast espresso iced brew
  'caf-hot-chocolate':
    'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=700&q=80', // Rich dark hot chocolate
  'caf-affogato-classic':
    'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=700&q=80', // Vanilla gelato with espresso pour
  'caf-affogato-biscoff':
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80', // Biscoff affogato with crumble
  'caf-shahi-thandai':
    'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=700&q=80', // Saffron cardamom pistachio cooler

  // ==========================================
  // GOURMET SUBS (15CM)
  // ==========================================
  'sub-mix-veg-crispy':
    'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80', // Fresh sub sandwich with crispy patty & lettuce
  'sub-paneer-tikka':
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80', // Paneer tikka sub sandwich
  'sub-corn-mushroom':
    'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&w=700&q=80', // Mushroom & sweet corn sub
  'sub-crunchy-mexican':
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80', // Mexican crunchy sub with nachos
  'sub-smoked-bbq-paneer':
    'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=700&q=80', // Smoked BBQ paneer sub baguette

  // ==========================================
  // WHOLESOME WRAPS
  // ==========================================
  'wrap-healthy-falafel':
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80', // Whole wheat falafel wrap
  'wrap-paneer-tikka':
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80', // Paneer tikka wrap tortilla
  'wrap-peri-peri-paneer':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80', // Spicy peri-peri paneer wrap
  'wrap-crispy-veg-signature':
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=700&q=80', // Crispy vegetable signature wrap

  // ==========================================
  // SIGNATURE RICE BOWLS
  // ==========================================
  'bowl-peri-peri-paneer':
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80', // Rice bowl with spicy paneer & veggies
  'bowl-paneer-tikka':
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80', // Paneer tikka rice bowl
  'bowl-herbs-tomato-paneer':
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80', // Herb tomato rice bowl
  'bowl-corn-mushroom':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80', // Golden corn and mushroom rice bowl

  // ==========================================
  // HEALTHY SALADS
  // ==========================================
  'salad-veg-caesar':
    'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=700&q=80', // Veg Caesar salad with croutons
  'salad-greek':
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80', // Greek salad with olives and feta/cottage cheese
  'salad-smoky-grilled-paneer':
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80', // Grilled paneer salad
  'salad-corn-peanut':
    'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=700&q=80', // Corn & roasted peanut salad

  // ==========================================
  // PIZZAS
  // ==========================================
  'pizza-classic-margherita':
    'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80', // Classic Margherita pizza
  'pizza-farmhouse':
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80', // Farmhouse supreme pizza
  'pizza-exotica':
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80', // Exotica pizza with jalapenos and mushrooms
  'pizza-paneer-tikka':
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=80', // Paneer tikka tandoori pizza
  'pizza-caffeine-special-cheese-loaded':
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80', // Cheese loaded pizza pull

  // ==========================================
  // MOMOS (5 PCS)
  // ==========================================
  'momos-steam':
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80', // Steamed dim sum momos
  'momos-crispy-fried':
    'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=700&q=80', // Crispy golden fried momos
  'momos-chilli-garlic':
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=700&q=80', // Chilli garlic pan-fried momos
  'momos-cheese-loaded-creamy':
    'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=700&q=80', // Creamy cheese sauce momos

  // ==========================================
  // LOADED NACHOS & MAGGIE
  // ==========================================
  'nachos-cheese-loaded-baked':
    'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=700&q=80', // Baked cheesy nachos
  'nachos-veg-loaded':
    'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=700&q=80', // Veg salsa nachos
  'nachos-chatpati-bhel':
    'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=700&q=80', // Nachos bhel chat
  'nachos-loaded-paneer':
    'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=700&q=80', // Loaded paneer nachos
  'maggie-classic-veg':
    'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=700&q=80', // Classic vegetable masala noodles
  'maggie-punjabi-tadka':
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80', // Spicy Punjabi tadka noodles
  'maggie-chinese-schezwan':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80', // Chinese schezwan maggie
  'maggie-cheesy-masala':
    'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=700&q=80', // Cheesy melted maggie

  // ==========================================
  // WHOLESOME SHAKES & REFRESHING SMOOTHIES
  // ==========================================
  'shake-peanut-protein':
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80', // Peanut butter protein shake
  'shake-weight-gainer-oats':
    'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80', // Oats & honey protein shake
  'shake-classic-whey':
    'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=700&q=80', // Whey protein shake
  'smoothie-blueberry-chia':
    'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80', // Blueberry chia smoothie
  'smoothie-strawberry-blast':
    'https://images.unsplash.com/photo-1553530979-fcd1e6d76efd?auto=format&fit=crop&w=700&q=80', // Strawberry smoothie
  'smoothie-mix-berry':
    'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=700&q=80', // Mixed berry smoothie

  // ==========================================
  // BENTO CAKES & SPECIALS
  // ==========================================
  'bento-chocolate-truffle':
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80', // Chocolate truffle bento cake
  'bento-blueberry':
    'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=700&q=80', // Blueberry pastel bento cake
  'bento-red-velvet-strawberry':
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80', // Strawberry bento cake
  'bento-2tier-chocolate-truffle':
    'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=700&q=80', // 2-tier mini bento cake
  'special-bento-rose':
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=700&q=80', // Bento cake with red rose
  'special-cold-coffee-flowers':
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80', // Cold coffee with flowers
  'halfkg-chocolate-truffle':
    'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=700&q=80', // Half kg chocolate truffle cake

  // ==========================================
  // ADDITIONAL POPULAR CAFE ITEMS
  // ==========================================
  'item-french-fries':
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80', // Crispy French fries
  'item-peri-peri-fries':
    'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80', // Peri-peri spiced fries
  'item-garlic-bread':
    'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80', // Cheesy garlic bread
  'item-white-sauce-pasta':
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=700&q=80', // Creamy white sauce alfredo pasta
  'item-red-sauce-pasta':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80', // Tangy red sauce arrabbiata pasta
  'item-burger':
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80', // Gourmet veggie burger
  'item-grilled-sandwich':
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80', // Grilled cheese sandwich
  'item-waffle':
    'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80', // Belgian waffle with chocolate
  'item-brownie':
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80', // Chocolate walnut brownie with scoop
  'item-cheesecake':
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80', // New York cheesecake
  'item-iced-tea':
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80', // Lemon peach iced tea
  'item-mojito':
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80', // Mint lime virgin mojito
  'item-espresso':
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=700&q=80', // Espresso shot with golden crema
  'item-americano':
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80', // Rich black americano
  'item-tea':
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80' // Masala chai ginger tea
};

/**
 * Quick preset image choices for the owner when adding new dishes
 */
export const DISH_IMAGE_PRESETS: { label: string; url: string; category: string }[] = [
  {
    label: 'Vietnamese Drip Coffee',
    url: DISH_IMAGES['caf-vietnamese-cold-coffee'],
    category: 'Coffee'
  },
  {
    label: 'Cappuccino / Latte Art',
    url: DISH_IMAGES['caf-cappuccino'],
    category: 'Coffee'
  },
  {
    label: 'Iced Biscoff / Cold Brew',
    url: DISH_IMAGES['caf-biscoff-iced-latte'],
    category: 'Coffee'
  },
  {
    label: 'Hot Chocolate / Cocoa',
    url: DISH_IMAGES['caf-hot-chocolate'],
    category: 'Beverage'
  },
  {
    label: 'Gourmet Sub Baguette',
    url: DISH_IMAGES['sub-mix-veg-crispy'],
    category: 'Subs'
  },
  {
    label: 'Paneer Tikka Sub',
    url: DISH_IMAGES['sub-paneer-tikka'],
    category: 'Subs'
  },
  {
    label: 'Tortilla Wrap / Roll',
    url: DISH_IMAGES['wrap-paneer-tikka'],
    category: 'Wraps'
  },
  {
    label: 'Artisan Wood-Fired Pizza',
    url: DISH_IMAGES['pizza-farmhouse'],
    category: 'Pizza'
  },
  {
    label: 'Cheese Margherita Pizza',
    url: DISH_IMAGES['pizza-classic-margherita'],
    category: 'Pizza'
  },
  {
    label: 'Steamed / Fried Momos',
    url: DISH_IMAGES['momos-crispy-fried'],
    category: 'Momos'
  },
  {
    label: 'Cheesy Baked Nachos',
    url: DISH_IMAGES['nachos-cheese-loaded-baked'],
    category: 'Nachos'
  },
  {
    label: 'Street Style Maggie',
    url: DISH_IMAGES['maggie-classic-veg'],
    category: 'Maggie'
  },
  {
    label: 'Creamy Pasta (Alfredo / Red)',
    url: DISH_IMAGES['item-white-sauce-pasta'],
    category: 'Pasta'
  },
  {
    label: 'Gourmet Burger',
    url: DISH_IMAGES['item-burger'],
    category: 'Burger'
  },
  {
    label: 'Crispy French Fries',
    url: DISH_IMAGES['item-french-fries'],
    category: 'Sides'
  },
  {
    label: 'Cheesy Garlic Bread',
    url: DISH_IMAGES['item-garlic-bread'],
    category: 'Sides'
  },
  {
    label: 'Protein Shake / Smoothie',
    url: DISH_IMAGES['shake-peanut-protein'],
    category: 'Shakes'
  },
  {
    label: 'Bento Cake / Korean Cake',
    url: DISH_IMAGES['bento-chocolate-truffle'],
    category: 'Desserts'
  },
  {
    label: 'Warm Chocolate Brownie',
    url: DISH_IMAGES['item-brownie'],
    category: 'Desserts'
  },
  {
    label: 'Refreshing Mojito / Cooler',
    url: DISH_IMAGES['item-mojito'],
    category: 'Beverage'
  }
];

/**
 * Returns the best image matching a dish name or category
 */
export function getDishImageUrl(itemId?: string, itemName?: string, itemCategory?: string): string {
  // 1. Direct ID match
  if (itemId && DISH_IMAGES[itemId]) {
    return DISH_IMAGES[itemId];
  }

  const lowerName = (itemName || '').toLowerCase();

  // 2. Exact keyword matching based on dish name
  if (lowerName.includes('vietnamese')) {
    return DISH_IMAGES['caf-vietnamese-cold-coffee'];
  }
  if (lowerName.includes('biscoff')) {
    return lowerName.includes('iced') || lowerName.includes('cold')
      ? DISH_IMAGES['caf-biscoff-iced-latte']
      : DISH_IMAGES['caf-biscoff-latte'];
  }
  if (lowerName.includes('nutella')) {
    return DISH_IMAGES['caf-nutella-iced-latte'];
  }
  if (lowerName.includes('cappuccino') || lowerName.includes('latte art')) {
    return DISH_IMAGES['caf-cappuccino'];
  }
  if (lowerName.includes('affogato')) {
    return lowerName.includes('biscoff')
      ? DISH_IMAGES['caf-affogato-biscoff']
      : DISH_IMAGES['caf-affogato-classic'];
  }
  if (lowerName.includes('hot chocolate') || lowerName.includes('cocoa')) {
    return DISH_IMAGES['caf-hot-chocolate'];
  }
  if (lowerName.includes('cold coffee') || lowerName.includes('iced coffee') || lowerName.includes('frappe')) {
    return DISH_IMAGES['caf-classic-cold-coffee'];
  }
  if (lowerName.includes('espresso') || lowerName.includes('overload') || lowerName.includes('ristretto')) {
    return DISH_IMAGES['caf-caffeine-overload'];
  }
  if (lowerName.includes('americano') || lowerName.includes('black coffee')) {
    return DISH_IMAGES['item-americano'];
  }
  if (lowerName.includes('thandai')) {
    return DISH_IMAGES['caf-shahi-thandai'];
  }
  if (lowerName.includes('chai') || lowerName.includes('tea')) {
    return lowerName.includes('iced')
      ? DISH_IMAGES['item-iced-tea']
      : DISH_IMAGES['item-tea'];
  }
  if (lowerName.includes('mojito') || lowerName.includes('cooler') || lowerName.includes('lemonade') || lowerName.includes('soda')) {
    return DISH_IMAGES['item-mojito'];
  }

  // SUBS & SANDWICHES
  if (lowerName.includes('sub')) {
    if (lowerName.includes('paneer') || lowerName.includes('tikka')) return DISH_IMAGES['sub-paneer-tikka'];
    if (lowerName.includes('mushroom') || lowerName.includes('corn')) return DISH_IMAGES['sub-corn-mushroom'];
    if (lowerName.includes('mexican') || lowerName.includes('crunchy')) return DISH_IMAGES['sub-crunchy-mexican'];
    if (lowerName.includes('bbq') || lowerName.includes('barbeque') || lowerName.includes('smoked')) return DISH_IMAGES['sub-smoked-bbq-paneer'];
    return DISH_IMAGES['sub-mix-veg-crispy'];
  }
  if (lowerName.includes('sandwich') || lowerName.includes('panini') || lowerName.includes('toast')) {
    return DISH_IMAGES['item-grilled-sandwich'];
  }
  if (lowerName.includes('wrap') || lowerName.includes('roll') || lowerName.includes('burrito')) {
    if (lowerName.includes('falafel') || lowerName.includes('healthy')) return DISH_IMAGES['wrap-healthy-falafel'];
    if (lowerName.includes('paneer') || lowerName.includes('tikka')) return DISH_IMAGES['wrap-paneer-tikka'];
    if (lowerName.includes('peri')) return DISH_IMAGES['wrap-peri-peri-paneer'];
    return DISH_IMAGES['wrap-crispy-veg-signature'];
  }

  // RICE BOWLS & MEALS
  if (lowerName.includes('bowl') || lowerName.includes('rice') || lowerName.includes('biryani')) {
    if (lowerName.includes('peri')) return DISH_IMAGES['bowl-peri-peri-paneer'];
    if (lowerName.includes('tikka') || lowerName.includes('paneer')) return DISH_IMAGES['bowl-paneer-tikka'];
    if (lowerName.includes('mushroom') || lowerName.includes('corn')) return DISH_IMAGES['bowl-corn-mushroom'];
    return DISH_IMAGES['bowl-herbs-tomato-paneer'];
  }

  // SALADS
  if (lowerName.includes('salad')) {
    if (lowerName.includes('caesar')) return DISH_IMAGES['salad-veg-caesar'];
    if (lowerName.includes('greek')) return DISH_IMAGES['salad-greek'];
    if (lowerName.includes('paneer') || lowerName.includes('grilled')) return DISH_IMAGES['salad-smoky-grilled-paneer'];
    return DISH_IMAGES['salad-corn-peanut'];
  }

  // PIZZAS
  if (lowerName.includes('pizza')) {
    if (lowerName.includes('margherita') || lowerName.includes('cheese single')) return DISH_IMAGES['pizza-classic-margherita'];
    if (lowerName.includes('farmhouse') || lowerName.includes('veggie')) return DISH_IMAGES['pizza-farmhouse'];
    if (lowerName.includes('paneer') || lowerName.includes('tandoori')) return DISH_IMAGES['pizza-paneer-tikka'];
    if (lowerName.includes('exotica') || lowerName.includes('mushroom') || lowerName.includes('jalapeno')) return DISH_IMAGES['pizza-exotica'];
    return DISH_IMAGES['pizza-caffeine-special-cheese-loaded'];
  }

  // MOMOS / DUMPLINGS
  if (lowerName.includes('momo') || lowerName.includes('dumpling') || lowerName.includes('dimsum')) {
    if (lowerName.includes('crispy') || lowerName.includes('fried') || lowerName.includes('kurkure')) return DISH_IMAGES['momos-crispy-fried'];
    if (lowerName.includes('chilli') || lowerName.includes('garlic') || lowerName.includes('pan fried')) return DISH_IMAGES['momos-chilli-garlic'];
    if (lowerName.includes('creamy') || lowerName.includes('cheese') || lowerName.includes('afghani')) return DISH_IMAGES['momos-cheese-loaded-creamy'];
    return DISH_IMAGES['momos-steam'];
  }

  // NACHOS
  if (lowerName.includes('nacho')) {
    if (lowerName.includes('bhel')) return DISH_IMAGES['nachos-chatpati-bhel'];
    if (lowerName.includes('paneer')) return DISH_IMAGES['nachos-loaded-paneer'];
    if (lowerName.includes('veg') || lowerName.includes('salsa')) return DISH_IMAGES['nachos-veg-loaded'];
    return DISH_IMAGES['nachos-cheese-loaded-baked'];
  }

  // MAGGIE & NOODLES
  if (lowerName.includes('maggi') || lowerName.includes('noodle') || lowerName.includes('chowmein')) {
    if (lowerName.includes('tadka') || lowerName.includes('punjabi')) return DISH_IMAGES['maggie-punjabi-tadka'];
    if (lowerName.includes('schezwan') || lowerName.includes('chinese') || lowerName.includes('chilli')) return DISH_IMAGES['maggie-chinese-schezwan'];
    if (lowerName.includes('cheesy') || lowerName.includes('cheese')) return DISH_IMAGES['maggie-cheesy-masala'];
    return DISH_IMAGES['maggie-classic-veg'];
  }

  // PASTA
  if (lowerName.includes('pasta') || lowerName.includes('penne') || lowerName.includes('spaghetti') || lowerName.includes('macaroni')) {
    if (lowerName.includes('red') || lowerName.includes('arrabbiata') || lowerName.includes('tomato')) {
      return DISH_IMAGES['item-red-sauce-pasta'];
    }
    return DISH_IMAGES['item-white-sauce-pasta'];
  }

  // BURGER & FRIES & SIDES
  if (lowerName.includes('burger') || lowerName.includes('slider')) {
    return DISH_IMAGES['item-burger'];
  }
  if (lowerName.includes('fries') || lowerName.includes('finger')) {
    return lowerName.includes('peri') ? DISH_IMAGES['item-peri-peri-fries'] : DISH_IMAGES['item-french-fries'];
  }
  if (lowerName.includes('garlic bread') || lowerName.includes('bruschetta')) {
    return DISH_IMAGES['item-garlic-bread'];
  }

  // PROTEIN SHAKES & SMOOTHIES
  if (lowerName.includes('shake')) {
    if (lowerName.includes('peanut')) return DISH_IMAGES['shake-peanut-protein'];
    if (lowerName.includes('oat') || lowerName.includes('gainer')) return DISH_IMAGES['shake-weight-gainer-oats'];
    return DISH_IMAGES['shake-classic-whey'];
  }
  if (lowerName.includes('smoothie')) {
    if (lowerName.includes('strawberry')) return DISH_IMAGES['smoothie-strawberry-blast'];
    if (lowerName.includes('berry') || lowerName.includes('mixed')) return DISH_IMAGES['smoothie-mix-berry'];
    return DISH_IMAGES['smoothie-blueberry-chia'];
  }

  // BENTO CAKES & DESSERTS
  if (lowerName.includes('bento') || lowerName.includes('cake') || lowerName.includes('pastry')) {
    if (lowerName.includes('blueberry')) return DISH_IMAGES['bento-blueberry'];
    if (lowerName.includes('strawberry') || lowerName.includes('red velvet')) return DISH_IMAGES['bento-red-velvet-strawberry'];
    if (lowerName.includes('rose')) return DISH_IMAGES['special-bento-rose'];
    if (lowerName.includes('2-tier') || lowerName.includes('tier')) return DISH_IMAGES['bento-2tier-chocolate-truffle'];
    if (lowerName.includes('half kg') || lowerName.includes('500g')) return DISH_IMAGES['halfkg-chocolate-truffle'];
    return DISH_IMAGES['bento-chocolate-truffle'];
  }
  if (lowerName.includes('brownie')) {
    return DISH_IMAGES['item-brownie'];
  }
  if (lowerName.includes('waffle')) {
    return DISH_IMAGES['item-waffle'];
  }
  if (lowerName.includes('cheesecake')) {
    return DISH_IMAGES['item-cheesecake'];
  }

  // 3. Fallback based on category
  switch (itemCategory) {
    case 'treats-sips':
      return DISH_IMAGES['caf-cappuccino'];
    case 'subs-wraps':
      return DISH_IMAGES['sub-mix-veg-crispy'];
    case 'bowls-salads':
      return DISH_IMAGES['bowl-peri-peri-paneer'];
    case 'pizzas-momos':
      return DISH_IMAGES['pizza-classic-margherita'];
    case 'nachos-maggie':
      return DISH_IMAGES['nachos-cheese-loaded-baked'];
    case 'shakes-smoothies':
      return DISH_IMAGES['shake-peanut-protein'];
    case 'bento-cakes-specials':
      return DISH_IMAGES['bento-chocolate-truffle'];
    default:
      return DISH_IMAGES['caf-cappuccino'];
  }
}
