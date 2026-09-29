import { MenuItem, MenuCategory, RestaurantInfo } from '../types';

export const CAFFEINE_RESTAURANT_INFO: RestaurantInfo = {
  name: 'Caffeine',
  tagline: 'Coffee · Culture · Conversation',
  shortBio: 'Aligarh’s premier specialty coffee house & gourmet diner on Marris Road. Enjoy authentic Vietnamese brews, handcrafted hot & cold coffees, gourmet subs, signature rice bowls, wood-fired pizzas, healthy salads, wholesome protein shakes, and artisanal bento cakes.',
  address: {
    shop: 'Shop Number 1 & 12',
    building: 'Square Towers',
    street: 'Marris Road',
    area: 'Begpur, Ward 44',
    city: 'Aligarh',
    state: 'Uttar Pradesh',
    pincode: '202001',
    full: 'Shop Number 1 & 12, Square Towers, Marris Road, Begpur, Aligarh, Uttar Pradesh 202001'
  },
  phone: '+91 6396408445',
  whatsapp: '916396408445',
  rating: 4.9,
  reviewCount: 1284,
  timings: 'Open Daily: 11:00 AM – 11:00 PM',
  googleMapsUrl: 'https://maps.app.goo.gl/fGxF16Wfeq7pBd9W7?g_st=aw',
  coordinates: {
    lat: 27.9045,
    lng: 78.0772
  }
};

