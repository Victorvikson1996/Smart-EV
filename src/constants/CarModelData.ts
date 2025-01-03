import { CarBrand } from '../types';

export const EV_CAR_BRANDS: CarBrand[] = [
  {
    id: '1',
    name: 'Tesla',
    image: 'https://i.ibb.co/RPrGpLP/icons8-tesla-128.png',
    models: [
      {
        id: '1',
        name: 'Model S',
        image:
          'https://e7.pngegg.com/pngimages/298/158/png-clipart-tesla-model-x-tesla-motors-car-2018-tesla-model-s-tesla-driving-fiat-500-thumbnail.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image: 'https://www.svgrepo.com/show/503330/ev-plug-tesla-s.svg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Nissan',
    image: 'https://i.ibb.co/LxHFCpD/icons8-nissan-80.png',
    models: [
      {
        id: '1',
        name: 'Leaf',
        image:
          'https://360view.3dmodels.org/zoom/Nissan/Nissan_Leaf_Mk2_2018_1000_0001.jpg',
        chargerTypes: [
          {
            id: '1',
            name: 'CHAdeMO',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-chademo-icon-512x512-lqv5kq7i.png'
          },
          {
            id: '2',
            name: 'Type 2',
            image: 'https://easycharging.app/assets/img/plugs/type-2.svg.png'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Volkswagen',
    image: 'https://i.ibb.co/L9shz1v/icons8-volkswagen-100.png',
    models: [
      {
        id: '1',
        name: 'ID.4',
        image: 'https://i.ibb.co/PDybRT5/volkswagen-id4.png',
        chargerTypes: [
          {
            id: '1',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Mercedes',
    image: 'https://i.ibb.co/JjWb5LJ/icons8-mercedes-100.png',
    models: [
      {
        id: '1',
        name: 'EQC',
        image: 'https://i.ibb.co/vkQmVVn/mercedes-eqc.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image: 'https://easycharging.app/assets/img/plugs/type-2.svg.png'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Renault',
    image: 'https://i.ibb.co/QYmkZZg/icons8-renault-100.png',
    models: [
      {
        id: '1',
        name: 'Zoe',
        image: 'https://i.ibb.co/CQKhCNy/renault-zoe.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image: 'https://easycharging.app/assets/img/plugs/type-2.svg.png'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'BMW',
    image: 'https://i.ibb.co/wzSsJCN/icons8-bmw-100.png',
    models: [
      {
        id: '1',
        name: 'i3',
        image: 'https://i.ibb.co/xCyk3r5/bmw-i3.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image: 'https://easycharging.app/assets/img/plugs/type-2.svg.png'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Volvo',
    image: 'https://i.ibb.co/mtFhy4j/icons8-volvo-50.png',
    models: [
      {
        id: '1',
        name: 'XC40 Recharge',
        image: 'https://i.ibb.co/6Rcsxf2/volvo-xc40.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image: 'https://easycharging.app/assets/img/plugs/type-2.svg.png'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ]
      }
    ]
  }
];
