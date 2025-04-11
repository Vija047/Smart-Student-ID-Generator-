
import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { StudentData } from '@/types/student';
import { formatDate } from '@/utils/formatters';

interface ClassicIDCardProps {
  data: StudentData;
}

const ClassicIDCard = forwardRef<HTMLDivElement, ClassicIDCardProps>(
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
        className="id-card template-classic rounded-xl overflow-hidden shadow-lg"
      >
        {/* Header */}
        <div className="bg-unity-primary p-4 text-white text-center">
          <h2 className="text-xl font-bold tracking-wide">UNITY SCHOOL</h2>
          <p className="text-xs mt-1">ST. XAVIER'S COLLEGE</p>
          <p className="text-xs mt-1">STUDENT IDENTITY CARD</p>
        </div>

        {/* Photo */}
        <div className="flex justify-center -mt-1">
          <div className="w-28 h-28 bg-white rounded-full shadow-md overflow-hidden border-4 border-white -mt-8 z-10">
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

        {/* Student Info */}
        <div className="px-6 py-3 text-center">
          <h3 className="text-lg font-bold text-gray-800">{data.name}</h3>
          <p className="text-sm text-gray-500 mt-1">Roll No: {data.rollNumber}</p>
          <p className="text-sm text-gray-500">Class: {data.classDivision}</p>
        </div>

        {/* Details with lines */}
        <div className="px-6 py-3">
          <div className="border-t border-gray-200 pt-2 pb-1 flex justify-between">
            <span className="text-sm font-medium text-gray-500">Rack Number:</span>
            <span className="text-sm">{data.rackNumber}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 pb-1 flex justify-between">
            <span className="text-sm font-medium text-gray-500">Bus Route:</span>
            <span className="text-sm">{data.busRouteNumber}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 pb-1 flex justify-between">
            <span className="text-sm font-medium text-gray-500">Valid Till:</span>
            <span className="text-sm">{formatDate(data.createdAt + 31536000000)}</span>
          </div>
        </div>

        {/* Allergies Section */}
        {data.allergies.length > 0 && (
          <div className="px-6 py-2 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-red-500">ALLERGIES</h4>
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
        <div className="px-6 py-4 flex justify-center">
          <div className="bg-white p-2 border border-gray-200 rounded-md">
            <QRCodeSVG
              value={qrValue}
              size={120}
              level="L"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-3 text-center border-t border-gray-200">
          <p className="text-xs text-gray-600">
            If found, please return to:
          </p>
          <p className="text-xs font-medium text-gray-800">
            Unity School, 123 Education Lane, Knowledge City
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Phone: (123) 456-7890 • www.unityschool.edu
          </p>
        </div>
      </div>
    );
  }
);

ClassicIDCard.displayName = "ClassicIDCard";

export default ClassicIDCard;
