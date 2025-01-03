import { randNumber } from '@ngneat/falso';
import { CarBrand } from './Carmodel';

export function arrayOf<T>(
  generator: () => T,
  options: { minLength: number; maxLength: number }
) {
  return new Array(
    randNumber({ min: options.minLength, max: options.maxLength })
  )
    .fill(null)
    .map(generator);
}

export const _EV_CAR_BRANDS: CarBrand[] = [
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
  }
];
