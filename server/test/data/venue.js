'use strict'

module.exports = [
  {
    city: 'shanghai',
    description: 'The cosy Bella Napoli serves quality Italian classics, from an excellent tomato and mozzarella salad to its 15 stone-fired pizzas, all made with a chunky, fresh tomato sauce.',
    name: 'Bella Napoli',
    addresses: [
      {addressOne: 'Lane 946 Changle Lu', addressTwo: 'near Wulumuqi Lu', addressLocal: '长乐路946弄， 近乌鲁木齐路'},
      {
        addressOne: '73 Nanhui Lu', addressTwo: 'near Beijing Xi Lu', addressLocal: '南汇路73号, 近北京西路',
      }],
    contact: {
      phone: '5289 0806',
      web: 'bellanapoli-sh.com'
    },
    appliedTags: ['neapolitan'],
    menu: {
      items: [
        {
          name: 'Napoletana',
          price: 75,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano and parmesan cheese',
          featured: false
        },
        {
          name: 'Marinara',
          price: 80,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano, anchovies and parmesan cheese',
          featured: false
        },
        {
          name: 'Margherita',
          price: 85,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil and parmesan cheese',
          featured: true
        },
        {
          name: 'Diavola',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil, spicy salami, olives and parmesan cheese',
          featured: false
        },
        {
          name: 'Pizza di Guido - Guido\'s favourite',
          price: 100,
          localLang: '',
          desc: 'Mozarella, cherry tomato, spicy salami, gorgonzola, anchovies and parmesan cheese',
          featured: true
        },
        {
          name: 'Foccacia',
          price: 50,
          localLang: '',
          desc: 'Pizza bread with oregano, extra virgin olive oil and parmesan cheese',
          featured: false
        },
        {
          name: 'Contadina',
          price: 110,
          localLang: '',
          desc: 'Mozarella, cherry tomato, San Daniele ham, rocket and parmesan cheese',
          featured: true
        },
        {
          name: 'Bella Napoli',
          price: 95,
          localLang: '',
          desc: 'Mozarella, potatoes, sausage, cepes mushroom and parmesan cheese',
          featured: true
        },
        {
          name: 'Ortolana',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozarella, fresh basil, mushroom, eggplant, zucchini and parmesan cheese',
          featured: false
        },
      ],
      hasFeatured: false,
      hasVersions: true,
      specials: true
    }
  },
  {
    city: 'shanghai',
    description: 'From British pop-up restaurateur Nat Alexander and his partner Ken Shi, Homeslice is a no frills pizzeria with light nods to the New York origins of the main menu item; New York-style pizza -- big, oily slices served on paper plates that you fold in half like a sandwich to cram into your lovely drunken face.',
    name: 'Homeslice',
    addresses: [
      {
        addressOne: 'Found 158, 158 Julu Lu',
        addressTwo: 'near Ruijin Yi Lu, Huangpu district',
        addressLocal: '黄浦区巨鹿路158号，近瑞金一路'
      }
    ],
    contact: {
      phone: '5309 9332',
      web: '',
    },
    appliedTags: ['american', 'bar'],
    menu: {
      items: [
        {
          name: 'Cheese',
          localLang: '',
          desc: 'Cheese, Tomato',
          version: [{name: 'slice', price: 20}, {name: '20"', price: 150}]
        },
        {
          name: 'White',
          localLang: '',
          desc: 'Cheese, Tomato',
          version: [{name: 'slice', price: 25}, {name: '20"', price: 190}]
        },
        {
          name: 'Garlic Mushroom',
          localLang: '',
          desc: 'Mushroom, Cheese, Tomato',
          version: [{name: 'slice', price: 25}, {name: '20"', price: 190}]
        },
        {
          name: 'Pepperoni',
          localLang: '',
          desc: 'Pepperoni, Cheese, Tomato',
          version: [{name: 'slice', price: 25}, {name: '20"', price: 190}]
        },
        {
          name: 'Spicy Sausage',
          localLang: '',
          desc: 'Spicy Sausage, Ricotta, Jalapeno, Pickled Chili, Cheese, Tomato',
          version: [{name: 'slice', price: 30}, {name: '20"', price: 230}]
        },
        {
          name: 'Meat',
          localLang: '',
          desc: 'Pepperoni, Sausage, Onion, Cheese, Tomato',
          version: [{name: 'slice', price: 30}, {name: '20"', price: 230}]
        },
        {
          name: 'English Breakfast',
          note: '(Sat/Sun daytime only)',
          special: true,
          localLang: '',
          desc: 'Bacon, Sausage, Mushroom, Egg, Cheese, Tomato',
          version: [{name: '20"', price: 230}]
        },
        {
          name: 'Supercheese!',
          special: true,
          localLang: '',
          desc: 'Ricotta, Provolone Picante, Cheese, Tomato',
          version: [{name: 'slice', price: 20}, {name: '20"', price: 150}]
        },
        {
          name: 'Artichoke & Sausage',
          special: true,
          localLang: '',
          desc: 'Artichoke, Sausage, Parmesan Cream, Gremola',
          version: [{name: 'slice', price: 20}, {name: '20"', price: 150}]
        },

      ],
      hasFeatured: false,
      hasVersions: true, //todo needed?,
      specials: true,
    }
  },
  {
    city: 'shanghai',
    description: 'The cosy Bella Napoli serves quality Italian classics, from an excellent tomato and mozzarella salad to its 15 stone-fired pizzas, all made with a chunky, fresh tomato sauce.',
    name: 'UVA Wine Bar',
    addresses: [
      {addressOne: 'Lane 946 Changle Lu', addressTwo: 'near Wulumuqi Lu', addressLocal: '长乐路946弄， 近乌鲁木齐路'},
      {
        addressOne: '73 Nanhui Lu', addressTwo: 'near Beijing Xi Lu', addressLocal: '南汇路73号, 近北京西路',
      }],
    contact: {
      phone: '5289 0806',
      web: 'bellanapoli-sh.com'
    },
    appliedTags: ['bar', 'romana'],
    menu: {
      items: [
        {
          name: 'Napoletana',
          price: 75,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano and parmesan cheese',
          featured: false
        },
        {
          name: 'Marinara',
          price: 80,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano, anchovies and parmesan cheese',
          featured: false
        },
        {
          name: 'Margherita',
          price: 85,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil and parmesan cheese',
          featured: true
        },
        {
          name: 'Diavola',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil, spicy salami, olives and parmesan cheese',
          featured: false
        },
        {
          name: 'Pizza di Guido - Guido\'s favourite',
          price: 100,
          localLang: '',
          desc: 'Mozarella, cherry tomato, spicy salami, gorgonzola, anchovies and parmesan cheese',
          featured: true
        },
        {
          name: 'Foccacia',
          price: 50,
          localLang: '',
          desc: 'Pizza bread with oregano, extra virgin olive oil and parmesan cheese',
          featured: false
        },
        {
          name: 'Contadina',
          price: 110,
          localLang: '',
          desc: 'Mozarella, cherry tomato, San Daniele ham, rocket and parmesan cheese',
          featured: true
        },
        {
          name: 'Bella Napoli',
          price: 95,
          localLang: '',
          desc: 'Mozarella, potatoes, sausage, cepes mushroom and parmesan cheese',
          featured: true
        },
        {
          name: 'Ortolana',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozarella, fresh basil, mushroom, eggplant, zucchini and parmesan cheese',
          featured: false
        },
      ],
      hasFeatured: false,
      hasVersions: true,
      specials: true
    }
  },
  {
    city: 'shanghai',
    description: 'The cosy Bella Napoli serves quality Italian classics, from an excellent tomato and mozzarella salad to its 15 stone-fired pizzas, all made with a chunky, fresh tomato sauce.',
    name: 'Centrale',
    addresses: [
      {addressOne: 'Lane 946 Changle Lu', addressTwo: 'near Wulumuqi Lu', addressLocal: '长乐路946弄， 近乌鲁木齐路'},
      {
        addressOne: '73 Nanhui Lu', addressTwo: 'near Beijing Xi Lu', addressLocal: '南汇路73号, 近北京西路',
      }],
    contact: {
      phone: '5289 0806',
      web: 'bellanapoli-sh.com'
    },
    appliedTags: ['romana', 'delivery'],
    menu: {
      items: [
        {
          name: 'Napoletana',
          price: 75,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano and parmesan cheese',
          featured: false
        },
        {
          name: 'Marinara',
          price: 80,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano, anchovies and parmesan cheese',
          featured: false
        },
        {
          name: 'Margherita',
          price: 85,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil and parmesan cheese',
          featured: true
        },
        {
          name: 'Diavola',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil, spicy salami, olives and parmesan cheese',
          featured: false
        },
        {
          name: 'Pizza di Guido - Guido\'s favourite',
          price: 100,
          localLang: '',
          desc: 'Mozarella, cherry tomato, spicy salami, gorgonzola, anchovies and parmesan cheese',
          featured: true
        },
        {
          name: 'Foccacia',
          price: 50,
          localLang: '',
          desc: 'Pizza bread with oregano, extra virgin olive oil and parmesan cheese',
          featured: false
        },
        {
          name: 'Contadina',
          price: 110,
          localLang: '',
          desc: 'Mozarella, cherry tomato, San Daniele ham, rocket and parmesan cheese',
          featured: true
        },
        {
          name: 'Bella Napoli',
          price: 95,
          localLang: '',
          desc: 'Mozarella, potatoes, sausage, cepes mushroom and parmesan cheese',
          featured: true
        },
        {
          name: 'Ortolana',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozarella, fresh basil, mushroom, eggplant, zucchini and parmesan cheese',
          featured: false
        },
      ],
      hasFeatured: false,
      hasVersions: true,
      specials: true
    }
  },

  {
    city: 'shanghai',
    description: 'The cosy Bella Napoli serves quality Italian classics, from an excellent tomato and mozzarella salad to its 15 stone-fired pizzas, all made with a chunky, fresh tomato sauce.',
    name: 'Papa Johns',
    addresses: [
      {addressOne: 'Lane 946 Changle Lu', addressTwo: 'near Wulumuqi Lu', addressLocal: '长乐路946弄， 近乌鲁木齐路'},
      {
        addressOne: '73 Nanhui Lu', addressTwo: 'near Beijing Xi Lu', addressLocal: '南汇路73号, 近北京西路',
      }],
    contact: {
      phone: '5289 0806',
      web: 'bellanapoli-sh.com'
    },
    appliedTags: ['american', 'fast-food', 'delivery'],
    menu: {
      items: [
        {
          name: 'Napoletana',
          price: 75,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano and parmesan cheese',
          featured: false
        },
        {
          name: 'Marinara',
          price: 80,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano, anchovies and parmesan cheese',
          featured: false
        },
        {
          name: 'Margherita',
          price: 85,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil and parmesan cheese',
          featured: true
        },
        {
          name: 'Diavola',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil, spicy salami, olives and parmesan cheese',
          featured: false
        },
        {
          name: 'Pizza di Guido - Guido\'s favourite',
          price: 100,
          localLang: '',
          desc: 'Mozarella, cherry tomato, spicy salami, gorgonzola, anchovies and parmesan cheese',
          featured: true
        },
        {
          name: 'Foccacia',
          price: 50,
          localLang: '',
          desc: 'Pizza bread with oregano, extra virgin olive oil and parmesan cheese',
          featured: false
        },
        {
          name: 'Contadina',
          price: 110,
          localLang: '',
          desc: 'Mozarella, cherry tomato, San Daniele ham, rocket and parmesan cheese',
          featured: true
        },
        {
          name: 'Bella Napoli',
          price: 95,
          localLang: '',
          desc: 'Mozarella, potatoes, sausage, cepes mushroom and parmesan cheese',
          featured: true
        },
        {
          name: 'Ortolana',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozarella, fresh basil, mushroom, eggplant, zucchini and parmesan cheese',
          featured: false
        },
      ],
      hasFeatured: false,
      hasVersions: true,
      specials: true
    }
  },

  {
    city: 'shanghai',
    description: 'The cosy Bella Napoli serves quality Italian classics, from an excellent tomato and mozzarella salad to its 15 stone-fired pizzas, all made with a chunky, fresh tomato sauce.',
    name: 'Dominos',
    addresses: [
      {addressOne: 'Lane 946 Changle Lu', addressTwo: 'near Wulumuqi Lu', addressLocal: '长乐路946弄， 近乌鲁木齐路'},
      {
        addressOne: '73 Nanhui Lu', addressTwo: 'near Beijing Xi Lu', addressLocal: '南汇路73号, 近北京西路',
      }],
    contact: {
      phone: '5289 0806',
      web: 'bellanapoli-sh.com'
    },
    appliedTags: ['american', 'fast-food', 'delivery'],
    menu: {
      items: [
        {
          name: 'Napoletana',
          price: 75,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano and parmesan cheese',
          featured: false
        },
        {
          name: 'Marinara',
          price: 80,
          localLang: '',
          desc: 'Tomato sauce, garlic, oregano, anchovies and parmesan cheese',
          featured: false
        },
        {
          name: 'Margherita',
          price: 85,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil and parmesan cheese',
          featured: true
        },
        {
          name: 'Diavola',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozzarella, fresh basil, spicy salami, olives and parmesan cheese',
          featured: false
        },
        {
          name: 'Pizza di Guido - Guido\'s favourite',
          price: 100,
          localLang: '',
          desc: 'Mozarella, cherry tomato, spicy salami, gorgonzola, anchovies and parmesan cheese',
          featured: true
        },
        {
          name: 'Foccacia',
          price: 50,
          localLang: '',
          desc: 'Pizza bread with oregano, extra virgin olive oil and parmesan cheese',
          featured: false
        },
        {
          name: 'Contadina',
          price: 110,
          localLang: '',
          desc: 'Mozarella, cherry tomato, San Daniele ham, rocket and parmesan cheese',
          featured: true
        },
        {
          name: 'Bella Napoli',
          price: 95,
          localLang: '',
          desc: 'Mozarella, potatoes, sausage, cepes mushroom and parmesan cheese',
          featured: true
        },
        {
          name: 'Ortolana',
          price: 90,
          localLang: '',
          desc: 'Tomato sauce, mozarella, fresh basil, mushroom, eggplant, zucchini and parmesan cheese',
          featured: false
        },
      ],
      hasFeatured: false,
      hasVersions: true,
      specials: true
    }
  },
]
