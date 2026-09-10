import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DESKTOP_OUT = path.join(PUBLIC_DIR, 'sequence', 'desktop');
const MOBILE_OUT = path.join(PUBLIC_DIR, 'sequence', 'mobile');

// Ensure directories exist
[DESKTOP_OUT, MOBILE_OUT].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('🐾 TAP Cinematic Video Extractor');
console.log('=================================');
console.log('Make sure you have FFmpeg installed and in your PATH.\n');

const extractFrames = (inputVideo, outputDir, isMobile) => {
  if (!fs.existsSync(inputVideo)) {
    console.error(`❌ Input video not found: ${inputVideo}`);
    return;
  }

  // Clear existing frames
  fs.readdirSync(outputDir).forEach(file => fs.unlinkSync(path.join(outputDir, file)));

  console.log(`🎬 Extracting frames from ${inputVideo}...`);
  
  // 18 fps for smooth but lightweight scrubbing.
  // Landscape scale: 1280 wide. Portrait scale: 720 wide.
  const scale = isMobile ? 'scale=720:-2' : 'scale=1280:-2';
  const command = `ffmpeg -i "${inputVideo}" -vf "fps=18,${scale}" -c:v libwebp -q:v 80 "${path.join(outputDir, 'frame_%04d.webp')}" -y`;
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Successfully extracted frames to ${outputDir}`);
  } catch (error) {
    console.error(`❌ FFmpeg extraction failed: ${error.message}`);
  }
};

// Usage expectation: 
// 1. Generate landscape video via Higgsfield -> landscape.mp4
// 2. Generate portrait video via Higgsfield -> portrait.mp4
// 3. Run this script

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node scripts/extract-frames.mjs <landscape.mp4> <portrait.mp4>');
  console.log('Example: node scripts/extract-frames.mjs ./landscape.mp4 ./portrait.mp4');
} else {
  extractFrames(args[0], DESKTOP_OUT, false);
  extractFrames(args[1], MOBILE_OUT, true);
}
