const fs = require('fs');
const path = require('path');
const imagesDir = path.join(__dirname, 'public', 'images');
const outFile = path.join(imagesDir, 'images.json');

function isImageFile(name) {
  return /\.(jpe?g|png|webp|gif|svg)$/i.test(name);
}

function readProjects(dir) {
  const projects = [];
  const folders = fs.readdirSync(dir);

  folders.forEach(folder => {
    const folderPath = path.join(dir, folder);
    const stat = fs.statSync(folderPath);

    if (stat.isDirectory()) {
      const insidePath = path.join(folderPath, 'inside_project');

      if (fs.existsSync(insidePath) && fs.statSync(insidePath).isDirectory()) {
        const files = fs.readdirSync(insidePath).filter(isImageFile);

        if (files.length > 0) {
          projects.push({
            name: folder,
            preview: `/images/${folder}/inside_project/${files[0]}`,
            images: files.map(f => ({
              filename: f,
              src: `/images/${folder}/inside_project/${f}`
            }))
          });
        }
      }
    }
  });

  return projects;
}

const projects = readProjects(imagesDir);
fs.writeFileSync(outFile, JSON.stringify(projects, null, 2));
console.log('Gerado', outFile, 'com', projects.length, 'projetos.');
