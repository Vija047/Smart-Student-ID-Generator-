
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { StudentData, CardTemplate } from '@/types/student';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { toPng } from 'html-to-image';
import ModernIDCard from './ModernIDCard';
import ClassicIDCard from './ClassicIDCard';

interface IDCardPreviewProps {
  data: StudentData;
}

const IDCardPreview: React.FC<IDCardPreviewProps> = ({ data }) => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        width: 320,
        height: 480,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `unity-id-card-${data.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Success!",
        description: "ID Card downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading the image:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the ID card",
        variant: "destructive"
      });
    }
  };

  const renderCard = () => {
    switch (data.template) {
      case 'modern':
        return <ModernIDCard ref={cardRef} data={data} />;
      case 'classic':
        return <ClassicIDCard ref={cardRef} data={data} />;
      default:
        return <ModernIDCard ref={cardRef} data={data} />;
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="my-4">
        {renderCard()}
      </div>
      <Button 
        onClick={handleDownload}
        className="mt-4"
        size="lg"
      >
        <Download className="mr-2 h-4 w-4" /> Download ID Card
      </Button>
    </div>
  );
};

export default IDCardPreview;
