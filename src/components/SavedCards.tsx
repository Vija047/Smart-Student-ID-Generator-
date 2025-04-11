
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { StudentData } from '@/types/student';
import { formatDate } from '@/utils/formatters';
import { useToast } from '@/components/ui/use-toast';
import { toPng } from 'html-to-image';

interface SavedCardsProps {
  cards: StudentData[];
  onViewCard: (card: StudentData) => void;
  onDeleteCard: (id: string) => void;
}

const SavedCards: React.FC<SavedCardsProps> = ({ 
  cards, 
  onViewCard,
  onDeleteCard
}) => {
  const { toast } = useToast();

  if (!cards.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Saved ID Cards</CardTitle>
          <CardDescription>Create an ID card to see it here</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-32 text-gray-400">
          No saved ID cards yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Saved ID Cards</CardTitle>
        <CardDescription>View or download previously generated cards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="flex items-center border rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  {card.photo ? (
                    <img
                      src={card.photo}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-sm">{card.name}</h4>
                <div className="flex text-xs text-gray-500 space-x-2">
                  <span>Class: {card.classDivision}</span>
                  <span>•</span>
                  <span>Created: {formatDate(card.createdAt)}</span>
                </div>
              </div>
              <div className="flex-shrink-0 space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewCard(card)}
                  className="text-xs"
                >
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDeleteCard(card.id)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedCards;
