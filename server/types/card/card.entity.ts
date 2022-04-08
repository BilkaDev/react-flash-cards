export interface CardEntity {
   id?: string;
   question: string;
   answer: string;
   memorized: boolean;
   deckId: string;
   deckName?: string;
}