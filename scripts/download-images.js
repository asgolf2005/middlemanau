const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// All images currently used in the website
const imageUrls = [
  // Logos
  'https://starsmiles.com.au/wp-content/uploads/2023/11/logo.png',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/whitee.png',

  // Hero & Team
  'https://starsmiles.com.au/wp-content/uploads/2023/11/smiling-dentists-standing-with-arms-crossed-1024x682.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/professional-dentist-at-his-clinic.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/two-dentists-working-with-patient-1024x684.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/happy-patient-and-dentists-768x512.jpg',

  // Services
  'https://starsmiles.com.au/wp-content/uploads/2023/11/dental-check-up.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/12/Smile-2-1024x683.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/new-teeth-for-patient.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/12/Invisalign-300x200.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/low-angle-view-of-dentists-examining-teeth-of-little-boy-at-dentist-office.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/12/RootCanel-300x202.jpg',

  // Doctors
  'https://starsmiles.com.au/wp-content/uploads/2023/11/Dr.Nalini-Prasad.jpg',
  'https://starsmiles.com.au/wp-content/uploads/elementor/thumbs/Dr.Nesrine-Armanious-qfpyuux9xl9a1z82ozxuzh56j0t4ksr4kria0b7xes.jpeg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/Dr.Momina-225x300.jpg',

  // Testimonials
  'https://starsmiles.com.au/wp-content/uploads/2023/11/testimonial-N8572T7.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/testimonial-83S5W35.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/11/testimonial-M6NJPEF.png',

  // Additional Pages
  'https://starsmiles.com.au/wp-content/uploads/2023/12/AlwaysSmile-1024x768.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/12/DentalPatient-1024x768.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/12/Crowns-300x200.jpg',
  'https://starsmiles.com.au/wp-content/uploads/2023/12/LaserFillings-200x300.jpg',
];

const categorizeImage = (url) => {
  const filename = path.basename(url).split('?')[0];

  if (filename.includes('logo') || filename.includes('whitee')) return 'logos';
  if (filename.includes('Dr.') || filename.includes('Armanious') || filename.includes('Momina')) return 'team';
  if (filename.includes('testimonial')) return 'testimonials';
  if (filename.includes('Smile') || filename.includes('AlwaysSmile')) return 'transformations';
  if (filename.includes('Invisalign') || filename.includes('Implant') || filename.includes('Crown') ||
      filename.includes('Filling') || filename.includes('RootCanel') || filename.includes('dental-check-up')) return 'services';
  if (filename.includes('dentist') || filename.includes('patient')) return 'clinic';

  return 'general';
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const main = async () => {
  console.log('🚀 Starting image download...\n');

  const publicDir = path.join(__dirname, '..', 'public', 'images');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const url of imageUrls) {
    try {
      const category = categorizeImage(url);
      const filename = path.basename(url).split('?')[0];
      const filepath = path.join(publicDir, category, filename);

      await downloadImage(url, filepath);
      successCount++;
    } catch (error) {
      console.error(`✗ Error downloading ${url}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n✅ Download complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`\n📁 Images saved to: ${publicDir}`);
};

main().catch(console.error);
