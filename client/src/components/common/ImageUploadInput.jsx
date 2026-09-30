import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Check, Link as LinkIcon } from 'lucide-react';

const ImageUploadInput = ({
  label = 'Featured Image',
  value = '',
  onChange,
  altValue = '',
  onAltChange,
  className = '',
}) => {
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [dragOver, setDragOver] = useState(false);
  const [compressing, setCompressing] = useState(false);

  // Client-side instant canvas image compressor
  const compressImage = (file, maxWidth = 1200, maxHeight = 900, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to lightweight JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image for compression'));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    try {
      setCompressing(true);
      const compressedDataUrl = await compressImage(file);
      if (onChange) {
        onChange(compressedDataUrl);
      }
    } catch (err) {
      console.error('[ImageUpload] Compression error:', err);
      // Fallback to direct read
      const reader = new FileReader();
      reader.onload = (e) => {
        if (onChange) onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setCompressing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">{label}</label>
        <div className="flex items-center space-x-1 text-[11px] bg-slate-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              activeTab === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload from Device
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              activeTab === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Image Web URL
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 ${
            dragOver ? 'border-amber-500 bg-amber-50/50' : 'border-slate-300 hover:border-amber-400 bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
            {compressing ? (
              <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <UploadCloud className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              {compressing ? 'Optimizing photo size...' : 'Click to choose image from phone / computer'}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Auto-optimized for ultra-fast loading (PNG, JPG, WEBP)</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder="https://images.unsplash.com/... or /images/cabs/..."
            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      )}

      {/* Image Preview Card */}
      {value && (
        <div className="relative p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-3 group">
          <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
            <img
              src={value}
              alt="Attached vehicle/photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/cabs/force-cruiser-4x4.jpg';
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center space-x-1.5 text-emerald-600 text-xs font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>Image Attached Successfully</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
              {value.startsWith('data:') ? 'Custom Uploaded Photo (Compressed Web Ready)' : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange && onChange('')}
            className="p-1.5 bg-white text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 rounded-lg shadow-sm transition"
            title="Remove Image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {onAltChange && (
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image Alt Text (SEO)</label>
          <input
            type="text"
            value={altValue}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="e.g. Force Cruiser 4x4 Mountain Taxi Himachal"
            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-amber-500"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
