export interface BibleEntryType {
    book: string;      // 성경 책 이름 (ex. 사도행전)
    chapter: string;   // 장 (ex. 6)
    date: string;      // 날짜 (ex. 2025-12-13)
    no: number;        // 고유 번호 (ex. 1024)
    id?: string;       // Firestore 문서 ID (옵션)
}