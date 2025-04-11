
import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { StudentData } from '@/types/student';
import { formatDate } from '@/utils/formatters';

interface ModernIDCardProps {
  data: StudentData;
}

const ModernIDCard = forwardRef<HTMLDivElement, ModernIDCardProps>(
  ({ data }, ref) => {
    // Create a compact version of student data for QR code
    const qrCodeData = {
      id: data.id,
      name: data.name,
      rollNumber: data.rollNumber,
      classDivision: data.classDivision
    };

    // Convert to string and limit size
    const qrValue = JSON.stringify(qrCodeData).slice(0, 100);

    return (
      <div 
        ref={ref}
        className="id-card template-modern rounded-xl overflow-hidden shadow-lg"
      >
        {/* Header with gradient */}
        <div className="h-24 bg-gradient-to-r from-unity-primary to-unity-secondary p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">UNITY SCHOOL</h2>
              <p className="text-xs opacity-80">ST. XAVIER'S COLLEGE</p>
              <p className="text-xs opacity-80">Student Identity Card</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80">ID: {data.id.slice(0, 8)}</p>
              <p className="text-xs opacity-80">Valid Till: {formatDate(data.createdAt + 31536000000)}</p>
            </div>
          </div>
        </div>

        {/* Student Photo and Info */}
        <div className="px-4 pt-4 pb-2 flex">
          <div className="w-1/3">
            <div className="w-24 h-24 bg-white rounded-lg shadow-md overflow-hidden border-2 border-white">
              {data.photo ? (
                <img
                  src={data.photo}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Photo
                </div>
              )}
            </div>
          </div>
          <div className="w-2/3 pl-2">
            <h3 className="text-lg font-bold text-gray-800 truncate">{data.name}</h3>
            <div className="text-sm space-y-1 mt-1">
              <p className="flex justify-between">
                <span className="text-gray-500">Roll No:</span>
                <span className="font-medium">{data.rollNumber}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Class:</span>
                <span className="font-medium">{data.classDivision}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Rack No:</span>
                <span className="font-medium">{data.rackNumber}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Bus Route:</span>
                <span className="font-medium">{data.busRouteNumber}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Allergies Section */}
        {data.allergies.length > 0 && (
          <div className="px-4 pt-2 pb-3">
            <h4 className="text-xs font-semibold text-red-500 uppercase tracking-wider">Allergies</h4>
            <div className="flex flex-wrap mt-1 gap-1">
              {data.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-full"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* QR Code */}
        <div className="px-4 pt-2 pb-4 flex justify-center items-center">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <QRCodeSVG
              value={qrValue}
              size={120}
              level="L"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-unity-light p-3 text-center">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Unity School</span> • Excellence in Education
          </p>
          <p className="text-xs text-gray-500">123 Education Lane, Knowledge City</p>
        </div>
      </div>
    );
  }
);

ModernIDCard.displayName = "ModernIDCard";

export default ModernIDCard;
