const fs = require('fs');
const path = require('path');

class UploadService {
  /**
   * Delete a file from the uploads directory
   * @param {string} filename - Name of the file to delete
   */
  static deleteFile(filename) {
    if (!filename) return;

    const filePath = path.join(__dirname, '../../uploads', filename);
    
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully:', filename);
      }
    });
  }

  /**
   * Get the relative path for displaying images
   * @param {string} filename - Name of the file
   * @returns {string} Relative path to the file
   */
  static getImageUrl(filename) {
    return `/uploads/${filename}`;
  }
}

module.exports = UploadService;
