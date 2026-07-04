import { MenuItem, BrewingMethod } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: 'smoked-macchiato',
    name: 'Smoked Macchiato',
    price: 8.50,
    description: 'Double shot of Ethiopian Yirgacheffe, cold-smoked with oak chips and topped with velvety, oak-infused micro-foam.',
    category: 'Coffee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKOjV0zhkHZQsl09PqwaGlhit9w8KR4v0tsW7Vsunm8hemRgEenQvSaOugDUcYOyDjw3ZW7NGZm0M9RueHmYxB6Wt3hCjIsdjvoz3EU9luj6rieZW4ac0m3Lmu3MG516bl_eSd9vLXEDA_lYKZxICtRwHFFBIdGvS2uzLszdn4fKe28K3mtoV5Kuh19yggGit1g7sHvurp4ij2FTrTpM1WVAj-JhKht-YUXUXAxo7TfAyf49TtA1IW',
    tags: ['Best Seller', 'Signature', 'Oak Smoked']
  },
  {
    id: 'single-origin-v60',
    name: 'Single Origin V60',
    price: 12.00,
    description: 'Rotating seasonal micro-lot, hand-poured through V60 to highlight delicate acidity and floral jasmine notes.',
    category: 'Coffee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaivNCCHTrxSY8kjf2m5VFCquC2iAbLpNx-tCcFnYAz6JmU0ixjb3Rcw-Thlt-P9OtQ8J4mbCmdVc2eUb9tqDKjH_h60clH-pehf6-GGguVoGA76sabjISH4m_E5amRxVJtgalcLfo7wGI3MihbFOxtwetRY7TQcniQ9SZetrBvnAOJg-Xgk6PsSJhkY6ZvciMqN_IH8k0k31Wi8n0L4iL-XXDMkwg9lq3ZHkZI7G_Kv60YkjH-KIQ',
    tags: ['Single Origin', 'Hand Poured', 'Seasonal']
  },
  {
    id: 'gold-spiced-latte',
    name: 'Gold Spiced Latte',
    price: 9.50,
    description: 'Rich espresso with real roasted pumpkin purée, dusted with 24k organic gold leaf and freshly grated organic nutmeg.',
    category: 'Coffee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4_kv1626JAP_31C4n0wIROBF8ir2sjJTCrgMlzMbfnqYDS-3zll3OjIiZ_skP2MK6On8XsOyENUneDslnaetbFs7EtnFiF6RK3eAO123IepLopX33wtp8FQfQR_vg9AKIt6uoWMcKxJXE9FU_7TXXpirlmBoOYPnt2W3hJxTNrkj91HlzEOieCPA1uwy8ae5mr2c479-B_1qIT_GB5FQNGUhfqMJIJQJtreQwbn504KBW53fhy4Tn',
    tags: ['Winter Special', 'Award Winning']
  },
  {
    id: 'ceremonial-matcha-latte',
    name: 'Uji Matcha Latte',
    price: 11.00,
    description: 'Premium stone-ground ceremonial Uji matcha whisked to velvet perfection, served with sweet organic house macadamia milk.',
    category: 'Tea Selection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAalRswdkWL-7wlEcqwZzZoE9ZRcIigpFTn3EkeroMBIbWGI-fh4Jy9ygFIlaN0u3JZY4KJ3xUjtH4Pbk27wfE2g-OlMZx9acnSHfdoPceWT1yUeXvk2ctXeXsQg1_uFhl-pgL72rK_UAhY1ojaf3Ye4WlQ6vOF7N-g1pFPxpH55f_eCq_lqVcn3qL17hXMX5jPe9U7ZtpNSuMYnxEE4KG0C2BUUeOFUFvHoNcp_6LMbBqdWjR-Ks-c',
    tags: ['Ceremonial', 'Organic', 'Sweetened']
  },
  // TEA SELECTION
  {
    id: 'elderflower-infusion',
    name: 'Elderflower Infusion',
    price: 10.00,
    description: 'Vibrant, refreshing cold-brewed tea infused with organic wild hibiscus, fresh garden mint, and elderflower liqueur splash.',
    category: 'Tea Selection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzcumzamcZuLThbygzVRo9Jr2OCc84KODxmeAtTBl_NJZzRDYF_8M2qWjAj5yYdtlaAlL_0m7s7m8rgIv3L_Xl4sAaQjN46pNeu3kiy0-LkQI_dHbH_tIsELBkuLAFsruFOWht55g_aatuQUoiNHjvEuvtHkibr18w1If8gTWk5Ovmpj_k3F7x58x5N2NIri9pP6vjHF2wefX_vhbA11DZDAiMEBUqMYmD0UtYloBThoZJHH8WCu1c',
    tags: ['Summer Special', 'Refreshing', 'Iced']
  },
  // PATISSERIE
  {
    id: 'pistachio-croissant',
    name: 'Pistachio Croissant',
    price: 7.50,
    description: 'Extremely flaky twice-baked sourdough pastry filled with house-made premium Bronte pistachio frangipane and slivers.',
    category: 'Patisserie',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlaKdLH2iMPplozLKD8ANYRJq-a6_TncIS5MmPoZy-Nspt0WRUxoAeqFMzGJaCQg7dXDOFAcv7loFxaqzKClYfFJuwmb0NntzwK8MdS4a_X4dz1p_Oz_PTD2apq6x1_xuIgnl7JBm9f84lwdUa91I1Nk9ZcOw2d8w3K26VAZiymFleQRWh3gvVmigiyNuhIoPAsu-wLZ1p6BoEGTNc5bjnXaRheX6thY6q0HLY7Rjm80vcrqBstBC',
    tags: ['Freshly Baked', 'Voted Best Pastry']
  },
  {
    id: 'dark-chocolate-babka',
    name: 'Dark Chocolate Babka',
    price: 8.00,
    description: 'Rich, buttery brioche bread braided meticulously with 72% Madagascar single-origin chocolate and orange zest notes.',
    category: 'Patisserie',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGTWhHloufZ7Vxb4nifW0OcKTUUr6we88QuE1AsJf8qIECpsy03LRZOui3ieWkO3NqsJNQMmEyLALn8cs4AqG_D3ntCspgmCVAGwLprwac3mk1TXszhR6LInldhysZFpYo-dCViDqNwfMy-6cDp_RnTEnMPR5TDl8EMLSNO5oivOx0AS4qsOMmgiNABxe1i0197hCmKj4bqsOlSf7y4eGykL8bi8NBt93bYS2rssVWHZhkAn5DvPif',
    tags: ['Chocolate', 'Artisanal']
  },
  // BRUNCH
  {
    id: 'truffle-avocado',
    name: 'Truffle Avocado Sourdough',
    price: 18.00,
    description: 'Artisan country sourdough, hand-smashed premium Hass avocado, black winter truffle oil, micro-greens, and a slow-poached organic egg.',
    category: 'Brunch',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_o6ua4nFAJKDq2PVUqZySgM2CdPdtNvuugklE4KqnJjKWwt4e3pTfHJvzXrEwLPcOrf5C48Gs6p30689NChYcTHpgAZb6L4qyHnYs3iz5NTuJ3h4V2B-Y-AhobCzDKxEGreywrPGwtdwyeLKBLiUbL3jCFs2RHpLC2PMSuMWMyKyrRwlLh9MZPeICthqfQAgW9hWhRLQbPTLoJscfEk--EBNcYsRlPQIQwMDziWX-eiVU4m9ShysX',
    tags: ['Brunch Classic', 'Truffle-Infused']
  }
];