export const INITIAL_CATEGORIES: MenuCategory[] = [
  {
    id: 'treats-sips',
    name: 'Coffee, Treats & Sips',
    tagline: 'Hot Brews · Cold Brews · Iced Lattes · Affogato',
    iconName: 'Coffee',
    description: 'Espresso, Vietnamese cold brew, Biscoff & Nutella iced lattes, and artisan hot chocolates'
  },
  {
    id: 'subs-wraps',
    name: 'Gourmet Subs & Wraps',
    tagline: 'Freshly Baked 15cm Subs & Wholesome Tortillas',
    iconName: 'Layers',
    description: 'Crispy sub baguettes & whole-wheat wraps with fresh nutrition callouts'
  },
  {
    id: 'bowls-salads',
    name: 'Rice Bowls & Salads',
    tagline: 'Garlic Rice Bowls & Garden Fresh Bowls',
    iconName: 'Salad',
    description: 'Signature garlic rice bowls, Greek salad, Veg Caesar, and falafel salads'
  },
  {
    id: 'pizzas-momos',
    name: 'Pizzas & Momos (5 Pcs)',
    tagline: 'Thin Crust Pizzas & Handcrafted Momos',
    iconName: 'Pizza',
    description: 'Cheese loaded pizzas and steam, crispy fried, chilli garlic & creamy momos'
  },
  {
    id: 'nachos-maggie',
    name: 'Loaded Nachos & Maggie',
    tagline: 'Crunchy Nachos & Street Style Maggies',
    iconName: 'Utensils',
    description: 'Cheese baked nachos, chatpati bhel, and Punjabi tadka & Chinese schezwan maggie'
  },
  {
    id: 'shakes-smoothies',
    name: 'Protein Shakes & Smoothies',
    tagline: 'Wholesome Fitness Shakes & Fruit Blends',
    iconName: 'CupSoda',
    description: 'Whey protein, peanut oats shakes, and chilled chia seed berry smoothies'
  },
  {
    id: 'bento-cakes-specials',
    name: 'Bento Cakes & Specials',
    tagline: 'Trending Korean Bento, 2-Tier & Flower Combos',
    iconName: 'Cake',
    description: 'Delicate bento lunchbox cakes, half kg celebration cakes, and flower hampers'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // TREATS & SIPS: HOT BREWS & COLD BREWS
  // ==========================================
  {
    id: 'caf-vietnamese-cold-coffee',
    name: 'Vietnamese Style Cold Coffee',
    category: 'treats-sips',
    subCategory: 'Cold Brews',
    price: 199,
    description: 'Authentic slow-dripped Vietnamese dark coffee with sweet condensed milk over crystal ice. Caffeine Aligarh’s star beverage.',
    dietary: 'veg',
    isChefSpecial: true,
    isBestseller: true,
    isAvailable: true,
    prepTime: '5-7 mins',
    milks: ['Condensed Milk (Original)', 'Oat Milk (+₹40)', 'Almond Milk (+₹50)']
  },
  {
    id: 'caf-cappuccino',
    name: 'Cappuccino (Rich Crema)',
    category: 'treats-sips',
    subCategory: 'Hot Brews',
    price: 129,
    sizeOptions: [
      { label: 'Small (S)', price: 129 },
      { label: 'Large (L)', price: 149 }
    ],
    description: 'Double shot of freshly ground Arabica espresso balanced with velvety steamed milk and thick foam.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '4-5 mins'
  },
  {
    id: 'caf-biscoff-latte',
    name: 'Biscoff Latte (Hot)',
    category: 'treats-sips',
    subCategory: 'Hot Brews',
    price: 179,
    description: 'Velvety espresso infused with genuine Lotus Biscoff speculoos cream and steamed milk, dusted with caramelized cookie crumbs.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'caf-biscoff-iced-latte',
    name: 'Biscoff Iced Latte',
    category: 'treats-sips',
    subCategory: 'Iced Lattes',
    price: 189,
    description: 'Cold espresso poured over Belgian Biscoff spread, chilled milk, and crushed ice for a rich caramelized coffee treat.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '4 mins'
  },
  {
    id: 'caf-nutella-iced-latte',
    name: 'Nutella Iced Latte',
    category: 'treats-sips',
    subCategory: 'Iced Lattes',
    price: 189,
    description: 'Hazelnut chocolate Nutella swirl, fresh espresso shot, chilled whole milk, and chocolate drizzle.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '4 mins'
  },
  {
    id: 'caf-classic-cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'treats-sips',
    subCategory: 'Cold Brews',
    price: 139,
    description: 'Creamy blended iced coffee with milk, espresso and chocolate dust. Perfectly balanced and refreshing.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '4 mins'
  },
  {
    id: 'caf-caffeine-overload',
    name: 'Caffeine Overload',
    category: 'treats-sips',
    subCategory: 'Cold Brews',
    price: 169,
    description: 'Intense triple espresso punch blended with dark chocolate and thick cream. For true coffee aficionados.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'caf-hot-chocolate',
    name: 'Hot Chocolate',
    category: 'treats-sips',
    subCategory: 'Hot Brews',
    price: 149,
    description: 'Decadent melted cocoa gently whisked into warm milk and topped with rich froth.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '4 mins'
  },
  {
    id: 'caf-affogato-classic',
    name: 'Affogato Classic',
    category: 'treats-sips',
    subCategory: 'Affogato',
    price: 129,
    description: 'Scoop of premium vanilla bean gelato drowned in a freshly pulled piping-hot espresso shot.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '3 mins'
  },
  {
    id: 'caf-affogato-biscoff',
    name: 'Affogato Biscoff',
    category: 'treats-sips',
    subCategory: 'Affogato',
    price: 169,
    description: 'Vanilla gelato topped with warm espresso and melted Biscoff cookie spread.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '3 mins'
  },
  {
    id: 'caf-shahi-thandai',
    name: 'Shahi Thandai',
    category: 'treats-sips',
    subCategory: 'Cold Brews',
    price: 179,
    description: 'Royal aromatic blend of saffron, cardamom, almonds, pistachios, and chilled reduced milk.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '4 mins'
  },

  // ==========================================
  // GOURMET SUBS & WHOLESOME WRAPS
  // ==========================================
  {
    id: 'sub-mix-veg-crispy',
    name: 'Mix-Veg Crispy Sub (15cm)',
    category: 'subs-wraps',
    subCategory: 'Gourmet Subs',
    price: 179,
    description: 'Mixed vegetable crispy patty seasoned with special herbs and spices, paired with fresh, nutritious veggies, served in freshly baked bread.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'sub-paneer-tikka',
    name: 'Paneer Tikka Sub (15cm)',
    category: 'subs-wraps',
    subCategory: 'Gourmet Subs',
    price: 189,
    description: 'A tangy twist to your favourite cottage cheese with tandoori spices and sauces layered inside freshly baked bread with our signature spices and veggies.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'sub-corn-mushroom',
    name: 'Corn & Mushroom Sub (15cm)',
    category: 'subs-wraps',
    subCategory: 'Gourmet Subs',
    price: 179,
    description: 'A delicious assortment of crispy corns and grilled mushrooms with a creamy mix of our sauces and vegetables.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'sub-crunchy-mexican',
    name: 'Crunchy Mexican Sub (15cm)',
    category: 'subs-wraps',
    subCategory: 'Gourmet Subs',
    price: 189,
    description: 'Classic chilli and herb falafel patty topped with Mexican nachos served in freshly baked bread with crispy veggies.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'sub-smoked-bbq-paneer',
    name: 'Smoked Barbeque Paneer Sub (15cm)',
    category: 'subs-wraps',
    subCategory: 'Gourmet Subs',
    price: 189,
    description: 'Smoked cube of cottage cheese infused with barbeque sauce layered inside freshly baked bread with herbs, spices & veggies.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'wrap-healthy-falafel',
    name: 'Healthy Falafel Wrap',
    category: 'subs-wraps',
    subCategory: 'Wholesome Wraps',
    price: 149,
    description: 'Whole-wheat wrap filled with chickpeas Patty with garden fresh vegetables and tahini garlic dressing.',
    dietary: 'vegan',
    isBestseller: true,
    isAvailable: true,
    prepTime: '8 mins'
  },
  {
    id: 'wrap-paneer-tikka',
    name: 'Paneer Tikka Wrap',
    category: 'subs-wraps',
    subCategory: 'Wholesome Wraps',
    price: 149,
    description: 'Chunky cubes of paneer tikka wrap up in a tortilla with exotic fresh vegetables and mint yogurt spread.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '8 mins'
  },
  {
    id: 'wrap-peri-peri-paneer',
    name: 'Peri-Peri Spicy Paneer Wrap',
    category: 'subs-wraps',
    subCategory: 'Wholesome Wraps',
    price: 149,
    description: 'Spicy cubes of paneer wrap up in whole-wheat tortilla with fresh veggies and peri peri seasoning.',
    dietary: 'veg',
    spiceLevel: 'spicy',
    isAvailable: true,
    prepTime: '8 mins'
  },
  {
    id: 'wrap-crispy-veg-signature',
    name: 'Crispy Vegetable Signature Wrap',
    category: 'subs-wraps',
    subCategory: 'Wholesome Wraps',
    price: 149,
    description: 'Crispy vegetable patty tied in a whole-wheat tortilla and exotic veggies and tangy sauce.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '8 mins'
  },

  // ==========================================
  // SIGNATURE RICE BOWLS & HEALTHY SALADS
  // ==========================================
  {
    id: 'bowl-peri-peri-paneer',
    name: 'Peri-Peri Paneer Rice Bowl',
    category: 'bowls-salads',
    subCategory: 'Signature Rice Bowls',
    price: 249,
    description: 'Tangy and spicy cubes of paneer assembled with garlic-flavoured rice and sautéed vegetables.',
    dietary: 'veg',
    isChefSpecial: true,
    isBestseller: true,
    isAvailable: true,
    prepTime: '10-12 mins'
  },
  {
    id: 'bowl-paneer-tikka',
    name: 'Paneer Tikka Rice Bowl',
    category: 'bowls-salads',
    subCategory: 'Signature Rice Bowls',
    price: 249,
    description: 'Tangy spicy sauce spread over paneer and rice with stir-fried vegetables.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '10-12 mins'
  },
  {
    id: 'bowl-herbs-tomato-paneer',
    name: 'Herbs & Tomato Paneer Rice Bowl',
    category: 'bowls-salads',
    subCategory: 'Signature Rice Bowls',
    price: 249,
    description: 'Italian-style tangy tomato sauce with cubes of paneer assembled with garlic-flavoured rice with fresh veggies.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '10-12 mins'
  },
  {
    id: 'bowl-corn-mushroom',
    name: 'Corn & Mushroom Rice Bowl',
    category: 'bowls-salads',
    subCategory: 'Signature Rice Bowls',
    price: 249,
    description: 'Golden corn and crispy mushroom topped over rice and grilled vegetables.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '10-12 mins'
  },
  {
    id: 'salad-veg-caesar',
    name: 'Veg Caesar Salad',
    category: 'bowls-salads',
    subCategory: 'Healthy Salads',
    price: 179,
    description: 'Signature salad of leafy green lettuce, bell peppers, red onions, broccoli, tomatoes, black olives, baked croutons topped with cheese.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '7-9 mins'
  },
  {
    id: 'salad-greek',
    name: 'Greek Salad',
    category: 'bowls-salads',
    subCategory: 'Healthy Salads',
    price: 189,
    description: 'Fresh cubes of cottage cheese with mild, sweet, and tangy sauce, red onions, lettuce, sweet bell peppers mixed with in-house dressing.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '7-9 mins'
  },
  {
    id: 'salad-smoky-grilled-paneer',
    name: 'Smoky Grilled Paneer Salad',
    category: 'bowls-salads',
    subCategory: 'Healthy Salads',
    price: 189,
    description: 'Grilled paneer, smoky bell peppers, button mushrooms, onions, and crisp garden fresh veggies topped with olives and cheese.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'salad-corn-peanut',
    name: 'Corn and Peanuts Salad',
    category: 'bowls-salads',
    subCategory: 'Healthy Salads',
    price: 189,
    description: 'Crispy corn with roasted peanuts, garden fresh vegetables, and tangy house dressing.',
    dietary: 'vegan',
    isAvailable: true,
    prepTime: '6-8 mins'
  },

  // ==========================================
  // PIZZAS & MOMOS (5 PCS)
  // ==========================================
  {
    id: 'pizza-classic-margherita',
    name: 'Classic Margherita Pizza',
    category: 'pizzas-momos',
    subCategory: 'Pizzas',
    price: 199,
    description: 'Everyone\'s favourite classic margherita pizza topped with mozzarella cheese with tangy tomato sauce and baked perfectly.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '12-15 mins',
    extras: [{ name: 'Extra Cheese', price: 50 }]
  },
  {
    id: 'pizza-farmhouse',
    name: 'Farmhouse Pizza',
    category: 'pizzas-momos',
    subCategory: 'Pizzas',
    price: 229,
    description: 'Crispy Capsicum, onion, and tomato layered with mozzarella cheese and baked perfectly.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '12-15 mins',
    extras: [{ name: 'Extra Cheese', price: 50 }]
  },
  {
    id: 'pizza-exotica',
    name: 'Exotica Pizza',
    category: 'pizzas-momos',
    subCategory: 'Pizzas',
    price: 229,
    description: 'Crispy corn and juicy mushrooms, Jalapenos layered with mozzarella cheese and baked perfectly.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '12-15 mins',
    extras: [{ name: 'Extra Cheese', price: 50 }]
  },
  {
    id: 'pizza-paneer-tikka',
    name: 'Paneer Tikka Pizza',
    category: 'pizzas-momos',
    subCategory: 'Pizzas',
    price: 249,
    description: 'Spicy blend of tandoori masala spread over fresh paneer tikka with vegetables and baked perfectly.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '14-16 mins',
    extras: [{ name: 'Extra Cheese', price: 50 }]
  },
  {
    id: 'pizza-caffeine-special-cheese-loaded',
    name: 'Caffeine Special Cheese Loaded Pizza',
    category: 'pizzas-momos',
    subCategory: 'Pizzas',
    price: 279,
    description: 'A crispy crust topped with a rich blend of cheese for the ultimate cheesy delight!',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '15 mins',
    extras: [{ name: 'Extra Cheese', price: 50 }]
  },
  {
    id: 'momos-steam',
    name: 'Steam Momos (5 Pcs)',
    category: 'pizzas-momos',
    subCategory: 'Momos (5 Pcs)',
    price: 99,
    sizeOptions: [
      { label: 'Veg Steam', price: 99 },
      { label: 'Paneer Steam', price: 109 }
    ],
    description: 'Delicate steamed dumplings stuffed with aromatic filling, served with fiery momo chutney and creamy dip.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'momos-crispy-fried',
    name: 'Crispy Fried Momos (5 Pcs)',
    category: 'pizzas-momos',
    subCategory: 'Momos (5 Pcs)',
    price: 129,
    sizeOptions: [
      { label: 'Crispy Veg', price: 129 },
      { label: 'Crispy Paneer', price: 139 }
    ],
    description: 'Golden fried crunchy momos bursting with juicy fillings and secret spices.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'momos-chilli-garlic',
    name: 'Chilli Garlic Pan Fried Momos (5 Pcs)',
    category: 'pizzas-momos',
    subCategory: 'Momos (5 Pcs)',
    price: 139,
    sizeOptions: [
      { label: 'Chilli Garlic Veg', price: 139 },
      { label: 'Chilli Garlic Paneer', price: 149 }
    ],
    description: 'Wok-tossed pan fried momos glazed in fiery garlic sauce and scallions.',
    dietary: 'veg',
    spiceLevel: 'spicy',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '10 mins'
  },
  {
    id: 'momos-cheese-loaded-creamy',
    name: 'Cheese Loaded Creamy Momos (5 Pcs)',
    category: 'pizzas-momos',
    subCategory: 'Momos (5 Pcs)',
    price: 149,
    sizeOptions: [
      { label: 'Creamy Veg', price: 149 },
      { label: 'Creamy Paneer', price: 159 }
    ],
    description: 'Smothered in velvety cheese sauce, oregano herbs, and melted mozzarella.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '10 mins'
  },

  // ==========================================
  // LOADED NACHOS & MAGGIE
  // ==========================================
  {
    id: 'nachos-cheese-loaded-baked',
    name: 'Cheese Loaded Baked Nachos',
    category: 'nachos-maggie',
    subCategory: 'Nachos',
    price: 199,
    description: 'Corn tortillas assembled with fresh vegetables and salsa topped up with cheese and baked.',
    dietary: 'veg',
    isChefSpecial: true,
    isBestseller: true,
    isAvailable: true,
    prepTime: '8-10 mins'
  },
  {
    id: 'nachos-veg-loaded',
    name: 'Veg Loaded Nachos',
    category: 'nachos-maggie',
    subCategory: 'Nachos',
    price: 129,
    description: 'Crispy Mexican nachos loaded with fresh vegetables and salsa.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '6 mins'
  },
  {
    id: 'nachos-chatpati-bhel',
    name: 'Chatpati Nachos Bhel',
    category: 'nachos-maggie',
    subCategory: 'Nachos',
    price: 159,
    description: 'Crispy nachos topped with a bhel mixture enhanced with a splash of lemon and fresh coriander.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '6 mins'
  },
  {
    id: 'nachos-loaded-paneer',
    name: 'Loaded Paneer Nachos',
    category: 'nachos-maggie',
    subCategory: 'Nachos',
    price: 169,
    description: 'Fresh and juicy cubes of cottage cheese mixed with fresh vegetables and salsa.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '7 mins'
  },
  {
    id: 'maggie-classic-veg',
    name: 'Classic Vegetable Maggie',
    category: 'nachos-maggie',
    subCategory: 'Maggie',
    price: 119,
    description: 'Everyone\'s favourite masala maggie with fresh onion, tomato, capsicum.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '7 mins'
  },
  {
    id: 'maggie-punjabi-tadka',
    name: 'Punjabi Tadka Maggie',
    category: 'nachos-maggie',
    subCategory: 'Maggie',
    price: 129,
    description: 'Magic of maggie and tadka of punjabi masala, perfectly combined for spice lovers.',
    dietary: 'veg',
    spiceLevel: 'medium',
    isAvailable: true,
    prepTime: '7 mins'
  },
  {
    id: 'maggie-chinese-schezwan',
    name: 'Chinese Schezwan Style Maggie',
    category: 'nachos-maggie',
    subCategory: 'Maggie',
    price: 139,
    description: 'Everyone loves Indo-Chinese, so why not maggie. The flavor of maggie mixed up with our secret Chinese sauces.',
    dietary: 'veg',
    spiceLevel: 'spicy',
    isAvailable: true,
    prepTime: '7 mins'
  },
  {
    id: 'maggie-cheesy-masala',
    name: 'Cheesy Masala Maggie',
    category: 'nachos-maggie',
    subCategory: 'Maggie',
    price: 149,
    description: 'Cheese-loaded classic vegetable maggie with molten stringy cheese pull.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '8 mins'
  },

  // ==========================================
  // WHOLESOME SHAKES & REFRESHING SMOOTHIES
  // ==========================================
  {
    id: 'shake-peanut-protein',
    name: 'Peanut Protein Shake',
    category: 'shakes-smoothies',
    subCategory: 'Wholesome Shakes',
    price: 180,
    description: 'Zero sugar and preservative-free creamy shake made with honey, peanut butter and milk infused with flax seeds.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'shake-weight-gainer-oats',
    name: 'Weight Gainer\'s Shake with Oats',
    category: 'shakes-smoothies',
    subCategory: 'Wholesome Shakes',
    price: 195,
    description: 'Perfect meal replacement hearty shake with oats sweetened with honey, garnished with omega-enriched flax seeds and peanut butter.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'shake-classic-whey',
    name: 'Classic Whey Protein Shake',
    category: 'shakes-smoothies',
    subCategory: 'Wholesome Shakes',
    price: 220,
    description: 'Perfect drink for gym lovers & fitness freaks with zero sugar and a scoop of whey, peanut butter, and milk.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'smoothie-blueberry-chia',
    name: 'Blueberry Chia Smoothie',
    category: 'shakes-smoothies',
    subCategory: 'Refreshing Smoothies',
    price: 189,
    description: 'Fresh blueberries and overnight soaked chia seeds blended with skimmed milk and honey.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: '4 mins'
  },
  {
    id: 'smoothie-strawberry-blast',
    name: 'Strawberry Blast Smoothie',
    category: 'shakes-smoothies',
    subCategory: 'Refreshing Smoothies',
    price: 189,
    description: 'Fresh strawberries and overnight soaked chia seeds blended with skimmed milk and honey.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: '4 mins'
  },
  {
    id: 'smoothie-mix-berry',
    name: 'Mix-Berry Smoothie',
    category: 'shakes-smoothies',
    subCategory: 'Refreshing Smoothies',
    price: 199,
    description: 'Fresh blend of blueberries and strawberries with skimmed milk and honey.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: '4 mins'
  },

  // ==========================================
  // BENTO CAKES & SPECIALS
  // ==========================================
  {
    id: 'bento-chocolate-truffle',
    name: 'Chocolate Truffle Bento Cake',
    category: 'bento-cakes-specials',
    subCategory: 'Bento Cakes',
    price: 349,
    description: 'Trending Korean lunchbox cake with rich Belgian dark chocolate truffle ganache, delicate pastel piping, and glossy finish.',
    dietary: 'veg',
    isChefSpecial: true,
    isBestseller: true,
    isAvailable: true,
    prepTime: 'Ready to Serve'
  },
  {
    id: 'bento-blueberry',
    name: 'Blueberry Bento Cake',
    category: 'bento-cakes-specials',
    subCategory: 'Bento Cakes',
    price: 299,
    description: 'Fluffy vanilla sponge layered with wild blueberry compote and light whipped cream in an aesthetic kraft bento box.',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    prepTime: 'Ready to Serve'
  },
  {
    id: 'bento-red-velvet-strawberry',
    name: 'Strawberry Bento Cake',
    category: 'bento-cakes-specials',
    subCategory: 'Bento Cakes',
    price: 299,
    description: 'Fresh strawberry layers with silky vanilla bean cream and cute Korean aesthetic messaging.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: 'Ready to Serve'
  },
  {
    id: 'bento-2tier-chocolate-truffle',
    name: 'Bento 2-Tier Chocolate Truffle Cake',
    category: 'bento-cakes-specials',
    subCategory: 'Bento 2-Tier Cakes',
    price: 389,
    description: 'Stunning miniature 2-tier celebration bento cake with rich chocolate truffle layers.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: 'Ready to Serve'
  },
  {
    id: 'special-bento-rose',
    name: 'Bento Cake with Fresh Rose',
    category: 'bento-cakes-specials',
    subCategory: 'Specials & Hampers',
    price: 449,
    description: 'Aesthetic Bento Cake paired with an elegant fresh red rose stem. Perfect for birthdays, dates, and surprises.',
    dietary: 'veg',
    isChefSpecial: true,
    isAvailable: true,
    prepTime: 'Ready to Serve'
  },
  {
    id: 'special-cold-coffee-flowers',
    name: 'Cold Coffee with Flowers Hamper',
    category: 'bento-cakes-specials',
    subCategory: 'Specials & Hampers',
    price: 349,
    description: 'Caffeine signature iced brew presented with a delicate bouquet of fresh handpicked flowers.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: 'Ready to Serve'
  },
  {
    id: 'halfkg-chocolate-truffle',
    name: 'Chocolate Truffle Half Kg Cake',
    category: 'bento-cakes-specials',
    subCategory: 'Half Kg Cakes',
    price: 600,
    description: 'Full 500g celebration cake: pure melted dark chocolate ganache, moist sponge, and premium celebration packaging.',
    dietary: 'veg',
    isAvailable: true,
    prepTime: 'Pre-order / 30 mins'
  }
];

export const DELIVERY_FEE_ALIGARH = 30;

export const ALIGARH_DELIVERY_AREAS = [
  { name: 'Begpur & Marris Road (Aligarh)', deliveryFee: 30, time: '15-25 mins', minOrder: 150 },
  { name: 'Civil Lines & AMU Campus (Aligarh)', deliveryFee: 30, time: '20-30 mins', minOrder: 150 },
  { name: 'Medical College Road (Aligarh)', deliveryFee: 30, time: '20-35 mins', minOrder: 150 },
  { name: 'Centre Point & Samad Road (Aligarh)', deliveryFee: 30, time: '20-35 mins', minOrder: 150 },
  { name: 'Ramghat Road & Kishanpur (Aligarh)', deliveryFee: 30, time: '25-40 mins', minOrder: 150 },
  { name: 'Dodhpur & Shamshad Market (Aligarh)', deliveryFee: 30, time: '20-35 mins', minOrder: 150 },
  { name: 'Vishnupuri & Swarna Jayanti Nagar (Aligarh)', deliveryFee: 30, time: '25-45 mins', minOrder: 150 },
  { name: 'Other Localities in Aligarh City', deliveryFee: 30, time: '25-45 mins', minOrder: 150 }
];

export const CAFFEINE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Dr. Zoya Khan',
    role: 'AMU Medical College Faculty',
    rating: 5,
    date: '2 weeks ago',
    text: 'Caffeine is easily the most aesthetic and consistent coffee place in Aligarh! Their Vietnamese cold brew has that rich, authentic drip flavour you usually only get in metro cafes. The White Sauce pasta and Cheesy Pizza sandwich are top notch.',
    dishMentioned: 'Vietnamese Iced Coffee, White Sauce Pasta'
  },
  {
    id: 'rev-2',
    author: 'Aman Varshney',
    role: 'Marris Road Resident',
    rating: 5,
    date: '1 month ago',
    text: 'Been ordering and dining in at Square Towers since they opened. The vibe is quiet, mature, and upscale. The Blueberry Bento Cake we ordered for my sister’s birthday was incredible and packaged so cleanly.',
    dishMentioned: 'Blueberry Bento Cake, Peri Peri Sandwich'
  },
  {
    id: 'rev-3',
    author: 'Rohit Singhal',
    role: 'Local Food Reviewer',
    rating: 5,
    date: '3 weeks ago',
    text: 'Hands down 4.9 stars well-deserved. The thin crust farmhouse pizza has crisp edges without being greasy. Extremely polite staff and swift delivery across Aligarh.',
    dishMentioned: 'Farmhouse Supreme Pizza, Belgian Hot Chocolate'
  }
];
