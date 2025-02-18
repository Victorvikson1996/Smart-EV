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
          'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-S-Exterior-Hero-Desktop-Global',
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
        ],
        batteryCapacityKwh: 100,
        chargeSpeedKw: 250,
        typicalChargeSpeedKw: 120
      },
      {
        id: '2',
        name: 'Model 3',
        image:
          'https://www.shop4tesla.com/cdn/shop/articles/tesla-model-3-uber-230000-km-und-tausende-euro-gespart-956682.jpg',
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
        ],
        batteryCapacityKwh: 75,
        chargeSpeedKw: 250,
        typicalChargeSpeedKw: 120
      },
      {
        id: '3',
        name: 'Model X',
        image:
          'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Utility-Desktop.png',
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
        ],
        batteryCapacityKwh: 100,
        chargeSpeedKw: 250,
        typicalChargeSpeedKw: 120
      },
      {
        id: '4',
        name: 'Model Y',
        image:
          'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-2-Redesigned-Desktop.png',
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
        ],
        batteryCapacityKwh: 75,
        chargeSpeedKw: 250,
        typicalChargeSpeedKw: 120
      },
      {
        id: '5',
        name: 'Cybertruck',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg/2560px-2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg',
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
        ],
        batteryCapacityKwh: 200,
        chargeSpeedKw: 250,
        typicalChargeSpeedKw: 120
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
          'https://www-europe.nissan-cdn.net/content/dam/Nissan/fr/vehicles/LEAF/22TDIEULHD_B12P_LEAF_N-CONNECTA_001.png',
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
        ],
        batteryCapacityKwh: 40,
        chargeSpeedKw: 50,
        typicalChargeSpeedKw: 22
      },
      {
        id: '2',
        name: 'Ariya',
        image:
          'https://ms-prd-nna.use.mediaserver.heliosnissan.net/iris/iris?resp=png&bkgnd=transparent&pov=E04&width=1600&height=900&w=8200&h=5000&x=900&y=1000&vehicle=8_FE0&paint=GAT&fabric=G&brand=nisnna&sa=1_V,2_SG,4_A,5_L,6_D,7_9,11_3,12_U,13_A,16_A,17_L,18_A,SHADOW_ON,PI_ON,PE_ON,2025',
        chargerTypes: [
          {
            id: '1',
            name: 'CHAdeMO',
            image:
              'https://ae-pic-a1.aliexpress-media.com/kf/S8e7ea67b4bf341f09eaffc789df1cd35K.jpg_960x960q75.jpg_.webp'
          },
          {
            id: '2',
            name: 'Type 2',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qlOYNStuoS0_oDumLSsWFMq9ScPk3_U-TY-INEvPOf1brmLj8V6_IcTwBWgQrbcwDj0&usqp=CAU'
          }
        ],
        batteryCapacityKwh: 87,
        chargeSpeedKw: 130,
        typicalChargeSpeedKw: 50
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
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/H4sIAAAAAAAA_12Uva4dNRCATxIlQRRBgFCEaNERUiTG3v8tjlASOgRKgUKR4mq867V37f05ttd77lY8D8pD8B40vAAVDQ0Sc-9JhTTSpxnP2GOPZ97_dXi8usOjd-9e_fDvl18o9Uf58HC4LIfD4QHZH7579f7v5_88-ejnPz-Yn3x1eBxWJ-YH5PLm4cf9iErCsEj1yeEpmQ6PDoenvxJ-v1MOz56tzi7ocPy2lWJVn37TdFVWYFqnWZpiXjLZsAqTpKg6mbeVYDU2rO54-dnh8Pg3tBbaYpw7TLPOzVNYGpAJT9qOL9jfy-2dDJzEtRXJxvI7aTnJrVIkbSOsTrzXmen2bmShhYQlOXwdXK-UdDeju9FLAjx7wQMPkBcvdgOImKmUsEqGgALXlhPmQjOC44sElC3TO6AamSIXHXlLa73I1o5gVaQAGzNPmEK1nwG9LC53UBLJ049qpDXv84HCA_JLQhBDLYBOq7eB4LEibYvVkIJAzY0ghIFrQuSWNEqpUyCsEJSnsMqIGsS8cU8BAVkkl-DqnYHY2jowaDQmOodmbhpeQRMuamPQokt9Atenglb2aYfQdpoPd6ATyKWLinGQjZx6QruVaEEumqoH0vfldge_1hI6bBmFd3It6Jqd3iKFd3bEW8Loe0-IvlSE3XeUtWplbltQcqrUAspodqsI0bIM1DhPrAC1-GJkoBxWIQXlF8V30HKr6AV1r_qJEXw6raANGp2B9lvVO9Bra-i8fvJrjoSQTSn0zme2AIPOVAqM3dktBzMuZ1cTfEZlNLNOQ0KI-d6B8Zg3ZPSroduaVRuTgsUmNwys0CmV3zbL-VyDbWfpS7ASLbOEidN5Vm093db2WN1jtLS1NSgjaaYpCw12duVCmsNkXwiRqgvWy8oFGHuTtgmMRsqRMAfLJUwYyzXAPFlpc7h2A2FUSwrXroBFYUcFX5QpFwHXJgGHyCdLaJvEEeaqFeCaWTpau-8ggikNabIfkoJgI9XI-ZieNbi1m_YMPIqiScALV0UFvtWZZASnqPxeYuwL8N2eUN29MvVCAb2YMiTI1KYEnSHB4HAhl0lX9DX8POWXAfzizpoT1rLW4J0u6Ltduxd86JJBEDQTDSGogeIC5UdJRBdLwuaqS0nw1URJ7CubBAQTM1NAWKxgFQTX5R0nbGmDEOhidoAQ5TmmELaVezLeLlxeIArDQwWxE3xIIIZY7xGuEwauIwY2j6UsCT5TG1wnDuwozlsOu3DJhvBh6OwmpvR79tHW9OS798xp2Fddj-w7OcWe5tsop3B6-8vN69dvk5tXs22PW98GfeJ1wo5a9kqHU12wI9pF4ym4VR4bHKXD08u3b5Lvb17eJDeM8SNONJdDP0_-9NNd0NEHKV0_KZyUlSfabJxbaZ2MvSev049vkqOys0D6f5uRt16eVzk15Hn0zbzI_1n5cZQBWxpZUbr7DZLPH1EG_wE1MJxHTgYAAA.webp?width=648',
        chargerTypes: [
          {
            id: '1',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ],
        batteryCapacityKwh: 77,
        chargeSpeedKw: 125,
        typicalChargeSpeedKw: 50
      },
      {
        id: '2',
        name: 'ID.3',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/H4sIAAAAAAAA_y2Uv-4cNRDHL_kpBFEEAUIRPTohRWLs_b_FCSWhQ6AUKBQpTuNdr71n75-zvd67rXgZujwE70HDC1DR0CAxx0Ua6SOPv_bYnvG8_2v3ZHG7h3fvXv3w71dfKvVH-Xi3u8y73e4R-R-_e_X-7-f_fPTxz39-cD_5bfckLE5Mj0jy5vEn_YBKwmmW6tPdU3LtHna7p78Sfr8Nds-eLc7O6HD4tpViUZ9904m8lqlkec2zPJUZKwpRpGXCiyYTZdclLKnLLKk_p1gZWgttMUwdplnnpjHMDUiepMbw-SRuZvKbeU62FuxmkpNds-vNFJKhwKVNgDbO4evgeqWkOw7uqOcEePZCM-SQFy82B4iYqZSwSIbwYR2KqdCc4PgsAWXLmwioBqZIoiNvGWAvsqUjWBVJaWPmCWOotjOgl8XlBiWRlH5QA815n59oeUB-oQhBnOoLULR6PRE8Vg3gGqtTCgI1N0gIJ7YQIrc0oiN1CoQVgs4prDKClNPKPSEgi4Lg6o2BWNs6cGg0JjqHZmqahEETLmpl0DbC6gRa2acdQttpfrqBtqa5LirGQTZy7AntWqIFOesKE5C-L9cb_FJL6LBltLzTa-wy6OyAVwbd4HtPiL5UhM13dE7Vyty2oORYqRMoo9lVEqJlCahhGlkBymEVUlB-VnwD3at-ZASfjgtog0ZnoP1a9RH00hqK0I8hI0nvfGYLMOhMpcDYjV05mGE-u5rgM8qR8Zg3NyyG7mAWbUwKFpvcMLBCp5RN28woOdh2kr4EK9EySxj5SEq19nQV22OlMsJgQwLWoIzkNE1ZaLCTK2caOUy2mRApWWC9rJyHoTcp1dJgpBwIUxjoQUaM5RJgGq20Ocw4qDmDWWEXGMGUM8K9yuFe5nCvc3CIfLSEtil6wlS1AlwzSUdzrSkNQfanrAbnY3qW4JZu3DLwKIomAS9cFWfwrc4kIzhVBfASY1-A77aE0u-Vqeksvhdj2hJkalOCzpBg8HQhyagryrSfxvxyAj-7M30SPy_lzel0QWXjvc5MBz50Cd3BB82EJESGhOhiqcCvvhop7LawUUAwMTMFhNkKVkFwXd5xCD5m2EGI8hxTCNeZywtEYXioIHaCnxKIIdb01e4NAO4dAFaPpSwJPlMe7g0B7h0BNhTnNYdNuGSlUTew0MJmYkqlsQ22pvfcvGdOw7boemDfyTH21H8GOYbD21-Or1-_TY6vJtvu174N-sDrhO217JUOh7pge7SzxkNwi9w3OEiHh5dv3yTfH18ekyNjfI8j9c3QT6M__HRbtPdBStePCkdl5YE2G6ZWWidj70l1-PFNsld2EkjFtRp59fK8yLEh5X6QAVtqJFG6_6XJFw8U6z-6Z5s12AUAAA.webp?width=648',
        chargerTypes: [
          {
            id: '1',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ],
        batteryCapacityKwh: 58,
        chargeSpeedKw: 100,
        typicalChargeSpeedKw: 50
      },
      {
        id: '3',
        name: 'ID.Buzz',
        image:
          'https://assets.volkswagen.com/is/image/volkswagenag/ib200370on_technical_data_teaser_16x9?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
        chargerTypes: [
          {
            id: '1',
            name: 'CCS',
            image:
              'https://static-00.iconduck.com/assets.00/ev-plug-ccs2-icon-1561x2048-fzg4f8cv.png'
          }
        ],
        batteryCapacityKwh: 77,
        chargeSpeedKw: 170,
        typicalChargeSpeedKw: 50
      },
      {
        id: '4',
        name: 'ID.5',
        image:
          'https://www.volkswagen.fr/app/offres/media/cache/r/widen_1024_webp/xn-GESC5vT_yDeJVDaSOJ6FUENseMuUGcRNstNJsVGiTIMUO.webp',
        chargerTypes: [
          {
            id: '1',
            name: 'CCS',
            image:
              'https://shop.evchargersdirect.co.uk/cdn/shop/products/1250__8_1024x1024@2x.jpg?v=1588333415'
          }
        ],
        batteryCapacityKwh: 77,
        chargeSpeedKw: 135,
        typicalChargeSpeedKw: 50
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
        image:
          'https://static.wixstatic.com/media/24c046_e000a14534fe497f807d1566f0581092~mv2.jpeg/v1/fill/w_1028,h_577,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/EQC%20(1).jpeg',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 80,
        chargeSpeedKw: 110,
        typicalChargeSpeedKw: 50
      },
      {
        id: '2',
        name: 'EQA',
        image:
          'https://www.mercedes-benz.fr/content/dam/hq/passengercars/cars/eqa/eqa-saloon-h243-fl-pi/overview/highlights/11-2024/images/mercedes-benz-eqa-h243-highlights-exterior-3302x1858-11-2024.jpg/1736783860296.jpg?im=Resize=(1280);Crop,rect=(0,0,1280,720)',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 66.5,
        chargeSpeedKw: 100,
        typicalChargeSpeedKw: 50
      },
      {
        id: '3',
        name: 'EQB',
        image:
          'https://www.mercedes-benz.fr/content/dam/hq/passengercars/cars/eqb/eqb-x243-fl-pi/overview/highlights/08-2023/images/mercedes-benz-eqb-x243-highlights-exterior-3302x1858-08-2023.jpg/1697199840560.jpg?im=Resize=(1280);Crop,rect=(0,0,1280,720)',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 66.5,
        chargeSpeedKw: 100,
        typicalChargeSpeedKw: 50
      },
      {
        id: '4',
        name: 'EQS',
        image:
          'https://www.mercedes-benz.fr/content/dam/hq/passengercars/cars/eqs/eqs-v297-pi/overview/exterior-highlights/02-2024/images/mercedes-benz-eqs-v297-exterior-hotspot-start-3302x1858-02-2024.jpg/1712754333727.jpg?im=Resize=(1680);Crop,rect=(0,0,1680,945)',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 107.8,
        chargeSpeedKw: 200,
        typicalChargeSpeedKw: 100
      },
      {
        id: '5',
        name: 'EQV',
        image:
          'https://www.mercedes-benz.fr/content/dam/hq/passengercars/cars/eqv-fl-23/overview/mercedes-benz-eqv-exterior-highlight-SSPIP152008.jpg/1705504715954.jpg?im=Resize=(1680);Crop,rect=(0,0,1680,945)',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 90,
        chargeSpeedKw: 110,
        typicalChargeSpeedKw: 50
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
        image:
          'https://cdn.group.renault.com/ren/master/renault-new-cars/product-plans/zoe/lr-b10-zoe/lr-b10-zoe-ph2/2560x1440-responsive-format/renault-zoe-neo-hero-zone-desktop-001.jpg.ximg.large.webp/10fe30c35e.webp',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          }
        ],
        batteryCapacityKwh: 52,
        chargeSpeedKw: 50,
        typicalChargeSpeedKw: 22
      },
      {
        id: '2',
        name: 'Kangoo Z.E.',
        image:
          'https://cdn.group.renault.com/ren/fr/product-plans/kangoo-van-e-tech/kangoo-e-tech-R-DAM_1536791.jpg.ximg.mediumx2.webp/3551c6c190.webp',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          }
        ],
        batteryCapacityKwh: 33,
        chargeSpeedKw: 22,
        typicalChargeSpeedKw: 7
      },
      {
        id: '3',
        name: 'Twingo Z.E.',
        image:
          'https://cdn.group.renault.com/ren/fr/product-plans/twingo/Twingo-Ice-2560x1440.jpg.ximg.large.webp/fa04f1ac2b.webp',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          }
        ],
        batteryCapacityKwh: 22,
        chargeSpeedKw: 22,
        typicalChargeSpeedKw: 7
      }
    ]
  },

  // Previous brands...
  {
    id: '6',
    name: 'BMW',
    image: 'https://i.ibb.co/wzSsJCN/icons8-bmw-100.png',
    models: [
      {
        id: '1',
        name: 'i3',
        image:
          'https://www.bmw.fr/content/dam/bmw/common/all-models/i-series/i3/2017/model-card/BMW-i3_ModelCard.png/jcr:content/renditions/cq5dam.resized.img.585.low.time1537265685652.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 42,
        chargeSpeedKw: 50,
        typicalChargeSpeedKw: 22
      },
      {
        id: '2',
        name: 'i4',
        image:
          'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-2545J3qAHyFn7o9Mb3d08bgyFnO9uOyJR%251JHQAW7%25bLShW8Jg41rjGQcRo9J5BJiyFnawoX8rQbCcYiCjHecRofJ0GU6yFnaBcRotJRRIMESNdzB1yJRIPPMESVQ1%253Fhs3%25cRot7Z%25z315W7%253ubDHJQiMb3MQlBglUEO%25cRScHbziMbnMddoRyJGy5mURrQ%25r9si8W8zWuBwGqogqaGNbl3ilUEORcRScH809MbnMdgBuyJGy5iY3rQ%25r9S1JW8zWunAjqogqaJoDl3ilUQT9cRScHFBsMbnMdoPiyJGy5Q3grQ%25r98XHW8zWuEUQqogqaD%25Fl3ilU%258jcRScH4%25oMbnMdgsoyJGy5QsnrQ%25r9sEGW8zWuBD%25qogqaY77l3ilURQacRScHb8HMbnMdgsYyJGy5iKnrQ%25r9oSHW8zWunm7qogqaDJEl3ilURI8cRScH48CMbnMdjIdyJGy5BdarQ%25r9K0IW8zWubIKqogqaY20l3ilU%25KmcRScHHJ9MbnMdj7oyJGy5Q4ErQbZUe8nIulBgbRKGl38vontCcYiR485',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 80.7,
        chargeSpeedKw: 210,
        typicalChargeSpeedKw: 100
      },
      {
        id: '3',
        name: 'iX',
        image:
          'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331RYechZ7dyKBJHS92mvhO20AdKKM4eC9iwWNRduIwQ081ZmQGwgRHErZbF9cvDLRrkIVpZ7d2Cw1pC4L9Q48E5lkboMf4mAzTQLwp7TVsgl6JzKGwgiEPyTpRBYnHZ0KExiuZ7d5DomkqRCXQtE6wzXtb7GqmA89R8yMu2j3D%2530hjDdnuERYHpRBdO7W0KE9InTDOYgMdvgL3h8H7EpCxEarjlfuzHNxl4bSht0598lVAfoUMA8ZobMsayjnt61agOybWBKnvIT91leO2B3iEXVIjedwsj3BDMztrDzeqhk7ZXDMLoACRBghJHFl59Aou%25KXhsFHSfWQoeu%25V1PaHMmfNEbn%25Na10s9Ofe6E4riI1U3scZwBEXwrxRtesCzZ857Mr2IRUgChZjR5GvloRUjgp2XH5Gzv6jQ%25g0y2YDafvLZjmqn1hrJDyLOEozyqTJIsHkeL3uBr%25DCJdSeZ4gmuzVMRcKDSkNh5xWlVA0og8x%25NF4HvUtX0Kc%252Gy74WxfjtgzcP81D8IhxbUEqiPV89GsLwb6UiprJt9B',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 111.5,
        chargeSpeedKw: 200,
        typicalChargeSpeedKw: 100
      },
      {
        id: '4',
        name: 'iX3',
        image:
          'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-2545J3qAHyFn7o9Mb3d08bgyFnO9uOyJR%251JHQAW7%25bLShW8Jg41rjGQcRo9J5BJiyFnaG4qvrQbCcYiCjHecRofJ0GU6yFnaBcRotJRRIMESNdg88yJRIPPMESVQ1%253Fhs3%25cRot7Z%25z315W7%253ubGbJQ7Mb3MQlBglUEO%25cRScHbziMbnMd0ViyJGy5BO5rQ%25r9sifW8zWuo8VqogqaGSel3ilUUvmcRScHbpzMbnMdd8uyJGy5m3SrQ%25r993DW8zWu3xJqogqaYV6l3ilUtuucRScHFpbMbnMdoBuyJGy5iYarQ%25r9SERW8zWunAQqogqaDC8l3ilUQT9cRScHFBsMbnMdoPiyJGy5Q3grQ%25r9YaJW8zWunJjqogqaYM7l3ilUCzjcRScH4%25oMbnMdg3uyJGy53RErQ%25r9Yi5W8zWuoD%25qogqaaU4l3ilU%25J0cRScH40iMbnMdjmSyJGy57EErQ%25r98R5W8zWuobuqogqaG4zl3ilU%25KBcRScH48CMbnMdjIdyJGy5m3XrQ%25r99ddW8zWuKbIqogqaJNQl3ilUEtBcRScHzDsMbnMdm3syJGy5i03rQ%25r9SeUW8zWuu3HqogqaYEJl3ilURK0cRox9Dbg2drjGg8gerQbpJg1sW7%258KbU',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 74,
        chargeSpeedKw: 150,
        typicalChargeSpeedKw: 75
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
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 78,
        chargeSpeedKw: 150,
        typicalChargeSpeedKw: 75
      },
      {
        id: '2',
        name: 'C40 Recharge',
        image: 'https://i.ibb.co/0j1Y5kF/volvo-c40.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 78,
        chargeSpeedKw: 150,
        typicalChargeSpeedKw: 75
      },
      {
        id: '3',
        name: 'EX90',
        image: 'https://i.ibb.co/0j1Y5kF/volvo-ex90.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 111,
        chargeSpeedKw: 250,
        typicalChargeSpeedKw: 100
      }
    ]
  },
  {
    id: '8',
    name: 'BYD',
    image: 'https://i.ibb.co/ychHCxjP/BYD.png',
    models: [
      {
        id: '1',
        name: 'Han EV',
        image: 'https://i.ibb.co/0j1Y5kF/byd-han.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 85,
        chargeSpeedKw: 120,
        typicalChargeSpeedKw: 50
      },
      {
        id: '2',
        name: 'Tang EV',
        image: 'https://i.ibb.co/0j1Y5kF/byd-tang.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 86,
        chargeSpeedKw: 120,
        typicalChargeSpeedKw: 50
      },
      {
        id: '3',
        name: 'Atto 3',
        image: 'https://i.ibb.co/0j1Y5kF/byd-atto3.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 60,
        chargeSpeedKw: 88,
        typicalChargeSpeedKw: 44
      }
    ]
  },
  {
    id: '9',
    name: 'Audi',
    image: 'https://i.ibb.co/Rpvc0L9M/audi.png',
    models: [
      {
        id: '1',
        name: 'e-tron',
        image: 'https://i.ibb.co/0j1Y5kF/audi-e-tron.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 95,
        chargeSpeedKw: 150,
        typicalChargeSpeedKw: 50
      },
      {
        id: '2',
        name: 'Q4 e-tron',
        image: 'https://i.ibb.co/0j1Y5kF/audi-q4-e-tron.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 82,
        chargeSpeedKw: 125,
        typicalChargeSpeedKw: 50
      },
      {
        id: '3',
        name: 'e-tron GT',
        image: 'https://i.ibb.co/0j1Y5kF/audi-e-tron-gt.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 93.4,
        chargeSpeedKw: 270,
        typicalChargeSpeedKw: 150
      }
    ]
  },
  {
    id: '10',
    name: 'Hyundai',
    image: 'https://i.ibb.co/C5Bmc4Kx/Hyundai.jpg',
    models: [
      {
        id: '1',
        name: 'Kona Electric',
        image: 'https://i.ibb.co/0j1Y5kF/hyundai-kona-electric.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 64,
        chargeSpeedKw: 100,
        typicalChargeSpeedKw: 50
      },
      {
        id: '2',
        name: 'Ioniq 5',
        image: 'https://i.ibb.co/0j1Y5kF/hyundai-ioniq5.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 77.4,
        chargeSpeedKw: 220,
        typicalChargeSpeedKw: 150
      },
      {
        id: '3',
        name: 'Ioniq 6',
        image: 'https://i.ibb.co/0j1Y5kF/hyundai-ioniq6.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 77.4,
        chargeSpeedKw: 220,
        typicalChargeSpeedKw: 150
      }
    ]
  },
  {
    id: '11',
    name: 'Kia',
    image: 'https://i.ibb.co/DfZSH9BQ/kia.png',
    models: [
      {
        id: '1',
        name: 'Niro EV',
        image: 'https://i.ibb.co/0j1Y5kF/kia-niro-ev.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 64.8,
        chargeSpeedKw: 80,
        typicalChargeSpeedKw: 50
      },
      {
        id: '2',
        name: 'EV6',
        image: 'https://i.ibb.co/0j1Y5kF/kia-ev6.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 77.4,
        chargeSpeedKw: 240,
        typicalChargeSpeedKw: 150
      },
      {
        id: '3',
        name: 'Soul EV',
        image: 'https://i.ibb.co/0j1Y5kF/kia-soul-ev.png',
        chargerTypes: [
          {
            id: '1',
            name: 'Type 2',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015-12-23_Typ-2-Ladestecker.jpg/300px-2015-12-23_Typ-2-Ladestecker.jpg'
          },
          {
            id: '2',
            name: 'CCS',
            image:
              'https://cdn-bodfj.nitrocdn.com/PkAzgiiWmWHBbfSpqeQLrEoLMQsjWQTV/assets/images/optimized/rev-08e74e5/wp-content/uploads/2019/02/ccs-connector.jpg'
          }
        ],
        batteryCapacityKwh: 64,
        chargeSpeedKw: 100,
        typicalChargeSpeedKw: 50
      }
    ]
  }
];