export const SEASONAL_FAVORITES = [
  {
    id: 'gold-spiced-latte',
    name: 'Gold Spiced Latte',
    tag: 'Winter Special',
    tagColor: 'bg-secondary/10 text-secondary border border-secondary/20',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4_kv1626JAP_31C4n0wIROBF8ir2sjJTCrgMlzMbfnqYDS-3zll3OjIiZ_skP2MK6On8XsOyENUneDslnaetbFs7EtnFiF6RK3eAO123IepLopX33wtp8FQfQR_vg9AKIt6uoWMcKxJXE9FU_7TXXpirlmBoOYPnt2W3hJxTNrkj91HlzEOieCPA1uwy8ae5mr2c479-B_1qIT_GB5FQNGUhfqMJIJQJtreQwbn504KBW53fhy4Tn',
    desc: 'Our seasonal espresso reimagined with roasted organic pumpkin mash, gold dust leaf, and micro-foam.'
  },
  {
    id: 'elderflower-infusion',
    name: 'Elderflower Infusion',
    tag: 'Refreshing',
    tagColor: 'bg-green-100 text-green-800 border border-green-200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzcumzamcZuLThbygzVRo9Jr2OCc84KODxmeAtTBl_NJZzRDYF_8M2qWjAj5yYdtlaAlL_0m7s7m8rgIv3L_Xl4sAaQjN46pNeu3kiy0-LkQI_dHbH_tIsELBkuLAFsruFOWht55g_aatuQUoiNHjvEuvtHkibr18w1If8gTWk5Ovmpj_k3F7x58x5N2NIri9pP6vjHF2wefX_vhbA11DZDAiMEBUqMYmD0UtYloBThoZJHH8WCu1c',
    desc: 'Cold brew tea with botanical elderflower, wild garden mint, and clean crystal ice grids.'
  },
  {
    id: 'pistachio-croissant',
    name: 'Pistachio Croissant',
    tag: 'Hand-crafted',
    tagColor: 'bg-amber-100 text-amber-800 border border-amber-200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlaKdLH2iMPplozLKD8ANYRJq-a6_TncIS5MmPoZy-Nspt0WRUxoAeqFMzGJaCQg7dXDOFAcv7loFxaqzKClYfFJuwmb0NntzwK8MdS4a_X4dz1p_Oz_PTD2apq6x1_xuIgnl7JBm9f84lwdUa91I1Nk9ZcOw2d8w3K26VAZiymFleQRWh3gvVmigiyNuhIoPAsu-wLZ1p6BoEGTNc5bjnXaRheX6thY6q0HLY7Rjm80vcrqBstBC',
    desc: 'Golden-brown, flaky croissant layers filled with premium roasted pistachio butter custard.'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFIDLTOku2sfhrM8rPpXhFNUNXVqdf2FoCkbp8plu70slxa5vAQrrLFNQJNbXdqJIvCsurAQlRb1JdqNgjJECiXj0ZWgjw-IY0SykPWKFfkcqwcgHW9XIYKSRVfKs_42JsV6gYuiYxLXkGY1WR26mmO6pe1CcnV4GiPxtFk8HitPll9hfzcfqtkL_UybTZXw-40ELSaAfNLilglijvH9b3b9cQVlibCyGpeH332LzD7b_Hcei5nF1d',
    title: 'The Sanctuary Interior',
    desc: 'Double-height ceilings with custom hand-applied beige plaster, custom white oak and brass espresso counters.'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuVXjItefNinhsEPHllfiayzmAlGKKMiGq4JTN7XKVa8-sOHCNeX58FbtDfWW_cDvsBN9eBHmv-pP6IpgitF6FoTYZ1e8uM0-p5hDbdY6w0hRUkgRmwKLXXzMxMlpraEbp3iEwZfOxdR6cyUrvSclzSdRKraI8uGxSDqnnOoeq2Ir0qq7df_WrxkjcGofWJd9387v7ddm1Q3tEMyWFmGZyJoVROa4DK3hPV8jxGG8D5E_B7WC1VFFj',
    title: 'Espresso Alchemy',
    desc: 'Commercial-grade custom chrome espresso machinery calibrated dynamically for extraction perfection.'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGTWhHloufZ7Vxb4nifW0OcKTUUr6we88QuE1AsJf8qIECpsy03LRZOui3ieWkO3NqsJNQMmEyLALn8cs4AqG_D3ntCspgmCVAGwLprwac3mk1TXszhR6LInldhysZFpYo-dCViDqNwfMy-6cDp_RnTEnMPR5TDl8EMLSNO5oivOx0AS4qsOMmgiNABxe1i0197hCmKj4bqsOlSf7y4eGykL8bi8NBt93bYS2rssVWHZhkAn5DvPif',
    title: 'The Breakfast Ritual',
    desc: 'Flaky artisanal croissants paired with Swan-inspired free-pour micro-foam latte art.'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAalRswdkWL-7wlEcqwZzZoE9ZRcIigpFTn3EkeroMBIbWGI-fh4Jy9ygFIlaN0u3JZY4KJ3xUjtH4Pbk27wfE2g-OlMZx9acnSHfdoPceWT1yUeXvk2ctXeXsQg1_uFhl-pgL72rK_UAhY1ojaf3Ye4WlQ6vOF7N-g1pFPxpH55f_eCq_lqVcn3qL17hXMX5jPe9U7ZtpNSuMYnxEE4KG0C2BUUeOFUFvHoNcp_6LMbBqdWjR-Ks-c',
    title: 'Cozy Solitude',
    desc: 'Soft sunlight falling across our warm-textured stone tables and hand-sewn leather accents.'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1a06GvkkSw4lYTy7nTOkaFw8lLKKpxXw-WtN7W4fuJgV70ZSFgGCB9m7x3RuK-meobFcmi5UMeYR13qtl940jvh376_8dnDyh5ZDO_ql6ewr8S8JoiFoltcnI-QtFWkyZYGYxdwAl548vuzKEP5aa8Xyro16JNLSohOQ-80n1mFiRyxnwLoa0-3VU9kjqpKwn8FxTv2hwajKgZEh6jcUb3VqLD_ojYhcSQLmWFcsakftt8HTG4WN3',
    title: 'Dusk at The Corner',
    desc: 'The iconic backlit serif typography glowing softly as day transitions to premium jazz night sessions.'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX5RpmNAG34acY4q2YyZxVz3IZt43c-Akhv_NBXwRIq6bcWDGtTqDTRqCNS-xdaczowzsiN1lJifU3_6446hzHsU51660BWvr5bj6xz6Xtirf-2IpSknI6YD1k70f8NHYKIzVwvvZ-GmkpAv5Y1XGNr2nj4wMCTUuU3GrpQbJwnsPF_q06CEXRy1sf-eQs8_N5u4Nq3XFggcOF39SfVFYMbSwqta563ILoBDRTx11909jtSA0Lmx6m',
    title: 'Hand Sorted Batches',
    desc: 'Every single micro-lot is carefully selected and hand-screened to ensure flawless physical density and grade.'
  }
];

