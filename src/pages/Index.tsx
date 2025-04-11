
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StudentData, StudentFormData, CardTemplate } from '@/types/student';
import StudentForm from '@/components/StudentForm';
import IDCardPreview from '@/components/IDCardPreview';
import SavedCards from '@/components/SavedCards';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  saveStudentCard,
  getAllStudentCards,
  deleteStudentCard
} from '@/utils/storage';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const { toast } = useToast();
  const [currentCard, setCurrentCard] = useState<StudentData | null>(null);
  const [savedCards, setSavedCards] = useState<StudentData[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>('modern');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    // Load saved cards from localStorage
    const cards = getAllStudentCards();
    setSavedCards(cards);
  }, []);

  const handleFormSubmit = (formData: StudentFormData) => {
    const newCard: StudentData = {
      ...formData,
      id: uuidv4(),
      createdAt: Date.now()
    };

    setCurrentCard(newCard);
    
    // Save to localStorage
    if (saveStudentCard(newCard)) {
      setSavedCards(prev => [newCard, ...prev]);
      toast({
        title: "Success!",
        description: "Student ID card created successfully"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save the student ID card",
        variant: "destructive"
      });
    }
  };

  const handleViewCard = (card: StudentData) => {
    setCurrentCard(card);
  };

  const handleConfirmDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = () => {
    if (!confirmDeleteId) return;
    
    if (deleteStudentCard(confirmDeleteId)) {
      setSavedCards(prev => prev.filter(card => card.id !== confirmDeleteId));
      
      // If the current card is being deleted, clear it
      if (currentCard && currentCard.id === confirmDeleteId) {
        setCurrentCard(null);
      }
      
      toast({
        title: "Deleted",
        description: "ID card has been deleted"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the ID card",
        variant: "destructive"
      });
    }
    
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-unity-primary text-white py-6 px-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Smart Student ID Generator</h1>
          <p className="text-sm opacity-90 mt-2 md:mt-0">Create, customize, and download student ID cards</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="create">Create New ID</TabsTrigger>
                  <TabsTrigger value="saved">Saved IDs ({savedCards.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="create">
                  <StudentForm 
                    onSubmit={handleFormSubmit} 
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={setSelectedTemplate}
                  />
                </TabsContent>
                <TabsContent value="saved">
                  <SavedCards 
                    cards={savedCards} 
                    onViewCard={handleViewCard}
                    onDeleteCard={handleConfirmDelete}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-1 flex flex-col items-center">
              {currentCard ? (
                <IDCardPreview data={currentCard} />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="text-center text-gray-400">
                    <p className="text-lg">ID Card Preview</p>
                    <p className="text-sm mt-2">Submit the form to generate a student ID card</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} Unity School - Student ID Generator</p>
          <p className="text-xs mt-1 text-gray-400">Securely create and manage student ID cards</p>
        </div>
      </footer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this ID card. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
