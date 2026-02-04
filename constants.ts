import { Product } from './types';

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'Все товары',
  mom_care: 'Уход за мамой',
  pumping: 'Сцеживание',
  storage: 'Хранение молока',
  feeding: 'Кормление',
};

export const PRODUCTS: Product[] = [
  // Уход за мамой (Prenatal/Postnatal Care)
  {
    id: '68710',
    name: 'Охлаждающая сыворотка для подготовки к родам (125 мл)',
    price: 6180,
    category: 'mom_care',
    isNew: true,
  },
  {
    id: '68810',
    name: 'Успокаивающее масло для подготовки к родам (200 мл)',
    price: 6180,
    category: 'mom_care',
    isNew: true,
  },
  {
    id: '69720',
    name: 'Послеродовые прокладки L (0-2 недели)',
    price: 2400,
    category: 'mom_care',
    isNew: true,
  },
  {
    id: '69730',
    name: 'Послеродовые прокладки M (2+ недели)',
    price: 1800,
    category: 'mom_care',
    isNew: true,
  },
  {
    id: '10305',
    name: 'Ланолин HPA (крем для сосков) 10 мл',
    price: 2880,
    category: 'mom_care',
  },
  {
    id: '44302',
    name: 'Ланолин HPA (крем для сосков) 40 мл',
    price: 6480,
    category: 'mom_care',
  },
  {
    id: '23110',
    name: 'Органический бальзам для сосков 60 мл',
    price: 8640,
    category: 'mom_care',
  },
  {
    id: '20054',
    name: 'Одноразовые вкладыши для груди №24',
    price: 1800,
    category: 'mom_care',
  },
  {
    id: '44265',
    name: 'Одноразовые вкладыши для груди №60',
    price: 3720,
    category: 'mom_care',
  },
  {
    id: '20382',
    name: 'Многоразовые вкладыши для груди (белые, 4 шт)',
    price: 6000,
    category: 'mom_care',
  },
  {
    id: '20387',
    name: 'Многоразовые вкладыши для груди (цветные, 8 шт)',
    price: 12000,
    category: 'mom_care',
  },
  {
    id: '10400',
    name: 'Компресс Therapearl 3-в-1 для груди',
    price: 7800,
    category: 'mom_care',
  },
  {
    id: '70280',
    name: 'Корректор формы соска (Latch Assist)',
    price: 3960,
    category: 'mom_care',
  },
  {
    id: '70173',
    name: 'Накладки на соски для кормления M (24 мм)',
    price: 4050,
    category: 'mom_care',
  },
  {
    id: '70193',
    name: 'Накладки на соски для кормления S (20 мм)',
    price: 4050,
    category: 'mom_care',
  },
  {
    id: '71095',
    name: 'Подушка для кормления (нарукавник)',
    price: 9960,
    category: 'mom_care',
  },
  {
    id: '99999',
    name: 'Матрасик для купания новорожденных',
    price: 7200,
    category: 'mom_care',
  },

  // Сцеживание (Pumping)
  {
    id: '50810',
    name: 'Силиконовый молокоотсос-коллектор',
    price: 6000,
    category: 'pumping',
  },
  {
    id: '50555',
    name: 'Ручной молокоотсос (Manual Breast Pump)',
    price: 12000,
    category: 'pumping',
  },
  {
    id: '53065',
    name: 'Электрический молокоотсос 2-в-1',
    price: 63000,
    category: 'pumping',
  },
  {
    id: '53363',
    name: 'Электрический молокоотсос 2-в-1 (Перезаряжаемый)',
    price: 72000,
    category: 'pumping',
    isNew: true,
  },

  // Хранение (Storage)
  {
    id: '44204',
    name: 'Пакеты для хранения грудного молока №25',
    price: 5220,
    category: 'storage',
  },
  {
    id: '40055',
    name: 'Пакеты для хранения грудного молока №50',
    price: 7800,
    category: 'storage',
  },

  // Кормление (Feeding)
  {
    id: '75420',
    name: 'Бутылочка для кормления 160 мл',
    price: 3500,
    category: 'feeding',
  },
  {
    id: '75430',
    name: 'Бутылочка для кормления 160 мл (2 шт)',
    price: 6750,
    category: 'feeding',
  },
  {
    id: '75440',
    name: 'Бутылочка для кормления 240 мл',
    price: 3800,
    category: 'feeding',
  },
  {
    id: '75450',
    name: 'Бутылочка для кормления 240 мл (2 шт)',
    price: 7000,
    category: 'feeding',
  },
  {
    id: '76310',
    name: 'Набор: Бутылочки (160/240 мл) + 3 соски',
    price: 7500,
    category: 'feeding',
  },
  {
    id: '77240',
    name: 'Стеклянная бутылочка 160 мл',
    price: 5500,
    category: 'feeding',
  },
  {
    id: '77250',
    name: 'Стеклянная бутылочка 240 мл',
    price: 5700,
    category: 'feeding',
  },
  {
    id: '75890',
    name: 'Соска Natural Wave XS (Экстра-медленный, 2 шт)',
    price: 2970,
    category: 'feeding',
    isNew: true,
  },
  {
    id: '75900',
    name: 'Соска Natural Wave S (Медленный поток, 2 шт)',
    price: 2970,
    category: 'feeding',
  },
  {
    id: '75910',
    name: 'Соска Natural Wave M (Средний поток, 2 шт)',
    price: 2970,
    category: 'feeding',
  },
  {
    id: '75920',
    name: 'Соска Natural Wave F (Быстрый поток, 2 шт)',
    price: 2970,
    category: 'feeding',
  },
];