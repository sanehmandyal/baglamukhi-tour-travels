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

  const handleFileChange = (file) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (onChange) {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
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
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              Click to choose image from phone / computer
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Supports PNG, JPG, JPEG, WEBP (Up to 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={value || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      )}

      {/* Image Preview & Alt Text Input */}
      {value && (
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-3 mt-2">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img src={value} alt={altValue || 'Preview'} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange && onChange('')}
              className="absolute top-1 right-1 p-1 bg-slate-900/80 text-white hover:bg-rose-600 rounded-full transition"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-600 flex items-center">
              <Check className="w-3 h-3 mr-1" /> Image Attached Successfully
            </span>
            {onAltChange && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Image Alt / SEO Description</label>
                <input
                  type="text"
                  placeholder="e.g. Maa Baglamukhi Temple sanctum or Manali snow view"
                  value={altValue}
                  onChange={(e) => onAltChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
