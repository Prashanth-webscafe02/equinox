export const contact = {
  phone: '+91 99863 06767',
  tel: 'tel:+919986306767',
  whatsapp: 'https://wa.me/919986306767',
  email: 'info@equinoxsportsinfra.com',
  address: '#891/A, 7th A Main Road, Koramangala 1st Block, Bangalore 560034',
  map: 'https://maps.google.com/?q=891/A+7th+A+Main+Road+Koramangala+1st+Block+Bangalore+560034',
}

export const navLinks = [
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'sports', label: 'Sports' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const lanes = ['Athletic tracks', 'Football turf', 'Tennis courts', 'Badminton halls', 'Cricket nets', 'Basketball courts']

export const islandWords = ['athletic tracks', 'football turf', 'tennis courts', 'badminton halls', 'cricket nets', 'gym floors']

export const intro =
  'Equinox is a full-service sports infrastructure firm. We design, advise on and build outdoor synthetic floors, turf, play areas, indoor vinyl and wooden courts, and we take on complete turnkey projects for stadiums, clubs, schools, offices and homes.'

export const surfaces = [
  { name: 'Synthetic Grass Turf', tx: 'tx-turf', where: 'Outdoor', img: '/img/football-turf.jpg',
    text: 'Infilled artificial grass that stays green and playable all year, with none of the mowing, watering or muddy patches of natural grass.',
    tags: ['Football', 'Hockey', 'Cricket nets', 'Play areas'] },
  { name: 'Acrylic Synthetic Flooring', tx: 'tx-acrylic', where: 'Outdoor', img: '/img/acrylic-court.jpg',
    text: 'Layered acrylic coating over a concrete or bitumen base. UV-stable colour, a true ball bounce and an optional cushioned layer for comfort.',
    tags: ['Tennis', 'Basketball', 'Multi-sport'] },
  { name: 'PVC Vinyl Flooring', tx: 'tx-pvc', where: 'Indoor', img: '/img/blue-court.jpg',
    text: 'Roll-out vinyl with a foam backing that gives consistent grip and shock absorption for fast indoor footwork.',
    tags: ['Badminton', 'Table tennis', 'Indoor halls'] },
  { name: 'PU Synthetic Flooring', tx: 'tx-pu', where: 'Indoor & outdoor', img: '/img/multi-sport.jpg',
    text: 'Seamless poured polyurethane that is elastic, joint-free and easy to clean, so one court can host several sports.',
    tags: ['Volleyball', 'Badminton', 'Basketball'] },
  { name: 'Athletic Synthetic Tracks', tx: 'tx-track', where: 'Outdoor', img: '/img/campus-track.jpg',
    text: 'Rubber-based running track systems with lane markings, built for steady footing in training and competition.',
    tags: ['Running tracks', 'Schools', 'Stadiums'] },
  { name: 'Rubber Tile', tx: 'tx-rubber', where: 'Indoor', img: '/img/gym.jpg',
    text: 'Dense interlocking rubber tiles that absorb dropped weights and machine vibration, and protect the slab underneath.',
    tags: ['Gyms', 'Fitness studios', 'Weight rooms'] },
  { name: 'Wooden Flooring', tx: 'tx-wood', where: 'Indoor', img: '/img/wood-floor.jpg',
    text: 'Sprung hardwood courts with the classic feel, grip and ball response that indoor players expect.',
    tags: ['Basketball', 'Badminton', 'Squash'] },
  { name: 'PP Tile', tx: 'tx-pp', where: 'Outdoor', img: '/img/pp-tile.jpg',
    text: 'Modular interlocking polypropylene tiles that drain fast after rain and can be installed quickly over a level base.',
    tags: ['Multi-sport', 'Skating', 'Quick installs'] },
  { name: 'EPDM', tx: 'tx-epdm', where: 'Outdoor', img: '/img/track-tennis.jpg',
    text: 'Colourful rubber granules bound into a soft, cushioning layer for safer play areas and running surfaces.',
    tags: ['Play areas', 'Jogging tracks', 'Schools'] },
]

// field: top-down line drawing of the playing area, 48×32 viewBox
const box = 'M4 4h40v24H4z'
const ring = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`

export const sports = [
  { name: 'Athletic track', note: 'PU & EPDM running surfaces', img: '/img/campus-track.jpg',
    field: 'M15 4h18a12 12 0 0 1 0 24H15a12 12 0 0 1 0-24zM15 9h18a7 7 0 0 1 0 14H15a7 7 0 0 1 0-14z' },
  { name: 'Badminton', note: 'Wood, vinyl & PU courts', img: '/img/badminton-wood.jpg',
    field: `${box}M24 4v24M18 4v24M30 4v24M4 7h40M4 25h40M4 16h14M30 16h14` },
  { name: 'Basketball', note: 'Indoor & outdoor courts', img: '/img/street-court.jpg',
    field: `${box}M24 4v24${ring(24, 16, 4)}M4 12h8v8H4M44 12h-8v8h8M12 12a4 4 0 0 1 0 8M36 12a4 4 0 0 0 0 8` },
  { name: 'Cricket', note: 'Practice nets & turf pitches', img: '/img/cricket-nets.jpg',
    field: 'M3 16a21 13 0 1 0 42 0a21 13 0 1 0-42 0M21 10h6v12h-6zM21 12h6M21 20h6' },
  { name: 'Football', note: 'Artificial turf pitches', img: '/img/turf-night.png',
    field: `${box}M24 4v24${ring(24, 16, 4)}M4 10h6v12H4M44 10h-6v12h6M4 13h2v6H4M44 13h-2v6h2` },
  { name: 'Gym', note: 'Rubber & wooden flooring', img: '/img/gym.jpg',
    field: 'M14 16h20M8 10h4v12H8zM36 10h4v12h-4zM12 12h2v8h-2zM34 12h2v8h-2zM5 14h3v4H5zM40 14h3v4h-3z' },
  { name: 'Hockey', note: 'Synthetic turf fields', img: '/img/football-turf.jpg',
    field: `${box}M24 4v24M14 4v24M34 4v24M4 9a7 7 0 0 1 0 14M44 9a7 7 0 0 0 0 14` },
  { name: 'Tennis', note: 'Acrylic hard courts', img: '/img/track-tennis.jpg',
    field: `${box}M24 3v26M4 7h40M4 25h40M14 7v18M34 7v18M14 16h20` },
  { name: 'Volleyball', note: 'Multi-sport court systems', img: '/img/multi-sport.jpg',
    field: 'M8 6h32v20H8zM24 4v24M19 6v20M29 6v20' },
]

// icon: SVG path data drawn with a 1.6 stroke
export const services = [
  { title: 'Turnkey projects', text: 'One team from concept to handover: civil base, surface, fencing, lighting and finishing.', img: '/img/rooftop-night.jpg', size: 'big' },
  { title: 'Consultancy & design', text: 'Site study, layout planning and surface selection before a single bag of material arrives.', icon: 'M4 20V9l8-5 8 5v11M9 20v-6h6v6' },
  { title: 'LED lighting', text: 'Even, glare-controlled floodlighting so play continues well after sunset.', icon: 'M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18.4 5.6l-2.1 2.1M21 12h-3M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' },
  { title: 'Chain link fencing', text: 'Galvanised, coated perimeter fencing that keeps the ball in and the court secure.', icon: 'M4 4l16 16M20 4L4 20M4 12h16M12 4v16' },
  { title: 'Structures', text: 'Roofing and covered structures for all-weather courts and spectator areas.', icon: 'M3 20h18M5 20V10l7-6 7 6v10' },
  { title: 'Steam & sauna', text: 'Recovery rooms for clubs, gyms and residences.', img: '/img/indoor-hall.jpg', size: 'wide' },
]

export const steps = [
  { title: 'Consult', text: 'We visit the site, understand who will play and how often, and recommend the surface and layout that fit your budget.' },
  { title: 'Design', text: 'Court orientation, drainage, base preparation, lighting and fencing are drawn up and agreed before work begins.' },
  { title: 'Build', text: 'Our own crews prepare the base, lay the surface and mark the lines, on a schedule you can plan around.' },
  { title: 'Warranty & care', text: 'Every product and service we deliver is covered by warranty, and we stay on call for maintenance after handover.' },
]

export const values = [
  { title: 'Quality & safety', text: 'Quality and safety come first on every job. It is what drives our growth and what keeps our clients coming back.' },
  { title: 'Our mission', text: "To bring good sports facilities within everyone's reach, help individual talent surface and leave a lasting impact on the community." },
  { title: 'Service', text: 'Timely service doubles its value. We aim for support that clients recommend, and most of our new work comes through referrals.' },
]

export const projects = [
  { img: '/img/school-courts.jpg', title: 'School multi-court' },
  { img: '/img/rooftop-night.jpg', title: 'Rooftop sports deck' },
  { img: '/img/campus-track.jpg', title: 'Campus track & courts' },
  { img: '/img/indoor-hall.jpg', title: 'Indoor wooden hall' },
  { img: '/img/multi-sport.jpg', title: 'Volleyball & badminton' },
  { img: '/img/acrylic-court.jpg', title: 'Acrylic basketball' },
  { img: '/img/football-turf.jpg', title: 'Five-a-side turf' },
  { img: '/img/pp-tile.jpg', title: 'PP tile ground' },
  { img: '/img/blue-court.jpg', title: 'Floodlit court' },
]

export const testimonials = [
  { name: 'Mr. Vinay', place: 'Bangalore', text: 'Well organised and professional. They built our international-standard football ground with 3G artificial grass, plus tennis, basketball, badminton and squash courts. Quality work.' },
  { name: 'Mr. Santosh', place: 'Bangalore', text: 'Had flooring done for my gym recently. Good quality, a clean finish, and decently priced.' },
  { name: 'Mr. Rakesh', place: 'Bangalore', text: 'They presented the project very well and the customer service was great. Happy with the pricing too.' },
]

export const clients = ['/img/client-1.jpg', '/img/client-2.jpg', '/img/client-3.jpg', '/img/client-4.jpg', '/img/client-5.jpg']

export const facilityTypes = ['Outdoor', 'Indoor', 'Both']
export const quoteSports = ['Football', 'Cricket', 'Tennis', 'Basketball', 'Badminton', 'Athletic track', 'Hockey', 'Volleyball', 'Gym', 'Multi-sport']
