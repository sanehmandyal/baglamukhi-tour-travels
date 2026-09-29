const fs = require('fs');
const path = require('path');
const https = require('https');

const cabsDir = path.join(__dirname, 'client', 'public', 'images', 'cabs');
if (!fs.existsSync(cabsDir)) {
  fs.mkdirSync(cabsDir, { recursive: true });
}

function getDirectFileUrl(title) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      title
    )}&prop=imageinfo&iiprop=url&format=json`;
    https
      .get(
        url,
        {
          rejectUnauthorized: false,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => {
            try {
              const j = JSON.parse(data);
              if (j.query && j.query.pages) {
                const pages = Object.values(j.query.pages);
                for (const page of pages) {
                  if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
                    return resolve(page.imageinfo[0].url);
                  }
                }
              }
            } catch (e) {}
            resolve(null);
          });
        }
      )
      .on('error', () => resolve(null));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          rejectUnauthorized: false,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          const stream = fs.createWriteStream(dest);
          res.pipe(stream);
          stream.on('finish', () => {
            stream.close();
            resolve(fs.statSync(dest).size);
          });
        }
      )
      .on('error', reject);
  });
}

const downloads = [
  {
    fileName: 'toyota-innova-crysta.jpg',
    wikiTitle: 'File:Toyota_Innova_Crysta_2.4_Z_front_right.jpg',
  },
  {
    fileName: 'swift-dzire.jpg',
    wikiTitle: 'File:Maruti_Suzuki_Dzire_VXi_VVT_(front).JPG',
  },
  {
    fileName: 'maruti-ertiga.jpg',
    wikiTitle: 'File:Maruti Suzuki Ertiga(1).jpg',
  },
  {
    fileName: 'force-tempo-traveller-12.jpg',
    wikiTitle: 'File:Force Traveller, Leh-Manali Highway.jpg',
  },
  {
    fileName: 'force-tempo-traveller-17.jpg',
    wikiTitle: 'File:Force Motors - Traveller 26 - Agra 2014-05-14 4222.JPG',
  },
  {
    fileName: 'force-cruiser-4x4.jpg',
    wikiTitle: 'File:Force Motors Trax Cruiser.jpg',
  },
  {
    fileName: 'mahindra-thar-4x4.jpg',
    wikiTitle:
      'File:Mahindra Thar SUV in "Red Rage" color at Ashiana Brahmanda, East Singbhum India (Ank Kumar, Infosys limited) 01.jpg',
  },
  {
    fileName: 'mahindra-scorpio.jpg',
    wikiTitle: 'File:Mahindra Scorpio.jpg',
  },
];

async function run() {
  for (const item of downloads) {
    console.log(`\nResolving URL for ${item.fileName} (${item.wikiTitle})...`);
    const fileUrl = await getDirectFileUrl(item.wikiTitle);
    if (!fileUrl) {
      console.error(`✗ Could not resolve URL for ${item.wikiTitle}`);
      continue;
    }
    console.log(`Resolved: ${fileUrl}`);
    await new Promise((r) => setTimeout(r, 1000));
    const dest = path.join(cabsDir, item.fileName);
    try {
      const size = await downloadImage(fileUrl, dest);
      console.log(`✓ Successfully saved ${item.fileName} (${(size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`✗ Error downloading ${item.fileName}:`, e.message);
    }
  }
}

run();
