// Content for the inner sport pages (/sports/:slug), rewritten from the client's original pages.
// `sport` matches a name in `sports` (data.js) for the field drawing.

export const sportPages = [
  {
    slug: 'athletic-track',
    sport: 'Athletic track',
    title: 'Athletic tracks',
    img: '/img/sports/athletic-track.jpg',
    lead: 'All-weather running tracks that help athletes build speed and technique, and keep them on their feet.',
    intro:
      'We lay running tracks in every common build: spray coat, full PU, EPDM, sandwich and prefabricated roll. A good track is flat, elastic and pressure-resistant, holds its colour for years and performs the same in sun or rain. Colours can be customised to your campus or stadium.',
    options: ['Spray coat', 'Full PU', 'EPDM', 'Sandwich system', 'Prefabricated roll'],
    specs: [
      ['Competition areas', '13 mm'],
      ['Training areas', '9 mm'],
      ['Extra-thick zones', '20–25 mm'],
      ['Colour', 'Custom'],
    ],
    sections: [
      {
        title: 'Why our tracks',
        items: [
          'Lighter, more eco-friendly materials',
          'Material use cut by 10–15%, which keeps costs down',
          'Low maintenance, with after-sales support',
          'Tested by recognised bodies, quality guaranteed',
          'Stable and long-lasting in every season',
          'One team from design to construction',
        ],
      },
    ],
  },
  {
    slug: 'badminton',
    sport: 'Badminton',
    title: 'Badminton courts',
    img: '/img/sports/badminton.jpg',
    lead: 'Indoor and outdoor badminton surfaces, from federation-approved vinyl to full wooden halls.',
    intro:
      'Our badminton range covers BWF-approved vinyl, roll-out mats and wooden floors, tested for the demands of both professional and community halls. Whether the court is for a club, a school or a residence, there is a surface that fits the budget without giving up player comfort.',
    options: ['BWF-approved vinyl', 'Built-in line mats', 'Zipper mats', 'Wooden flooring', 'PU flooring'],
    sections: [
      {
        title: 'On court',
        items: [
          'Balanced grip for quick, safe changes of direction',
          'Lightweight rolls that are easy to lay out and store',
          'Works as a temporary court for events',
          'Low-glare finish under hall lighting',
        ],
      },
      {
        title: 'Built-in line mats',
        items: [
          'Court lines sit inside the flooring, so they never wear off',
          'Clear top coat keeps the surface looking new',
          'Multi-layer reinforced PVC for durability',
          'Fibreglass mesh layer for a stable, flat court',
        ],
      },
      {
        title: 'Better for people and planet',
        items: ['Solvent, heavy-metal and phthalate-free', 'Low VOC', '100% recyclable', 'Contains recycled material'],
      },
    ],
  },
  {
    slug: 'basketball',
    sport: 'Basketball',
    title: 'Basketball courts',
    img: '/img/sports/basketball.jpg',
    lead: 'Courts for training and professional games, in wood, interlocking tiles or acrylic.',
    intro:
      'From FIBA-approved PP interlocking tiles to wooden flooring, our basketball surfaces come in a wide range of colours and are hygienic and easy to clean. Each type can be tuned for the bounce and ball speed you prefer, turning a plain outdoor area into a court people want to play on.',
    options: ['FIBA-approved PP tiles', 'Wooden flooring', 'Acrylic surfaces', 'Hybrid turf'],
    sections: [
      {
        title: 'Built to last',
        items: [
          'Highly wear-resistant top surface',
          'Dense inner layers with polyester mesh for long life',
          'Specially designed base that stops the court from shifting',
          'Easy to clean, with bright colours that stay',
        ],
      },
    ],
  },
  {
    slug: 'cricket',
    sport: 'Cricket',
    title: 'Cricket wickets & outfield',
    img: '/img/sports/cricket.jpg',
    lead: 'Wickets and outfields for amateur and professional cricket, indoors and out.',
    intro:
      'Our wickets give a consistent, even playing surface with good bounce and turn, and our outfield turf lets the ball race to the boundary while fielders dive without risk of injury. Run-up and roll-out wickets are available for practice and multi-use spaces.',
    options: ['ECB-certified wickets', 'Run-up wickets', 'Roll-out wickets', 'Outfield turf', 'Practice nets'],
    sections: [
      {
        title: 'Wickets',
        items: [
          'Consistent bounce and turn',
          'All-weather and quick-drying',
          'No maintenance needed',
          'Hard-wearing for heavy use, indoors or outdoors',
        ],
      },
      {
        title: 'Outfield',
        items: [
          'Fast-draining over a dynamic base',
          'Non-abrasive yarn that avoids skin burns',
          'Natural-rubber infill: no smell, less heat',
          'Pile height that cushions falls but keeps the ball fast',
        ],
      },
    ],
  },
  {
    slug: 'football',
    sport: 'Football',
    title: 'Football turf',
    img: '/img/sports/football.jpg',
    lead: 'FIFA-recognised artificial grass that turns dusty plots into pitches people play on every day.',
    intro:
      'Working with HybridTurf, we have delivered artificial football turf for indoor and outdoor facilities across India. Each pitch is built as a complete system, from the drainage base to the fencing, nets and floodlights.',
    options: ['Sand & rubber infilled turf', 'Five-a-side', 'Seven-a-side', 'Full-size pitches'],
    sections: [
      {
        title: "What's included",
        items: [
          'Sloped concrete base for proper drainage',
          'Optional rainwater harvesting from the pitch',
          'Crushed-stone sub-base',
          'Futsal goal posts with nets',
          'Chain link perimeter fencing',
          'Braided nets on all sides and over the top, so the ball stays in play',
          'LED floodlights, at least 8 per court, with all fittings and wiring',
        ],
      },
    ],
  },
  {
    slug: 'gym',
    sport: 'Gym',
    title: 'Gym flooring',
    img: '/img/sports/gym.jpg',
    lead: 'Turf and rubber flooring for high-energy training zones.',
    intro:
      'We supply synthetic turf for sled and resistance-training lanes and rubber tiles for weight areas. Sweat does not soak into the surface, and the turf is certified to indoor fire-rating standards.',
    options: ['Training turf', 'Rubber tiles', 'Wooden flooring'],
    sections: [
      {
        title: 'Why it works',
        items: [
          'Balanced grip and slide for sled and agility work',
          'Easy to clean, with no polishing needed',
          'Lower energy and maintenance costs',
          'Supplied in 2 m wide rolls, so fewer joints',
          'Light, flexible and quick to install',
          '100% recyclable, solvent and heavy-metal free',
        ],
      },
    ],
  },
  {
    slug: 'hockey',
    sport: 'Hockey',
    title: 'Hockey turf',
    img: '/img/sports/hockey.jpg',
    lead: 'Fast, true-rolling hockey pitches built to international performance standards.',
    intro:
      'Almost every serious hockey match is now played on artificial grass. The HybridTurf systems we install give fast pitches, a true ball roll and better player safety, and they come in three types to match how the pitch will be used.',
    options: ['Filled (sand)', 'Unfilled (water-based)', 'Dressed (sand-dressed)'],
    sections: [
      {
        title: 'Systems',
        items: [
          'Filled: long-lasting, with good ball speed and grip, and suited to other sports too',
          'Unfilled: the international-match choice, using far less water than other water-based turfs',
          'Dressed: sand-dressed for a balance of speed and durability',
        ],
      },
      {
        title: 'Track record',
        items: [
          'All three systems meet FIH performance standards',
          'HybridTurf surfaces were used at the 2018 Youth Olympic Games and the 2022 Commonwealth Games',
        ],
      },
    ],
  },
  {
    slug: 'tennis',
    sport: 'Tennis',
    title: 'Tennis courts',
    img: '/img/sports/tennis.jpg',
    lead: 'ITF-certified court surfaces, with a choice of speeds for every style of play.',
    intro:
      'Developed with top players, our tennis surfaces come in a range of speeds, from comfortable courts built for long rallies to quick ones for serve-and-volley. We also build classic acrylic hard courts with a true bounce.',
    options: ['ITF-certified HybridTurf', 'Acrylic hard court', 'Cushioned acrylic'],
    sections: [
      {
        title: 'On court',
        items: [
          'Balanced grip for quick, safe changes of direction',
          'Low-glare finish',
          'Roll-out options for temporary courts',
        ],
      },
      {
        title: 'Better for people and planet',
        items: ['Solvent, heavy-metal and phthalate-free', 'Low VOC', '100% recyclable', 'Contains recycled material'],
      },
    ],
  },
  {
    slug: 'volleyball',
    sport: 'Volleyball',
    title: 'Volleyball courts',
    img: '/img/sports/volleyball.jpg',
    lead: 'Volleyball surfaces for every age and level, at clubs, schools and residences.',
    intro:
      'Our volleyball range covers indoor and outdoor, amateur and professional play, in every price range. Synthetic turf gives the feel of natural grass without the waterlogged pitches, and acrylic courts give a smooth, colourful, UV-stable finish.',
    options: ['Synthetic turf', 'Acrylic surfaces', 'PU flooring', 'PVC vinyl'],
    sections: [
      {
        title: 'Synthetic turf',
        items: [
          'Plays and feels like natural grass',
          'All-weather and low-maintenance',
          'No more matches cancelled for waterlogging',
        ],
      },
      {
        title: 'Acrylic surfaces',
        items: [
          'Premium, pre-blended pure acrylic finish',
          'Excellent abrasion resistance and even texture',
          'UV-stable pigments that keep their colour',
          'Economical, in a wide range of colours',
        ],
      },
    ],
  },
]

export const findSportPage = slug => sportPages.find(p => p.slug === slug)
export const slugForSport = name => sportPages.find(p => p.sport === name)?.slug
