import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse form data
const parseForm = async (req: NextRequest): Promise<{ fields: any; files: any }> => {
  return new Promise(async (resolve, reject) => {
    // Convert NextRequest to Node.js readable stream
    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create temp file from buffer
    const tempPath = path.join(process.cwd(), 'tmp', `upload-${randomUUID()}`);

    // Ensure tmp directory exists
    await fs.mkdir(path.join(process.cwd(), 'tmp'), { recursive: true });
    await fs.writeFile(tempPath, buffer);

    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'tmp'),
      keepExtensions: true,
    });

    try {
      form.parse({ method: 'POST', headers: {}, url: req.url }, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    } catch (error) {
      reject(error);
    }
  });
};

// POST /api/upload - Upload an image
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Parse the multipart form data
    const { files } = await parseForm(request);
    const file = files.file[0]; // Assuming 'file' is the field name

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalFilename || '').toLowerCase();
    const filename = `${randomUUID()}${fileExtension}`;
    const outputPath = path.join(uploadsDir, filename);

    // Process image with sharp
    await sharp(file.filepath)
      .resize({ width: 1200, height: 800, fit: 'inside' })
      .toFile(outputPath);

    // Clean up temp file
    await fs.unlink(file.filepath);

    // Return the uploaded file URL
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
