/**
 * library.js
 * ----------
 * The Disease & Pest Library.
 *
 * This is plain JavaScript data so the app works even with no database.
 * `npm run seed` copies these records into MongoDB when a database is used.
 *
 * Every record has the same shape, so the UI can render diseases and pests
 * with the same component.
 */

export const LIBRARY = [
  /* ------------------------------ DISEASES ------------------------------ */
  {
    key: 'early-blight',
    name: 'Early Blight',
    type: 'disease',
    pathogen: 'Alternaria solani',
    affectedCrops: ['Tomato', 'Potato', 'Brinjal'],
    image: '/images/library/early-blight.jpg',
    summary: 'A fungal leaf spot that starts on the oldest leaves and climbs the plant.',
    symptoms: [
      'Dark brown spots with concentric rings, like a target',
      'A yellow halo around each spot',
      'Lowest leaves turn yellow and drop first',
      'Sunken dark lesions on stems near the soil'
    ],
    causes: [
      'Warm days (24-29 C) with heavy dew or overhead irrigation',
      'Fungus surviving on last season\u2019s crop debris in the soil',
      'Plants weakened by low nitrogen or heavy fruit load'
    ],
    prevention: [
      'Rotate away from tomato, potato and brinjal for 2-3 seasons',
      'Stake plants and space them so leaves dry quickly after rain',
      'Irrigate at the base, never over the leaves',
      'Remove and burn crop residue after harvest'
    ],
    management: {
      immediate: [
        'Pick off and destroy the worst affected lower leaves',
        'Stop overhead watering straight away',
        'Mulch the soil surface to stop spores splashing up'
      ],
      cultural: [
        'Improve air movement by pruning the lowest 30 cm of foliage',
        'Feed a balanced dose of nitrogen; starved plants collapse faster'
      ],
      biological: [
        'Trichoderma viride or T. harzianum as a soil drench and foliar spray',
        'Bacillus subtilis based biofungicide every 7-10 days'
      ],
      chemical: [
        'Protectant: mancozeb 75% WP, about 2 g per litre of water',
        'Curative: azoxystrobin 23% SC, about 1 ml per litre',
        'Alternate the two so the fungus does not build resistance'
      ]
    }
  },
  {
    key: 'late-blight',
    name: 'Late Blight',
    type: 'disease',
    pathogen: 'Phytophthora infestans',
    affectedCrops: ['Potato', 'Tomato'],
    image: '/images/library/late-blight.jpg',
    summary: 'The fastest moving disease on this list. A field can be lost in under a week.',
    symptoms: [
      'Greasy, water-soaked grey-green patches at leaf tips and edges',
      'White fuzzy growth on the underside in the early morning',
      'Whole leaves blacken and the plant smells of rot',
      'Firm brown marbled rot on tubers and fruit'
    ],
    causes: [
      'Cool, wet weather: 12-20 C with long leaf wetness or fog',
      'Infected seed tubers or nearby volunteer plants',
      'Spores blown in from a neighbouring infected field'
    ],
    prevention: [
      'Plant certified disease-free seed tubers only',
      'Earth up potatoes well so spores cannot reach tubers',
      'Destroy volunteer and cull-pile plants before the season',
      'Avoid evening irrigation in cool, cloudy weather'
    ],
    management: {
      immediate: [
        'Remove and bury or burn infected plants the same day - do not compost',
        'Spray a protectant across the whole field, not just the affected patch',
        'Harvest tubers only after the haulm is fully dead and dry'
      ],
      cultural: [
        'Wider spacing and ridging to keep the canopy dry',
        'Stop irrigation during a cool, overcast spell'
      ],
      biological: [
        'Bacillus subtilis sprays help only before infection, not after'
      ],
      chemical: [
        'Protectant: mancozeb 75% WP, about 2.5 g per litre',
        'Systemic where already present: cymoxanil + mancozeb, about 3 g per litre',
        'Repeat every 7 days while cool wet weather continues'
      ]
    }
  },
  {
    key: 'rice-blast',
    name: 'Rice Blast',
    type: 'disease',
    pathogen: 'Magnaporthe oryzae',
    affectedCrops: ['Rice (paddy)'],
    image: '/images/library/rice-blast.jpg',
    summary: 'Diamond-shaped leaf lesions; the neck form can empty the panicle completely.',
    symptoms: [
      'Spindle or diamond shaped spots with grey centres and brown margins',
      'Spots joining until whole leaves dry up',
      'Blackened, shrivelled node just below the panicle (neck blast)',
      'Panicles that stay upright and empty instead of bending over'
    ],
    causes: [
      'High humidity with night temperatures of 20-25 C',
      'Excess nitrogen producing soft, dark green leaves',
      'Long leaf wetness and prolonged cloudy weather'
    ],
    prevention: [
      'Grow a resistant variety recommended for your district',
      'Split nitrogen into three doses rather than one heavy dose',
      'Treat seed before sowing and keep the nursery well drained'
    ],
    management: {
      immediate: [
        'Stop all further nitrogen until the spread halts',
        'Drain the field for 2-3 days if the crop stage allows',
        'Spray at boot-leaf stage if neck blast appeared last season'
      ],
      cultural: [
        'Remove and destroy infected stubble and weed hosts on bunds',
        'Widen spacing in the next planting to open the canopy'
      ],
      biological: [
        'Pseudomonas fluorescens as a seed treatment and foliar spray'
      ],
      chemical: [
        'Tricyclazole 75% WP, about 0.6 g per litre, at first appearance',
        'A second spray at boot-leaf stage protects the neck'
      ]
    }
  },
  {
    key: 'bacterial-leaf-blight',
    name: 'Bacterial Leaf Blight',
    type: 'disease',
    pathogen: 'Xanthomonas oryzae pv. oryzae',
    affectedCrops: ['Rice (paddy)'],
    image: '/images/library/bacterial-leaf-blight.jpg',
    summary: 'A bacterial disease. Fungicides do nothing for it, so the diagnosis matters.',
    symptoms: [
      'Yellow wavy stripes starting at the leaf tip and running down the edge',
      'Leaves drying to straw colour from the tip',
      'Milky ooze from a freshly cut leaf held in clear water',
      'Whole seedlings wilting in patches after flooding (kresek)'
    ],
    causes: [
      'Standing water and storm damage that wounds the leaves',
      'Heavy nitrogen and dense planting',
      'Bacteria carried in irrigation water and infected stubble'
    ],
    prevention: [
      'Use resistant varieties and clean, certified seed',
      'Keep bunds weed free and avoid deep stagnant water',
      'Balance nitrogen with potassium'
    ],
    management: {
      immediate: [
        'Drain excess water from the field',
        'Stop nitrogen top-dressing immediately',
        'Do not spray fungicide - it has no effect on bacteria'
      ],
      cultural: [
        'Avoid clipping seedling tips at transplanting',
        'Destroy infected stubble rather than ploughing it back in'
      ],
      biological: [
        'Pseudomonas fluorescens seed treatment before sowing'
      ],
      chemical: [
        'Copper oxychloride 50% WP, about 2.5 g per litre, only as advised locally',
        'Copper reduces spread; it will not cure infected leaves'
      ]
    }
  },
  {
    key: 'powdery-mildew',
    name: 'Powdery Mildew',
    type: 'disease',
    pathogen: 'Erysiphe / Podosphaera spp.',
    affectedCrops: ['Grapes', 'Chilli', 'Okra', 'Cucurbits', 'Mango'],
    image: '/images/library/powdery-mildew.jpg',
    summary: 'White powder on the upper leaf surface. Unusually, it spreads in dry weather.',
    symptoms: [
      'White or greyish powdery patches on the upper side of leaves',
      'Leaves curling upward and turning yellow beneath the patches',
      'Dusty white coating on young shoots, flowers and fruit',
      'Cracked, scarred berries or fruit'
    ],
    causes: [
      'Warm dry days with cool humid nights',
      'Dense shady canopy with poor air flow',
      'Excess nitrogen producing soft new growth'
    ],
    prevention: [
      'Prune to open the canopy and let light into the centre',
      'Avoid heavy nitrogen during flowering',
      'Scout the shaded inner leaves weekly'
    ],
    management: {
      immediate: [
        'Remove the worst affected shoots and destroy them',
        'Spray wettable sulphur on a cool day, never above 32 C'
      ],
      cultural: [
        'Thin the canopy and train shoots for better airflow',
        'Irrigate at the base and avoid crowding plants'
      ],
      biological: [
        'Ampelomyces quisqualis or Bacillus subtilis sprays',
        'Milk-based or potassium bicarbonate sprays for light infections'
      ],
      chemical: [
        'Wettable sulphur 80% WP, about 2 g per litre',
        'Hexaconazole 5% EC, about 1 ml per litre, on severe infections'
      ]
    }
  },
  {
    key: 'downy-mildew',
    name: 'Downy Mildew',
    type: 'disease',
    pathogen: 'Plasmopara / Peronospora spp.',
    affectedCrops: ['Grapes', 'Onion', 'Cucurbits', 'Pearl millet'],
    image: '/images/library/downy-mildew.jpg',
    summary: 'Angular yellow patches on top, greyish mould underneath. Needs wet leaves.',
    symptoms: [
      'Angular yellow patches bounded by the leaf veins',
      'Greyish-purple mould on the underside, clearest at dawn',
      'Rapid leaf death in continuous wet weather',
      'Young fruit turning leathery and dropping'
    ],
    causes: [
      'Long periods of leaf wetness with temperatures of 15-22 C',
      'Overhead irrigation and poorly drained fields',
      'Spores surviving in infected debris and volunteer plants'
    ],
    prevention: [
      'Drip or furrow irrigation instead of overhead sprinklers',
      'Wider spacing and good drainage',
      'Resistant varieties where available'
    ],
    management: {
      immediate: [
        'Remove affected leaves on a dry day and destroy them',
        'Apply a protectant spray before the next rain, not after'
      ],
      cultural: [
        'Improve drainage and avoid irrigation in the evening',
        'Destroy crop debris right after harvest'
      ],
      biological: [
        'Trichoderma and Bacillus based products as preventive sprays'
      ],
      chemical: [
        'Protectant: copper oxychloride 50% WP, about 3 g per litre',
        'Systemic: metalaxyl + mancozeb, about 2.5 g per litre, at most twice a season'
      ]
    }
  },
  {
    key: 'anthracnose',
    name: 'Anthracnose',
    type: 'disease',
    pathogen: 'Colletotrichum spp.',
    affectedCrops: ['Mango', 'Chilli', 'Banana', 'Beans'],
    image: '/images/library/anthracnose.jpg',
    summary: 'Sunken dark fruit rot with pink spore masses. Worst during monsoon.',
    symptoms: [
      'Sunken circular dark lesions on fruit',
      'Pink or orange slimy spore masses in the centre of lesions',
      'Black spots on leaves and blossom blight on mango panicles',
      'Fruit rotting after harvest on the way to market'
    ],
    causes: [
      'Warm humid monsoon weather with frequent rain',
      'Fruit injured by handling, insects or hail',
      'Spores carried from infected twigs and mummified fruit'
    ],
    prevention: [
      'Prune out dead twigs and remove mummified fruit from the tree',
      'Harvest carefully and avoid bruising',
      'Dip harvested fruit in hot water (52 C for 5 minutes) where practised'
    ],
    management: {
      immediate: [
        'Collect and destroy all fallen infected fruit',
        'Spray at flowering and again at fruit set'
      ],
      cultural: [
        'Open the canopy so fruit dries quickly after rain',
        'Store harvested fruit in a cool, dry, ventilated place'
      ],
      biological: [
        'Trichoderma harzianum sprays and Bacillus subtilis at flowering'
      ],
      chemical: [
        'Carbendazim 50% WP, about 1 g per litre at flowering',
        'Mancozeb 75% WP, about 2 g per litre, repeated after heavy rain'
      ]
    }
  },
  {
    key: 'leaf-rust',
    name: 'Leaf Rust',
    type: 'disease',
    pathogen: 'Puccinia spp.',
    affectedCrops: ['Wheat', 'Coffee', 'Maize', 'Beans'],
    image: '/images/library/leaf-rust.jpg',
    summary: 'Orange-brown powder that rubs off on your fingers. Spreads on the wind.',
    symptoms: [
      'Orange to reddish-brown raised pustules on the leaf',
      'Powder that comes off on a fingertip or cloth',
      'Yellowing and early drying of infected leaves',
      'Thin, shrivelled grain where infection reached the flag leaf'
    ],
    causes: [
      'Mild temperatures of 15-25 C with dew on the leaves',
      'Spores blown in from distant infected fields',
      'Susceptible varieties and late sowing'
    ],
    prevention: [
      'Sow resistant varieties recommended for your zone',
      'Sow on time - late-sown crops get hit hardest',
      'Avoid excess nitrogen'
    ],
    management: {
      immediate: [
        'Spray as soon as the first pustules appear on the lower leaves',
        'Protect the flag leaf above all - it fills the grain'
      ],
      cultural: [
        'Destroy volunteer plants between seasons',
        'Rotate with a non-host crop'
      ],
      biological: [
        'Limited options; prevention and resistant varieties matter more'
      ],
      chemical: [
        'Propiconazole 25% EC, about 1 ml per litre',
        'Repeat after 15 days if the weather stays mild and damp'
      ]
    }
  },

  /* -------------------------------- PESTS -------------------------------- */
  {
    key: 'fall-armyworm',
    name: 'Fall Armyworm',
    type: 'pest',
    pathogen: 'Spodoptera frugiperda',
    affectedCrops: ['Maize', 'Sorghum', 'Sugarcane', 'Rice (paddy)'],
    image: '/images/library/fall-armyworm.jpg',
    summary: 'Caterpillar that feeds inside the whorl. Look for wet sawdust-like frass.',
    symptoms: [
      'Ragged holes and window-pane scraping on young leaves',
      'Moist sawdust-like droppings in the leaf whorl',
      'A caterpillar with an upside-down white Y on its head',
      'Four dark dots in a square on the second-last body segment'
    ],
    causes: [
      'Moths flying in and laying egg masses on young maize',
      'Continuous maize cropping with no break',
      'Warm weather speeding up the life cycle'
    ],
    prevention: [
      'Sow the whole village at the same time so the crop ages together',
      'Intercrop maize with pulses such as cowpea',
      'Install pheromone traps at 5 per acre to catch the first moths'
    ],
    management: {
      immediate: [
        'Hand-pick and crush egg masses and large caterpillars in the morning',
        'Drop dry sand mixed with lime into infested whorls',
        'Treat only plants that are actually infested, not the whole field'
      ],
      cultural: [
        'Deep summer ploughing to expose pupae to birds and sun',
        'Keep field borders weed free and encourage bird perches'
      ],
      biological: [
        'Release Trichogramma pretiosum egg parasitoids',
        'Spray Bacillus thuringiensis or Metarhizium on small larvae',
        'Neem seed kernel extract 5% on young larvae'
      ],
      chemical: [
        'Emamectin benzoate 5% SG, about 0.4 g per litre, into the whorl',
        'Spray in the evening when larvae come out to feed',
        'Rotate chemistry every generation to slow resistance'
      ]
    }
  },
  {
    key: 'whitefly',
    name: 'Whitefly',
    type: 'pest',
    pathogen: 'Bemisia tabaci',
    affectedCrops: ['Cotton', 'Tomato', 'Chilli', 'Brinjal', 'Soybean'],
    image: '/images/library/whitefly.jpg',
    summary: 'Tiny white flies under the leaves. The viruses they carry hurt more than the feeding.',
    symptoms: [
      'Clouds of small white insects rising when the plant is shaken',
      'Sticky honeydew on lower leaves with black sooty mould over it',
      'Leaves yellowing, curling upward and thickening',
      'Stunted plants with leaf curl virus symptoms'
    ],
    causes: [
      'Hot dry weather with no rain to knock adults down',
      'Repeated spraying that kills natural predators',
      'Nearby infested cotton, brinjal or weed hosts'
    ],
    prevention: [
      'Yellow sticky traps at 10-12 per acre from the seedling stage',
      'Remove weed hosts such as parthenium around the field',
      'Grow a border of maize or sorghum as a barrier crop'
    ],
    management: {
      immediate: [
        'Check the underside of leaves and count adults on 10 plants',
        'Put out yellow sticky traps the same day',
        'Uproot and destroy virus-infected plants - they will not recover'
      ],
      cultural: [
        'Avoid excess nitrogen, which makes leaves attractive to them',
        'Keep a crop-free gap between two host crops'
      ],
      biological: [
        'Encarsia formosa parasitoids in protected cultivation',
        'Verticillium lecanii spray in humid conditions',
        'Neem oil 1500 ppm at 5 ml per litre on the leaf underside'
      ],
      chemical: [
        'Use only if counts exceed the local economic threshold',
        'Diafenthiuron 50% WP, about 1.2 g per litre',
        'Never spray the same insecticide twice in a row'
      ]
    }
  },
  {
    key: 'aphids',
    name: 'Aphids',
    type: 'pest',
    pathogen: 'Aphis / Myzus spp.',
    affectedCrops: ['Mustard', 'Chilli', 'Cotton', 'Wheat', 'Vegetables'],
    image: '/images/library/aphids.jpg',
    summary: 'Soft green or black insects clustered on new shoots. Multiply extremely fast.',
    symptoms: [
      'Dense clusters of small soft insects on shoot tips and flower buds',
      'Curled, cupped and distorted young leaves',
      'Sticky honeydew attracting ants and black sooty mould',
      'White cast skins scattered on the leaves below'
    ],
    causes: [
      'Cool, mild weather in the early crop stage',
      'High nitrogen giving lush soft growth',
      'Predators wiped out by earlier broad-spectrum sprays'
    ],
    prevention: [
      'Encourage ladybird beetles by leaving flowering field borders',
      'Avoid unnecessary early-season insecticide',
      'Use reflective or silver mulch in vegetable nurseries'
    ],
    management: {
      immediate: [
        'Knock colonies off with a strong spray of plain water',
        'Nip off and destroy heavily infested shoot tips',
        'Check for ladybirds first - they often finish the job for free'
      ],
      cultural: [
        'Cut back on nitrogen top-dressing',
        'Remove weed hosts near the field'
      ],
      biological: [
        'Conserve ladybird beetles, syrphid flies and lacewings',
        'Verticillium lecanii or neem oil 5 ml per litre',
        'Soap solution at 5 g per litre on light infestations'
      ],
      chemical: [
        'Only above threshold: thiamethoxam 25% WG, about 0.2 g per litre',
        'Do not spray during flowering - it kills pollinators'
      ]
    }
  },
  {
    key: 'spider-mite',
    name: 'Two-spotted Spider Mite',
    type: 'pest',
    pathogen: 'Tetranychus urticae',
    affectedCrops: ['Brinjal', 'Okra', 'Chilli', 'Cucurbits', 'Papaya'],
    image: '/images/library/spider-mite.jpg',
    summary: 'Not an insect. Fine speckling and webbing under the leaf in hot dry weather.',
    symptoms: [
      'Fine pale speckling or stippling on the upper leaf surface',
      'Leaves turning bronze or rusty as damage builds',
      'Fine webbing on the underside and between shoots',
      'Moving specks visible on white paper tapped from a leaf'
    ],
    causes: [
      'Hot, dry, dusty conditions',
      'Dusty field edges and roadsides',
      'Insecticide sprays that killed predatory mites'
    ],
    prevention: [
      'Keep field borders damp and dust free',
      'Avoid pyrethroid sprays, which cause mite outbreaks',
      'Inspect leaf undersides weekly in summer'
    ],
    management: {
      immediate: [
        'Spray water forcefully on the leaf underside to break webbing',
        'Remove and destroy the most heavily webbed leaves',
        'Stop any pyrethroid spraying at once'
      ],
      cultural: [
        'Irrigate adequately - drought-stressed plants suffer most',
        'Destroy crop residue after harvest'
      ],
      biological: [
        'Release predatory mites such as Phytoseiulus persimilis',
        'Wettable sulphur or neem oil sprays on the underside'
      ],
      chemical: [
        'Use a true acaricide, not an insecticide',
        'Spiromesifen 22.9% SC, about 1 ml per litre, covering the leaf underside'
      ]
    }
  },
  {
    key: 'brown-planthopper',
    name: 'Brown Planthopper',
    type: 'pest',
    pathogen: 'Nilaparvata lugens',
    affectedCrops: ['Rice (paddy)'],
    image: '/images/library/brown-planthopper.jpg',
    summary: 'Sap feeder at the base of the plant. Causes circular patches of collapsed crop.',
    symptoms: [
      'Circular patches of dried, collapsed plants (hopper burn)',
      'Brown hoppers clustered at the water line when hills are parted',
      'Sooty mould on the lower stem',
      'Yellowing that starts at the plant base, not the tip'
    ],
    causes: [
      'Dense planting with continuous flooding',
      'Excess nitrogen and closed canopy',
      'Spiders and other predators destroyed by early spraying'
    ],
    prevention: [
      'Alternate wetting and drying instead of continuous flooding',
      'Leave 30 cm alleys every 2-3 m for inspection and spraying',
      'Avoid insecticide in the first 30 days to protect spiders'
    ],
    management: {
      immediate: [
        'Part the hills and check the base of the plant, not the leaves',
        'Drain the field for 3-4 days',
        'Spray at the base of the plant where the hoppers actually sit'
      ],
      cultural: [
        'Reduce nitrogen and widen spacing at the next transplanting',
        'Grow a resistant variety next season'
      ],
      biological: [
        'Conserve spiders, mirid bugs and Metarhizium infections',
        'Metarhizium anisopliae spray in humid conditions'
      ],
      chemical: [
        'Pymetrozine 50% WG, about 0.6 g per litre, directed at the base',
        'Never use a pyrethroid - it causes resurgence'
      ]
    }
  },
  {
    key: 'pink-bollworm',
    name: 'Pink Bollworm',
    type: 'pest',
    pathogen: 'Pectinophora gossypiella',
    affectedCrops: ['Cotton'],
    image: '/images/library/pink-bollworm.jpg',
    summary: 'Damage happens inside the boll, so the field can look healthy from outside.',
    symptoms: [
      'Rosetted flowers whose petals are stuck together',
      'Small entry holes on green bolls that heal over',
      'Pink larvae and damaged, stained lint inside opened bolls',
      'Bolls opening early and badly'
    ],
    causes: [
      'Extending the cotton crop beyond its normal season',
      'Larvae carried over in stored seed, stalks and gin trash',
      'Continuous cotton in the same field year after year'
    ],
    prevention: [
      'Uproot and destroy stalks immediately after the final pick',
      'Do not extend the crop for a late pick',
      'Pheromone traps at 5 per acre from 45 days after sowing'
    ],
    management: {
      immediate: [
        'Open 20 green bolls from across the field and count live larvae',
        'Collect and destroy rosetted flowers and damaged bolls',
        'Mass trapping with pheromone lures, changed every 2-3 weeks'
      ],
      cultural: [
        'Follow a strict crop-free period between cotton seasons',
        'Deep ploughing after harvest to expose pupae'
      ],
      biological: [
        'Release Trichogramma bactrae at egg-laying time',
        'Neem seed kernel extract 5% at flowering'
      ],
      chemical: [
        'Only above threshold: spray at flowering, before larvae enter bolls',
        'Once inside the boll, no spray reaches them'
      ]
    }
  },
  {
    key: 'healthy',
    name: 'Healthy Crop',
    type: 'healthy',
    pathogen: '',
    affectedCrops: ['All crops'],
    image: '/images/library/healthy.jpg',
    summary: 'No disease or pest damage visible in the image.',
    symptoms: [
      'Even green colour with no spots or patches',
      'No holes, chewing marks or webbing',
      'Firm upright leaves with normal shape'
    ],
    causes: ['Good agronomy, balanced nutrition and timely monitoring'],
    prevention: [
      'Keep scouting weekly - most problems are cheapest to fix early',
      'Check leaf undersides, not just the top surface',
      'Record what you see so you can compare week to week'
    ],
    management: {
      immediate: ['No treatment needed. Do not spray a healthy crop.'],
      cultural: ['Continue the current irrigation and nutrition schedule'],
      biological: ['Preventive Trichoderma soil application if you have had soil disease before'],
      chemical: ['None. Spraying a healthy crop wastes money and kills useful insects.']
    }
  }
];

/** Quick lookup by key, used by the analysis service. */
export const LIBRARY_BY_KEY = Object.fromEntries(LIBRARY.map((e) => [e.key, e]));
