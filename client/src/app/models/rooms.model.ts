export interface Room {
  id: number;
  room_number: string;
  description: RoomType;
  available: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum RoomType {
  Single = 'Single Room',
  Double = 'Double Room',
  Suite = 'Suite'
}
