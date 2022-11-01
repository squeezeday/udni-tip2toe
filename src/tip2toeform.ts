import { IForm, IFormSection } from './types';

const formSections: IFormSection[] = [
  { title: 'Overview', slug: 'overview' },
  { title: 'Individual', slug: 'individual' },
  {
    title: 'Photographs',
    slug: 'photographs',
    uploadSections: [
      'Face from the front',
      'Face in profile with ear shown left side',
      'Face in profile with ear shown right side',
      'Whole body in underwear front',
      'Whole body in underwear back ',
      'Whole body in underwear in profile',
      'Hands plantar view',
      'Hands dorsal view',
      'Feet plantar view',
      'Feet dorsal view',
      'Any other abnormalities',
      'Add Video of speech, gait, hand movements when relevant',
    ],
  },
  {
    title: 'Pedigree',
    slug: 'pedigree',
    description: `Ask about the patient's symptoms/malformation/neurological/neuromuscular disease/cancer/other disease in the family for at least three, preferably four generations. Mark diagnosis in pedigree. Please upload the pedigree as a PED file or an image. `,
    uploadSections: ['Pedigree'],
  },
  {
    title: 'Family history',
    slug: 'family-history',
    description: 'Please fill in even if you have drawn a pedigree.',
    questions: [
      {
        title:
          'The suspected mode of inheritance is (multiple options possible)',
        name: 'inheritanceMode',
        type: 'selectMultiple',
        options: [
          'Autosomal Dominant',
          'Autosomal recessive',
          'X-linked recessive',
          'X-linked dominant',
          'Mitochondrial',
          'Mosaic',
          'Unknown/other',
        ],
      },
      {
        title: "The patient's parents are consanguineous",
        name: 'parentsConsanguineous',
        options: ['Yes', 'No'],
        type: 'select',
      },
      {
        title:
          'Another relative affected with the same diagnosis as the patient? If Yes, indicate relationship(should be  possible to add  multiple relatives)',
        name: 'relativeAffected',
        type: 'selectMultiple',
        options: [
          'None',
          'Mother ',
          'Father ',
          'Sister ',
          'Brother',
          'Son',
          'Daughter',
          'Grandfather (maternal) ',
          'Grandfather (paternal) ',
          'Grandmother (maternal) ',
          'Grandmother (paternal) ',
          'Aunt (maternal)',
          'Uncle (maternal)',
          'Aunt (paternal)',
          'Uncle (paternal)',
          'Female cousin (maternal)',
          'Male cousin (paternal)',
        ],
      },
    ],
  },
  {
    title: 'Growth Chart',
    slug: 'growth-chart',
    uploadSections: ['Current and previous growth charts'],
    questions: [
      {
        title: 'Gestational age Weeks Days',
        name: 'gestionalAge',
        type: 'text',
      },
      { title: 'Birth length (cm)', name: 'birthLength', type: 'number' },
      { title: 'Birth weight (g)', name: 'birthWeight', type: 'number' },
      {
        title: 'Head circumference (cm)',
        name: 'headCircumference',
        type: 'number',
      },
      {
        title: 'Date at the last visit',
        name: 'lastVisitDate',
        type: 'date',
      },
      {
        title: 'Length at the last visit (cm)',
        name: 'lastVisitLength',
        type: 'number',
      },
      {
        title: 'Weight at the last visit (g)',
        name: 'lastVisitWeight',
        type: 'number',
      },
      {
        title: 'Head circumference at the last visit (cm)',
        name: 'lastVisitHeadCircumference',
        type: 'number',
      },
    ],
  },
  {
    title: 'Radiology - imaging',
    slug: 'radiology',
    description: `Attach relevant reports and preferably original imaging on disks or upload  images in jpg or TIFF format.
* In case of neurologic disorders, preferably MRI or CT/ultrasound of internal organs as appropriate
* In case of skeletal concerns (e.g., skeletal dysplasia), full skeletal survey  that includes bilateral anteroposterior (AP) and posteroanterior (PA)  projections of hands, forearms, humerus, feet, leg, femur, pelvis, spine and skull.`,
    uploadSections: ['Radiology'],
  },
  {
    title: 'Previous genetic investigations',
    slug: 'previous-genetic-investigations',
    description: ``,
    uploadSections: [
      'Array',
      'Targeted sequencing',
      'WES panels/trios',
      'WGS panels/trios',
    ],
    questions: [
      {
        name: 'karyotyping',
        title: 'Karyotyping',
        options: ['Yes', 'No'],
        type: 'select',
      },
      {
        name: 'karyotypingKaryotype',
        title: 'Karyotype',
        type: 'text',
      },
      { name: 'fish', title: 'FISH', options: ['Yes', 'No'], type: 'select' },
      {
        name: 'fishKaryotype',
        title: 'Karyotype',
        type: 'text',
      },
      {
        name: 'arrayResults',
        title: 'Array results',
        type: 'text',
      },
      {
        name: 'targetedVariants',
        title: 'Targeted sequencing variants',
        type: 'text',
      },
      {
        name: 'wesPanelResults',
        title: 'WES panels/trios variants',
        type: 'text',
      },
      {
        name: 'wgsPanelResults',
        title: 'WGS panels/trios variants',
        type: 'text',
      },
    ],
  },
  {
    title: 'Other Laboratory results',
    slug: 'other-laboratory-results',
    description: `Key laboratory test results:
* Basic (e.g., blood status, liver status, kidney status, basal endocrinological investigation)
* Advanced testing as appropriate for phenotype (e.g., plasma amino acids, urine organic acids, carbohydrate deficient transferring)
* Results of biopsies`,
    uploadSections: ['Laboratory'],
  },
  {
    title: 'This is me',
    slug: 'this-is-me',
    questions: [
      { title: 'My caregivers are', name: 'caregivers', type: 'longText' },
      {
        title: 'My favourite things to do',
        name: 'favourite',
        type: 'longText',
      },
      { title: 'I don’t like to', name: 'dontLike', type: 'longText' },
      { title: 'When I am happy I', name: 'happy', type: 'longText' },
      { title: 'When I am worried I', name: 'worried', type: 'longText' },
      { title: 'I need help with', name: 'needHelpWith', type: 'longText' },
      {
        title: 'I can do these things for myself',
        name: 'canDo',
        type: 'longText',
      },
      { title: 'I sleep', name: 'sleep', type: 'longText' },
      { title: 'I eat', name: 'eat', type: 'longText' },
      {
        title: 'I have the following medical problems',
        name: 'medical',
        type: 'longText',
      },
    ],
  },
  {
    title: 'Clinical findings',
    slug: 'clinical-findings',
    description: `Summary of clinical findings (Provided by referral physician)

In particular, please summarize the following:

1. Objective findings (current clinical condition, imaging, investigations, 
surgery, etc)
2. When these were identified and how they evolved over time
3. Growth and developmental milestones, and their pattern (Stable? 
Worsening?)
4. Overall clinical evolution (stable, worsening, improving) and severity
5. What diagnostic hypothesis you have or had 
6. What specialists the patient has seen
    `,
    questions: [{ title: '', name: 'clinicalFindings', type: 'longText' }],
  },
  {
    title: 'Pregnancy',
    ontologies: [
      { id: 'HP:0001562', label: 'Oligohydramnios' },
      { id: 'HP:0001561', label: 'Polyhydramnios' },
      { id: 'HP:0011436', label: 'Abnormal maternal serum screening' },
      { id: 'HP:0034058', label: 'Abnormal fetal morphology' },
      { id: 'HP:0011425', label: 'Fetal ultrasound soft marker' },
      { id: 'HP:0034059', label: 'Abnormal fetal physiology' },
      { id: 'HP:0001511', label: 'Intrauterine growth retardation' },
      { id: 'HP:0003517', label: 'Fetal overgrowth' },
      { id: 'HP:0001558', label: 'Decreased fetal movement' },
      { id: 'HP:0010519', label: 'Increased fetal movement' },
      {
        id: 'HP:0001194',
        label: 'Abnormalities of placenta or umbilical cord',
      },
      {
        id: 'HP:0002686',
        label:
          'Prenatal maternal (health) abnormality (Describe in Clinical summary above)',
      },
      { id: 'HP:0030246', label: 'Maternal first trimester fever' },
      { id: 'HP:0009800', label: 'Maternal diabetes' },
      {
        id: 'HP:0011437',
        label:
          'Maternal autoimmune disease (Describe in Clinical summary above)',
      },
      { id: 'HP:0100622', label: 'Maternal seizure (during pregnancy)' },
      {
        id: 'HP:0011438',
        label:
          'Maternal teratogenic exposure (Describe in Clinical summary above)',
      },
      { id: 'HP:0100603', label: 'Toxemia of pregnancy' },
      {
        id: 'HP:0200067',
        label: 'Recurrent spontaneous abortion in previous pregnancies',
      },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'pregnancy',
  },
  {
    title: 'Delivery',
    ontologies: [
      { id: 'HP:0001787', label: 'Abnormal delivery' },
      { id: 'HP:0025116', label: 'Fetal distress' },
      { id: 'HP:0030917', label: 'Low APGAR score' },
      { id: 'HP:0011410', label: 'Caesarian section' },
      { id: 'HP:0011411', label: 'Forceps delivery' },
      { id: 'HP:0011412', label: 'Ventouse delivery' },
      { id: 'HP:0001623', label: 'Breech presentation' },
      {
        id: 'HP:0012498',
        label: "Nuchal cord/Umbilical cord wrapped around the baby's neck",
      },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'delivery',
  },
  {
    title: 'Neonatal period complications',
    ontologies: [
      { id: 'HP:0002643', label: 'Neonatal respiratory distress' },
      { id: 'HP:0008872', label: 'Feeding difficulties in infancy' },
      { id: 'HP:0011471', label: 'Gastrostomy tube feeding in infancy' },
      {
        id: 'HP:0000952',
        label: 'Significant jaundice (e.g., requiring treatment)',
      },
      { id: 'HP:0001998', label: 'Neonatal hypoglycemia' },
      { id: 'HP:0032807', label: 'Neonatal seizure' },
      { id: 'HP:0001319', label: 'Neonatal hypotonia' },
      { id: 'HP:0032169', label: 'Severe infection' },
      { id: 'HP:0002803', label: 'Congenital contracture' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'neonatal-period-complications',
  },
  {
    title: 'Growth at birth',
    ontologies: [
      { id: 'HP:0001507', label: 'Growth abnormality at birth' },
      { id: 'HP:0001518', label: 'Small for gestational age' },
      { id: 'HP:0001520', label: 'Large for gestational age' },
      { id: 'HP:0000256', label: 'Macrocephaly' },
      { id: 'HP:0000252', label: 'Microcephaly' },
      { id: 'HP:0001528', label: 'Hemihypertrophy' },
      { id: 'HP:0000158', label: 'Macroglossia' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'growth-at-birth',
  },
  {
    title: 'Post-natal growth',
    ontologies: [
      { id: 'HP:0001507', label: 'Abnormal growth' },
      { id: 'HP:0000256', label: 'Post-natal macrocephaly' },
      { id: 'HP:0000252', label: 'Post-natal microcephaly' },
      { id: 'HP:0000098', label: 'Tall stature' },
      { id: 'HP:0001519', label: 'Disproportionate tall stature' },
      { id: 'HP:0003498', label: 'Disproportionate short stature' },
      { id: 'HP:0004322', label: 'Short stature' },
      {
        id: 'HP:0008873',
        label: 'Disproportionate short-limb short stature',
      },
      {
        id: 'HP:0003521',
        label: 'Disproportionate short-trunk short stature',
      },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'post-natal-growth',
  },
  {
    title: 'Facial morphology',
    ontologies: [
      { id: 'HP:0001999', label: 'Abnormal facial shape' },
      { id: 'HP:0000306', label: 'Abnormality of the chin' },
      { id: 'HP:0000347', label: 'Micrognathia' },
      { id: 'HP:0000277', label: 'Abnormal mandible morphology' },
      { id: 'HP:0000326', label: 'Abnormality of the maxilla' },
      { id: 'HP:0000290', label: 'Abnormality of the forehead' },
      { id: 'HP:0011220', label: 'Prominent forehead' },
      { id: 'HP:0000340', label: 'Sloping forehead' },
      { id: 'HP:0000520', label: 'Proptosis' },
      { id: 'HP:0000316', label: 'Hypertelorism' },
      { id: 'HP:0000601', label: 'Hypotelorism' },
      { id: 'HP:0000492', label: 'Abnormal eyelid morphology' },
      { id: 'HP:0008050', label: 'Abnormality of the palpebral fissures' },
      { id: 'HP:0000286', label: 'Epicanthus' },
      { id: 'HP:0000506', label: 'Telecanthus' },
      { id: 'HP:0010938', label: 'Abnormality of the external nose' },
      { id: 'HP:0011800', label: 'Midface retrusion (Flat midface)' },
      { id: 'HP:0000154', label: 'Wide mouth' },
      { id: 'HP:0000160', label: 'Narrow mouth' },
      { id: 'HP:0012471', label: 'Thick vermilion border' },
      { id: 'HP:0000233', label: 'Thin vermilion border' },
      { id: 'HP:0000319', label: 'Smooth philtrum' },
      { id: 'HP:0000322', label: 'Short philtrum' },
      { id: 'HP:0000343', label: 'Long philtrum' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'facial-morphology',
  },
  {
    title: 'Eyes',
    ontologies: [
      { id: 'HP:0000478', label: 'Abnormality of the eye' },
      { id: 'HP:0012372', label: 'Abnormal eye morphology' },
      { id: 'HP:0000525', label: 'Abnormal iris morphology' },
      { id: 'HP:0000505', label: 'Visual impairment' },
      { id: 'HP:0030669', label: 'Abnormal ocular adnexa morphology' },
      { id: 'HP:0000479', label: 'Abnormality of the retina' },
      { id: 'HP:0000501', label: 'Glaucoma' },
      { id: 'HP:0000486', label: 'Strabismus' },
      { id: 'HP:0000518', label: 'Cataract' },
      { id: 'HP:0000526', label: 'Aniridia' },
      { id: 'HP:0000589', label: 'Coloboma' },
      { id: 'HP:0000568', label: 'Microphthalmia' },
      { id: 'HP:0000639', label: 'Nystagmus' },
      { id: 'HP:0000508', label: 'Ptosis' },
      { id: 'HP:0000613', label: 'Photophobia' },
      { id: 'HP:0000587', label: 'Abnormality of the optic nerve' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'eyes',
  },
  {
    title: 'Mouth/teeth',
    ontologies: [
      { id: 'HP:0000163', label: 'Abnormal oral cavity morphology' },
      { id: 'HP:0000175', label: 'Cleft palate' },
      { id: 'HP:0410030', label: 'Cleft lip' },
      { id: 'HP:0000202', label: 'Cleft/palate' },
      { id: 'HP:0000168', label: 'Abnormality of the gingiva' },
      { id: 'HP:0000218', label: 'High palate' },
      { id: 'HP:0000164', label: 'Abnormality of the dentition' },
      { id: 'HP:0006483', label: 'Abnormal number of teeth' },
      { id: 'HP:0006482', label: 'Abnormal dental morphology' },
      { id: 'HP:0000682', label: 'Abnormal dental enamel morphology' },
      { id: 'HP:0000157', label: 'Abnormality of the tongue' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'mouthteeth',
  },
  {
    title: 'Nose',
    ontologies: [
      { id: 'HP:0005105', label: 'Abnormal nasal morphology' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'nose',
  },
  {
    title: 'Ears',
    ontologies: [
      { id: 'HP:0000407', label: 'Sensorineural hearing impairment' },
      { id: 'HP:0000405', label: 'Conductive hearing impairment' },
      { id: 'HP:0000377', label: 'Abnormality of the pinna' },
      { id: 'HP:0000369', label: 'Low-set ears' },
      { id: 'HP:0000400', label: 'Macrotia' },
      { id: 'HP:0008551', label: 'Microtia' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'ears',
  },
  {
    title: 'Central nervous system + neuromuscular system + cognition',
    ontologies: [
      { id: 'HP:0000707', label: 'Abnormality of the nervous system' },
      { id: 'HP:0012443', label: 'Abnormality of brain morphology' },
      { id: 'HP:0002194', label: 'Delayed gross motor development' },
      { id: 'HP:0001263', label: 'Global developmental delay' },
      { id: 'HP:0001256', label: 'Intellectual disability, mild' },
      { id: 'HP:0002342', label: 'Intellectual disability, moderate' },
      { id: 'HP:0002187', label: 'Intellectual disability, profound' },
      { id: 'HP:0010864', label: 'Intellectual disability, severe' },
      { id: 'HP:0006887', label: 'Intellectual disability, progressive' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'central-nervous-system-neuromuscular-system-cognition',
  },
  {
    title: 'Behavioral abnormality',
    ontologies: [
      { id: 'HP:0000729', label: 'Autistic behavior' },
      { id: 'HP:0007018', label: 'Attention deficit hyperactivity disorder' },
      { id: 'HP:0100716', label: 'Self-injurious behavior' },
      { id: 'HP:0000718', label: 'Aggressive behavior' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'behavioral-abnormality',
  },
  {
    title: 'Speech',
    ontologies: [
      { id: 'HP:0000750', label: 'Delayed speech and language development' },
      { id: 'HP:0002465', label: 'Poor speech' },
      { id: 'HP:0001344', label: 'Absent speech' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'speech',
  },
  {
    title: 'Seizures',
    ontologies: [
      { id: 'HP:0001250', label: 'Seizure' },
      { id: 'HP:0032807', label: 'Neonatal seizure' },
      { id: 'HP:0002349', label: 'Focal aware seizure' },
      { id: 'HP:0002384', label: 'Focal impaired awareness seizure' },
      { id: 'HP:0002197', label: 'Generalized onset seizure' },
      { id: 'HP:0002353', label: 'EEG abnormality' },
      {
        id: 'other',
        label:
          'Other. Describe in Clinical summary and/or add HPO terms here. Please ensure in clinical summary that you include as much information as possible about age of onset, course of the disease, semiology, triggers, response to treatment, recurrent status, characteristic EEG patterning, brain imaging, abnormal metabolism, abnormal CSF etc.',
      },
    ],
    slug: 'seizures',
  },
  {
    title: 'Muscles',
    ontologies: [
      { id: 'HP:0003011', label: 'Abnormality of the musculature' },
      { id: 'HP:0001324', label: 'Muscle weakness' },
      { id: 'HP:0003808', label: 'Abnormal muscle tone' },
      { id: 'HP:0001276', label: 'Hypertonia' },
      { id: 'HP:0001252', label: 'Hypotonia' },
      { id: 'HP:0001371', label: 'Flexion contracture' },
      { id: 'HP:0002804', label: 'Arthrogryposis multiplex congenita' },
      { id: 'HP:0003560', label: 'Muscular dystrophy' },
      { id: 'HP:0003457', label: 'EMG abnormality' },
      { id: 'HP:0011804', label: 'Abnormal muscle physiology' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'muscles',
  },
  {
    title: 'Skeleton',
    ontologies: [
      { id: 'HP:0002652', label: 'Skeletal dysplasia' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'skeleton',
  },
  {
    title: 'Head and neck',
    ontologies: [
      { id: 'HP:0000929', label: 'Abnormal skull' },
      { id: 'HP:0001363', label: 'Craniosynostosis' },
      { id: 'HP:0011329', label: 'Abnormality of cranial sutures' },
      { id: 'HP:0000470', label: 'Short neck' },
      { id: 'HP:0000475', label: 'Broad neck' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'head-and-neck',
  },
  {
    title: 'Trunk',
    ontologies: [
      { id: 'HP:0000765', label: 'Abnormal thorax morphology' },
      { id: 'HP:0000925', label: 'Abnormality of the vertebral column' },
      { id: 'HP:0002650', label: 'Scoliosis' },
      { id: 'HP:0003272', label: 'Abnormal hip bone morphology' },
      { id: 'HP:0002827', label: 'Hip dislocation' },
      { id: 'HP:0000782', label: 'Abnormal scapula morphology' },
      { id: 'HP:0003043', label: 'Abnormal shoulder morphology' },
      { id: 'HP:0000766', label: 'Abnormal sternum morphology' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'trunk',
  },
  {
    title: 'Upper limbs',
    ontologies: [
      { id: 'HP:0002817', label: 'Abnormality of the upper limb' },
      { id: 'HP:0002818', label: 'Abnormality of the radius' },
      { id: 'HP:0002997', label: 'Abnormality of the ulna' },
      { id: 'HP:0009811', label: 'Abnormality of the elbow' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'upper-limbs',
  },
  {
    title: 'Hands, fingers, and thumbs',
    ontologies: [
      { id: 'HP:0000954', label: 'Single transverse palmar crease' },
      { id: 'HP:0001177', label: 'Preaxial hand polydactyly' },
      { id: 'HP:0100259', label: 'Postaxial hand polydactyly' },
      { id: 'HP:0001156', label: 'Brachydactyly' },
      { id: 'HP:0100807', label: 'Long fingers (Arachnodactyly)' },
      { id: 'HP:0100257', label: 'Cleft hand (Ectrodactyly)' },
      { id: 'HP:0006265', label: 'Aplasia/Hypoplasia of fingers' },
      { id: 'HP:0009601', label: 'Aplasia/Hypoplasia of thumb' },
      { id: 'HP:0011304', label: 'Broad thumb' },
      { id: 'HP:0001159', label: 'Syndactyly' },
      { id: 'HP:0004099', label: 'Macrodactyly' },
      { id: 'HP:0010557', label: 'Overlapping fingers' },
      { id: 'HP:0001212', label: 'Prominent fingertip pads' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'hands-fingers-and-thumbs',
  },
  {
    title: 'Lower limbs',
    ontologies: [
      { id: 'HP:0002814', label: 'Abnormality of the lower limb' },
      { id: 'HP:0002992', label: 'Abnormality of tibia morphology' },
      { id: 'HP:0002991', label: 'Abnormality of fibula morphology' },
      { id: 'HP:0003045', label: 'Abnormality of the patella morphology' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'lower-limbs',
  },
  {
    title: 'Feet/toes',
    ontologies: [
      { id: 'HP:0001830', label: 'Postaxial foot polydactyly' },
      { id: 'HP:0001841', label: 'Preaxial foot polydactyly' },
      { id: 'HP:0001831', label: 'Brachydactyly of the foot' },
      { id: 'HP:0010511', label: 'Long toe' },
      { id: 'HP:0010173', label: 'Aplasia/Hypoplasia of phalanges of toes' },
      { id: 'HP:0008110', label: 'Equinovarus deformity' },
      { id: 'HP:0001159', label: 'Syndactyly' },
      { id: 'HP:0010055', label: 'Broad hallux' },
      { id: 'HP:0010097', label: 'Bifid distal phalanx of hallux' },
      { id: 'HP:0001845', label: 'Overlapping toes' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'feettoes',
  },
  {
    title: 'Airways',
    ontologies: [
      { id: 'HP:0010640', label: 'Abnormality of the nasal cavity' },
      { id: 'HP:0002778', label: 'Abnormal tracheal morphology' },
      { id: 'HP:0002088', label: 'Abnormal lung morphology' },
      { id: 'HP:0025423', label: 'Abnormal larynx morphology' },
      { id: 'HP:0006536', label: 'Airway obstruction' },
      { id: 'HP:0005957', label: 'Breathing dysregulation' },
      { id: 'HP:0002094', label: 'Dyspnea' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'airways',
  },
  {
    title: 'Heart/great vessels',
    ontologies: [
      { id: 'HP:0001627', label: 'Abnormal heart morphology' },
      { id: 'HP:0001671', label: 'Abnormal cardiac septum morphology' },
      { id: 'HP:0001631', label: 'Atrial septal defect' },
      { id: 'HP:0001629', label: 'Ventricular septal defect' },
      { id: 'HP:0006695', label: 'Atrioventricular canal defect' },
      { id: 'HP:0001636', label: 'Tetralogy of Fallot' },
      { id: 'HP:0011675', label: 'Arrhythmia' },
      { id: 'HP:0001638', label: 'Cardiomyopathy' },
      { id: 'HP:0000822', label: 'Hypertension' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'heartgreat-vessels',
  },
  {
    title: 'Kidneys and urinary tract',
    ontologies: [
      { id: 'HP:0000077', label: 'Abnormality of the kidneys' },
      { id: 'HP:0000104', label: 'Renal agenesis' },
      { id: 'HP:0000079', label: 'Abnormality of the urinary system' },
      { id: 'HP:0000107', label: 'Renal cysts' },
      { id: 'HP:0000105', label: 'Enlarged kidney' },
      { id: 'HP:0012211', label: 'Abnormal kidney function' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'kidneys-and-urinary-tract',
  },
  {
    title: 'Genitalia',
    ontologies: [
      { id: 'HP:0000811', label: 'Abnormal external genitalia' },
      { id: 'HP:0000812', label: 'Abnormal internal genitalia' },
      { id: 'HP:0000028', label: 'Cryptorchidism' },
      { id: 'HP:0000047', label: 'Hypospadias' },
      { id: 'HP:0000062', label: 'Ambiguous genitalia' },
      { id: 'HP:0000078', label: 'Abnormality of genital system' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'genitalia',
  },
  {
    title: 'Liver and spleen',
    ontologies: [
      { id: 'HP:0001392', label: 'Abnormality of the liver' },
      { id: 'HP:0001410', label: 'Decreased liver function' },
      { id: 'HP:0002240', label: 'Hepatomegaly' },
      { id: 'HP:0001407', label: 'Hepatic cysts' },
      { id: 'HP:0001743', label: 'Abnormality of the spleen' },
      { id: 'HP:0001744', label: 'Splenomegaly' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'liver-and-spleen',
  },
  {
    title: 'Skin',
    ontologies: [
      { id: 'HP:0000951', label: 'Abnormality of the skin' },
      { id: 'HP:0001000', label: 'Abnormality of skin pigmentation' },
      { id: 'HP:0007565', label: 'Multiple cafe-au-lait spots' },
      { id: 'HP:0001480', label: 'Freckling (axillary or inguinal)' },
      { id: 'HP:0100669', label: 'Abnormal pigmentation of the oral mucosa' },
      { id: 'HP:0031447', label: 'Penile freckling' },
      { id: 'HP:0008066', label: 'Abnormal blistering of the skin' },
      { id: 'HP:0011276', label: 'Vascular skin abnormality' },
      { id: 'HP:0002745', label: 'Oral leucoplakia' },
      { id: 'HP:0002558', label: 'Supernumerary nipple' },
      { id: 'HP:0008069', label: 'Neoplasm of the skin' },
      { id: 'HP:0000958', label: 'Dry skin' },
      { id: 'HP:0000964', label: 'Eczema' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'skin',
  },
  {
    title: 'Hair/nails',
    ontologies: [
      { id: 'HP:0001595', label: 'Abnormal hair morphology' },
      { id: 'HP:0002216', label: 'Premature greying of hair' },
      { id: 'HP:0000664', label: 'Synophrys' },
      { id: 'HP:0000534', label: 'Abnormal eyebrow morphology' },
      { id: 'HP:0001597', label: 'Abnormality of the nails' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'hairnails',
  },
  {
    title: 'Endocrine/metabolic',
    ontologies: [
      { id: 'HP:0000819', label: 'Diabetes mellitus' },
      { id: 'HP:0001988', label: 'Recurrent hypoglycemia' },
      { id: 'HP:0004902', label: 'Congenital lactic acidosis' },
      { id: 'HP:0000821', label: 'Hypothyroidism' },
      { id: 'HP:0000828', label: 'Abnormality of the parathyroid gland' },
      {
        id: 'HP:0012093',
        label: 'Abnormality of endocrine pancreas physiology',
      },
      {
        id: 'HP:0000864',
        label: 'Abnormality of the hypothalamus-pituitary axis',
      },
      { id: 'HP:0000834', label: 'Abnormality of the adrenal glands' },
      { id: 'HP:0000826', label: 'Precocious puberty' },
      { id: 'HP:0000823', label: 'Delayed puberty' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'endocrinemetabolic',
  },
  {
    title: 'Connective tissue',
    ontologies: [
      { id: 'HP:0001382', label: 'Joint hypermobility' },
      { id: 'HP:0001763', label: 'Pes planus' },
      { id: 'HP:0001373', label: 'Joint dislocation' },
      { id: 'HP:0000978', label: 'Bruising susceptibility' },
      { id: 'HP:0001030', label: 'Fragile skin' },
      { id: 'HP:0001065', label: 'Striae distensae' },
      { id: 'HP:0002617', label: 'Aneurysm (Vascular dilatation)' },
      { id: 'HP:0100790', label: 'Hernia' },
      { id: 'HP:0008067', label: 'Abnormally lax or hyperextensible skin' },
      { id: 'HP:0000973', label: 'Cutis laxa' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'connective-tissue',
  },
  {
    title: 'Immune system/blood',
    ontologies: [
      { id: 'HP:0004313', label: 'Decreased circulating antibody level' },
      { id: 'HP:0002960', label: 'Autoimmunity' },
      { id: 'HP:0012647', label: 'Abnormal inflammatory response' },
      { id: 'HP:0001903', label: 'Anemia' },
      { id: 'HP:0001882', label: 'Leukopenia' },
      { id: 'HP:0001873', label: 'Thrombocytopenia' },
      { id: 'HP:0001929', label: 'Abnormality of coagulation' },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'immune-systemblood',
  },
  {
    title: 'Gastrointestinal',
    ontologies: [
      { id: 'HP:0002608', label: 'Celiac disease' },
      { id: 'HP:0002013', label: 'Vomiting' },
      { id: 'HP:0002020', label: 'Gastroesophageal reflux' },
      { id: 'HP:0002014', label: 'Diarrhea' },
      { id: 'HP:0002019', label: 'Constipation' },
      { id: 'HP:0011968', label: 'Feeding difficulties' },
      { id: 'HP:0002015', label: 'Dysphagia' },
      {
        id: 'HP:0012718',
        label: 'Morphological abnormality of the gastrointestinal tract',
      },
      {
        id: 'other',
        label: 'Other. Describe in Clinical summary and/or add HPO terms here',
      },
    ],
    slug: 'gastrointestinal',
  },
  {
    title: 'Cancer/malignancy /benign tumor',
    ontologies: [
      { id: 'HP:0002664', label: 'Neoplasm (Benign or malignant)' },
      { id: 'HP:0004377', label: 'Hematological neoplasm' },
      {
        id: 'other',
        label:
          'Please specify the type of cancer/malignancy/benign tumor and age at diagnosis in the section of Summary of clinical findings above and provide HPO terms',
      },
    ],
    slug: 'cancermalignancy-benign-tumor',
  },
  { title: 'Summary', slug: 'summary' },
];

const tip2toeForm: IForm = {
  title: 'tip2toe questionnaire',
  formSections,
};

export default tip2toeForm;