export const BREWING_METHODS: BrewingMethod[] = [
  {
    id: 'v60',
    name: 'V60 Pour Over',
    description: 'A delicate, clean extraction highlighting individual origin flavor molecules through a fast fluid paper drip.',
    grindSize: 'Medium-Fine',
    temperature: 93,
    brewTime: '3:00',
    profile: { acidity: 90, body: 40, sweetness: 75, aroma: 95 }
  },
  {
    id: 'espresso',
    name: 'Traditional Espresso',
    description: '9 bars of pressure forcing hot water through a dense coffee puck to create unparalleled rich crema and deep body.',
    grindSize: 'Fine',
    temperature: 91,
    brewTime: '0:28',
    profile: { acidity: 55, body: 95, sweetness: 80, aroma: 85 }
  },
  {
    id: 'chemex',
    name: 'Chemex Slow Drip',
    description: 'Thick proprietary filters that extract bitter oils and sediment, leaving behind an extremely smooth, tea-like clarity.',
    grindSize: 'Medium',
    temperature: 94,
    brewTime: '4:15',
    profile: { acidity: 80, body: 35, sweetness: 85, aroma: 90 }
  },
  {
    id: 'coldbrew',
    name: 'Yama Cold Drip',
    description: 'Ice water dripping steadily over 16 hours to minimize acidity and emphasize low, dark chocolate and sweet caramel notes.',
    grindSize: 'Coarse',
    temperature: 4,
    brewTime: '16:00',
    profile: { acidity: 15, body: 85, sweetness: 95, aroma: 60 }
  }
];

