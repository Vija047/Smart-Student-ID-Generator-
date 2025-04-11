
import { StudentData } from '../types/student';

const STORAGE_KEY = 'student_id_cards';

export const saveStudentCard = (card: StudentData): boolean => {
  try {
    const existingCardsJson = localStorage.getItem(STORAGE_KEY);
    const existingCards: StudentData[] = existingCardsJson ? JSON.parse(existingCardsJson) : [];
    
    // Add the new card to the array
    const updatedCards = [card, ...existingCards];
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    return true;
  } catch (error) {
    console.error('Failed to save student card:', error);
    return false;
  }
};

export const getAllStudentCards = (): StudentData[] => {
  try {
    const cardsJson = localStorage.getItem(STORAGE_KEY);
    return cardsJson ? JSON.parse(cardsJson) : [];
  } catch (error) {
    console.error('Failed to retrieve student cards:', error);
    return [];
  }
};

export const deleteStudentCard = (id: string): boolean => {
  try {
    const existingCardsJson = localStorage.getItem(STORAGE_KEY);
    if (!existingCardsJson) return false;
    
    const existingCards: StudentData[] = JSON.parse(existingCardsJson);
    const updatedCards = existingCards.filter(card => card.id !== id);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    return true;
  } catch (error) {
    console.error('Failed to delete student card:', error);
    return false;
  }
};
