// Centralized image path configuration
// All external URLs mapped to local paths

export const imagePaths = {
  // Logos
  logo: '/images/logos/logo.png',
  logoWhite: '/images/logos/whitee.png',

  // Clinic & Team Photos
  clinic: {
    smilingDentists: '/images/clinic/smiling-dentists-standing-with-arms-crossed-1024x682.jpg',
    professionalDentist: '/images/clinic/professional-dentist-at-his-clinic.jpg',
    dentistsWithPatient: '/images/clinic/two-dentists-working-with-patient-1024x684.jpg',
    happyPatients: '/images/clinic/happy-patient-and-dentists-768x512.jpg',
  },

  // Services
  services: {
    dentalCheckup: '/images/services/dental-check-up.jpg',
    cosmetic: '/images/transformations/Smile-2-1024x683.jpg',
    implants: '/images/clinic/new-teeth-for-patient.jpg',
    invisalign: '/images/services/Invisalign-300x200.jpg',
    children: '/images/clinic/low-angle-view-of-dentists-examining-teeth-of-little-boy-at-dentist-office.jpg',
    emergency: '/images/services/RootCanel-300x202.jpg',
    crowns: '/images/services/Crowns-300x200.jpg',
    fillings: '/images/services/LaserFillings-200x300.jpg',
  },

  // Team
  team: {
    drNalini: '/images/team/Dr.Nalini-Prasad.jpg',
    drNesrine: '/images/team/Dr.Nesrine-Armanious-qfpyuux9xl9a1z82ozxuzh56j0t4ksr4kria0b7xes.jpeg',
    drMomina: '/images/team/Dr.Momina-225x300.jpg',
  },

  // Testimonials
  testimonials: {
    patient1: '/images/testimonials/testimonial-N8572T7.jpg',
    patient2: '/images/testimonials/testimonial-83S5W35.jpg',
    patient3: '/images/testimonials/testimonial-M6NJPEF.png',
  },

  // Transformations
  transformations: {
    smile: '/images/transformations/Smile-2-1024x683.jpg',
    alwaysSmile: '/images/transformations/AlwaysSmile-1024x768.jpg',
    dentalPatient: '/images/general/DentalPatient-1024x768.jpg',
  },
};

// Fallback for any missing images
export const getImagePath = (key: string, fallback: string = '/images/placeholder.jpg') => {
  // Navigate nested object using dot notation
  const path = key.split('.').reduce((obj: any, k) => obj?.[k], imagePaths);
  return path || fallback;
};