export const REVIEWS = [
  {
    id: '1',
    quote: 'Quite simply the most refined coffee experience in the city. The absolute attention to the bean\'s micro-lot origin is unparalleled.',
    author: 'Julian Vane',
    role: 'Lifestyle Critic'
  },
  {
    id: '2',
    quote: 'An oasis of complete aesthetic calm. Whether for a morning focus ritual or a quiet afternoon design consultation, it never fails to impress.',
    author: 'Eleanor Rigby',
    role: 'Architect'
  },
  {
    id: '3',
    quote: 'The Gold Spiced Latte is a complete liquid masterpiece. The Coffee Corner has redefined what a neighborhood premium cafe can achieve.',
    author: 'Marcus Thorne',
    role: 'Local Regular'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiJHLBrFnmT5yJtk6yrcmcnbptI02qghNAraKwOskpBiTkRu0Rx2wQpKZdx2u5wU-dn-j1W2999QNoDOTBTTO562IELf-DZlScvx0uSuGwD6EW-SuKDUksz3crxeLI6jtFc3ulJFeUrrTAKNxfQIQPuFsfFPYj8RRfFDCA3eTPrwNdGNdARv1Y27_GxSXcPHM6JRBd6pZKTYzeY2Zmb7lsoXeqpyqOM4UFLilK9iybyUtSfB6_MGd2',
    likes: 1240,
    comments: 42,
    caption: 'Morning sun grids illuminating the perfect Saturday brunch table. ✨🥐☕️ #artisanal #saturdaymorning #coffeeshopvibes'
  },
  {
    id: '2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJSixuo597TnFe7XHg00oRqE9ou7uB6kWMYJBCsnHq9MjO2rs4E6TUa0rjcSd_pvTtTURXmlxoBfzGXlQERy5ES5WJWDQBits5AAiJSpb-I5CMelGexTbFRnUTEnPuf_TccnauIVCdvoP8DaHmjYQlWTpUKjZ-pHv8qupG2ZTQwQXYx7DYuqJBsPkcAiS9V60AyPvlAAmaohhRI0vJj6IZH2-Q1dscXRht1yzuURDc31oMa_WU5v-T',
    likes: 854,
    comments: 19,
    caption: 'Focus, precision, and a lot of warmth. Sorting the latest Gesha lot from Costa Rica. 🇨🇷🤎 #coffeeroaster #origin #specialtycoffee'
  },
  {
    id: '3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABR0ANkJ5s9pGWXeuPxgHHSPJqxmmOZ0S6t8CzYApUyjOhSZdn4Z9ibTc_s7bXDz_il_tI2o3OGHDk_1h9FKzXjTB3_-SKealxif-EkyFVXgdFL33ACXZSqYHxtRkRc82-J6AptjfSwZvrKYqOLaebLtSgRDctWRRHvZjQMxV98Hv9qdDWf-7IXUtyapj1DKS5iMxYacNj_V-j3jmto2_LFtzWePEhFiFj-7Q04vA4EJIcOlGjV8te',
    likes: 1533,
    comments: 67,
    caption: 'Rainy West Village days require leather journals and steaming mugs. 🌧️📖☕️ #rainydays #cosyspot #coffeelover'
  },
  {
    id: '4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXv1sWcLKrBymkuq8-Z9xnC6x4Zxl9pOMNVwoe5Wqqudc9C2aGo3iurnH7zvMuQcMDv0vE7xhymlNlgv_WtlOPuFix_8PxbDo8NujrBsMS1EFKuoYavuaDSQ9lI3p0Zocgyg3LuQadC6yCBMuVGU-VDJlxUhh-KXTzCRFcgaiG-KVSYC6_lgi0b7pXaZhl40E64bH356WT_VTcQJeTnbItkX6G4kL-eir3Rlf4h0OalXKjHC9ZFrE4',
    likes: 922,
    comments: 22,
    caption: 'Clean lines, precise temperatures. Calibrating the custom-plated espresso group heads. ⚙️📐 #designculture #coffeetech'
  },
  {
    id: '5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmhVhUb9_8UVtTZrVc1hP1lQFxGMezwnKzQJowznXMB6uwG_174dLHoe_JTDr6ZH_yG-B_8easG5AgmIHvLzTzSChVNbV0C_LlAksu5FBiSCdU9xXcdcGzFo786SBWOdiygH6CHTtytT5Xqv73RhQ0hpQ5MAqZn91mEF7sof4Wi7rzAS1Dxjg92jCzNrOFfa6uIsCEp2ahep7o8E1mv4nlJjSi7Orruim_RWrvmOsXcl_WpAJQVAes',
    likes: 1109,
    comments: 31,
    caption: 'The crackle of the roast. Unlocking the honey and caramelized stone fruit notes. 🔥🍒 #specialtyroaster #craftsmanship'
  },
  {
    id: '6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA74Ob2zrtyXB5T3Kx1rXHrJrnjj1OQ6uSTtITXBcsxlXEfXRlh1C0_C4DnD_-VKr6kwduE8FuU6UjhFs9NUQ_O49tKUYG6nhSM5xnsgN-6eyGn2w-6UiHOQUuNY7qAwHjSJuwUVxE-ZA0KChfbK6nw_wx1kLyLAZ6VoAdFVofXWcE7VH2Xgb9Yyt13mXnbnZL55bClZMxhlf24oI6tX-FV5NyRiH7gcFGOjpaFJrUJfR6UlIdu8JB7',
    likes: 1782,
    comments: 89,
    caption: 'Phoenix art. Unrivaled micro-foam control by our lead master barista. 🦜☕️ #latteart #freepour #coffeeart'
  }
];

export const MAP_LANDMARKS = [
  { name: 'The Coffee Corner', x: 50, y: 55, type: 'shop', desc: '42nd Artisanal Ave, West Village' },
  { name: 'Washington Square Arch', x: 80, y: 35, type: 'park', desc: 'Iconic neighborhood marble archway' },
  { name: 'Bleecker Street Records', x: 30, y: 70, type: 'store', desc: 'Vintage analog music hub' },
  { name: 'West 4th subway station', x: 45, y: 25, type: 'subway', desc: 'Direct transit gateway' },
  { name: 'Jefferson Market Library', x: 20, y: 30, type: 'culture', desc: 'Stately gothic public landmark' }
];
